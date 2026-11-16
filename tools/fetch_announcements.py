"""Copy the latest QFIN mailing list announcements from the public archive
into _data/announcements.yml, for the homepage Announcements box.

Runs on GitHub every hour (.github/workflows/announcements.yml).
To test locally with a saved copy of the feed:
    python3 tools/fetch_announcements.py --file feed.xml
"""
import argparse
import email.utils
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

FEED_URL = "https://list.uva.nl/hyperkitty/list/qfin@list.uva.nl/feed/"
OUT = Path(__file__).resolve().parent.parent / "_data" / "announcements.yml"
KEEP = 10          # how many announcements to store (the homepage shows the latest)
EXCERPT = 300      # characters shown on the homepage


def clean_title(title):
    t = (title or "").strip()
    prev = None
    while prev != t:  # drop "[Qfin]" and any Fwd:/Fw: in front, in any order
        prev = t
        t = re.sub(r"^\s*\[[^\]]*\]\s*", "", t)
        t = re.sub(r"^\s*(fwd?|fw)\s*:\s*", "", t, flags=re.I)
    return t.strip()


def clean_text(text):
    t = (text or "").replace("\r\n", "\n").replace("＠", "@")  # archive hides @ as a wide ＠
    # Mailman footer
    t = re.split(r"\n_{10,}\s*\n[^\n]*mailing list\s*--", t, maxsplit=1, flags=re.I)[0]
    # Quoted earlier emails
    t = re.split(r"\n(?:On .+wrote:|-{2,}\s*Original Message|From: .+\nSent: )", t, maxsplit=1)[0]
    # Email signature: a "-- " line, or the first line with pronouns like (she/her) or [they//them]
    lines = t.split("\n")
    for i, line in enumerate(lines):
        if line.strip() == "--" or re.search(r"[\(\[]\s*\w+\s*/{1,2}\s*\w+\s*[\)\]]", line):
            lines = lines[:i]
            break
    t = "\n".join(lines)
    # Outlook's "link<https://link/>" and "address<mailto:address>" doubles
    t = re.sub(r"(?<=\S)<(?:https?|mailto):[^>\s]+>", "", t)
    return re.sub(r"\n{3,}", "\n\n", t).strip()


def excerpt(text):
    # Skip a short greeting line ("Hi everyone!") and flatten to one paragraph
    paras = [p for p in text.split("\n\n") if p.strip()]
    if len(paras) > 1 and len(paras[0]) < 40 and re.match(r"^(hi|hello|hey|dear)\b", paras[0].strip(), re.I):
        paras = paras[1:]
    flat = re.sub(r"\s+", " ", " ".join(paras)).strip()
    if len(flat) <= EXCERPT:
        return flat
    cut = flat[:EXCERPT]
    return cut[: cut.rfind(" ")].rstrip(" ,;:.") + "…"


def yaml_str(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", help="read the feed from a saved file instead of the web")
    args = ap.parse_args()

    if args.file:
        raw = Path(args.file).read_bytes()
    else:
        req = urllib.request.Request(FEED_URL, headers={"User-Agent": "qfinformatics.com announcements"})
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()

    items = []
    for it in ET.fromstring(raw).iter("item"):
        title = clean_title(it.findtext("title"))
        if re.match(r"^\s*re\s*:", title, re.I):
            continue  # replies are not announcements
        date = email.utils.parsedate_to_datetime(it.findtext("pubDate"))
        items.append({
            "date": date.strftime("%Y-%m-%d"),
            "sort": date.isoformat(),
            "title": title,
            "text": excerpt(clean_text(it.findtext("description"))),
            "url": (it.findtext("link") or "").strip(),
        })
    items.sort(key=lambda x: x["sort"], reverse=True)
    items = items[:KEEP]

    out = [
        "# Filled in automatically from the public mailing list archive",
        "# (" + FEED_URL + ")",
        "# by tools/fetch_announcements.py. Edits here are overwritten.",
    ]
    if not items:
        out.append("[]")
    for x in items:
        out += [
            "- date: " + x["date"],
            "  title: " + yaml_str(x["title"]),
            "  text: " + yaml_str(x["text"]),
            "  url: " + yaml_str(x["url"]),
        ]
    OUT.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"{len(items)} announcement(s) written to {OUT}")


if __name__ == "__main__":
    sys.exit(main())
