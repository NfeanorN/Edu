#!/usr/bin/env python3
"""Build Young Sheldon S02E04 subtitles EN + RU from source SRT."""

import json
import re
import shutil
import time
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[1]
SUBS = ROOT / "subtitles"
SRC_SRT = Path("/tmp/ys-s02e04-en.srt")
OUT_EN_SRT = SUBS / "s02e04-en.srt"
OUT_RU_SRT = SUBS / "s02e04-ru.srt"
OUT_JSON = SUBS / "s02e04-en-ru.json"
OUT_JS = SUBS / "s02e04-data.js"

SHOW = "Young Sheldon"
SEASON = 2
EPISODE = 4
TITLE = "A Financial Secret and Fish Sauce"
SOURCE = "https://sheldon-kuraj-bambey.net/238-subtitles/2-season/4-episode"


def parse_srt(path: Path):
    text = path.read_text(encoding="utf-8-sig")
    blocks = re.split(r"\n\s*\n", text.strip())
    entries = []
    for b in blocks:
        lines = b.strip().split("\n")
        if len(lines) < 3 or not lines[0].isdigit():
            continue
        idx = int(lines[0])
        times = lines[1]
        body = "\n".join(lines[2:])
        body = re.sub(r"<[^>]+>", "", body).strip()
        if not body:
            continue
        skip_markers = ("YOUNG SHELDON", "Episode Title", "Season 02", "Episode 04")
        if any(m in body for m in skip_markers):
            continue
        entries.append({"id": idx, "start": times.split(" --> ")[0], "end": times.split(" --> ")[1], "text": body.replace("\n", " ")})
    return entries


def translate_ru(text: str, tr: GoogleTranslator) -> str:
    if not text.strip():
        return text
    # keep proper names / sounds
    if re.fullmatch(r"[\W\d_]+", text.replace(" ", "")):
        return text
    for attempt in range(3):
        try:
            return tr.translate(text)
        except Exception:
            time.sleep(0.8 * (attempt + 1))
    return text


def srt_time_to_line(t: str) -> str:
    return t.replace(",", ".")


def write_srt(path: Path, entries, field: str):
    lines = []
    for i, e in enumerate(entries, 1):
        lines.append(str(i))
        lines.append(f"{e['start']} --> {e['end']}")
        lines.append(e[field].replace(" / ", "\n"))
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def main():
    SUBS.mkdir(parents=True, exist_ok=True)
    if SRC_SRT.exists():
        shutil.copy(SRC_SRT, OUT_EN_SRT)
    elif OUT_EN_SRT.exists():
        src = OUT_EN_SRT
    else:
        raise SystemExit("No source SRT found")

    entries = parse_srt(OUT_EN_SRT)
    print(f"Parsed {len(entries)} subtitle lines")

    tr = GoogleTranslator(source="en", target="ru")
    for i, e in enumerate(entries):
        e["textRu"] = translate_ru(e["text"], tr)
        if (i + 1) % 25 == 0:
            print(f"  translated {i + 1}/{len(entries)}")
            time.sleep(0.3)

    data = {
        "show": SHOW,
        "season": SEASON,
        "episode": EPISODE,
        "title": TITLE,
        "source": SOURCE,
        "entries": [{"id": e["id"], "start": e["start"], "end": e["end"], "text": e["text"], "textRu": e["textRu"]} for e in entries],
    }

    OUT_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    OUT_JS.write_text(
        f"window.S02E04_FULL = {json.dumps(data, ensure_ascii=False)};\n",
        encoding="utf-8",
    )

    ru_entries = [{**e, "text": e["textRu"]} for e in entries]
    write_srt(OUT_RU_SRT, ru_entries, "textRu")

    print(f"Wrote {OUT_JSON.name}, {OUT_JS.name}, {OUT_RU_SRT.name}")


if __name__ == "__main__":
    main()
