#!/usr/bin/env python3
"""Generate DI open-answer cheat sheets (HTML for print)."""
import sys
sys.path.insert(0, "/Users/bekzat/Desktop/Nurzhan/Feanor/Edu/HRM")

from open_slips_data import SLIPS

ROOT = "/Users/bekzat/Desktop/Nurzhan/Feanor/Edu/HRM"


def html_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_html():
    strips = []
    for i, slip in enumerate(SLIPS):
        ru = html_escape(slip["ru"])
        en = html_escape(slip["en"]).replace("\n", "<br>")
        top = i * 5
        strips.append(f"""    <div class="slip">
      <span class="num" style="top:{top}px">{slip["id"]}</span>
      <div class="ru">{ru}</div>
      <div class="en">{en}</div>
    </div>
""")

    index_rows = "".join(
        f'      <tr><td>{s["id"]}</td><td>{html_escape(s["ru"][:90])}{"…" if len(s["ru"]) > 90 else ""}</td></tr>\n'
        for s in SLIPS
    )

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Open — листочки для печати</title>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{ font-family: Arial, Helvetica, sans-serif; background: #ddd; padding: 10px; }}
    .toolbar {{
      max-width: 21cm; margin: 0 auto 10px; font-size: 13px;
      background: #fff; padding: 8px 12px; border-radius: 6px;
      display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
    }}
    .toolbar a {{ color: #7b4397; }}
    .toolbar button {{
      background: #7b4397; color: #fff; border: none; padding: 6px 14px;
      border-radius: 5px; cursor: pointer; font-size: 13px; font-weight: 600;
    }}
    .index {{ max-width: 21cm; margin: 0 auto 12px; background: #fff; padding: 8px 10px; border-radius: 6px; font-size: 10px; }}
    .index h1 {{ font-size: 13px; margin-bottom: 6px; }}
    .index table {{ width: 100%; border-collapse: collapse; }}
    .index th, .index td {{ border: 1px solid #eee; padding: 2px 5px; text-align: left; }}
    .index th {{ background: #7b4397; color: #fff; }}

    .slips {{
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      justify-content: flex-start;
      max-width: 21cm;
      margin: 0 auto;
    }}
    .slip {{
      position: relative;
      width: 3.6cm;
      min-height: 4.8cm;
      height: auto;
      background: #fff;
      border: 1px dashed #888;
      padding: 1.5mm 7mm 1.5mm 1.8mm;
      font-size: 5.2pt;
      line-height: 1.22;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    .slip .num {{
      position: absolute;
      right: 1.2mm;
      top: 0;
      background: #7b4397;
      color: #fff;
      font-size: 5pt;
      font-weight: 700;
      padding: 0.2mm 1mm;
      border-radius: 1px;
      white-space: nowrap;
    }}
    .slip .ru {{
      font-size: 5.2pt;
      font-weight: 700;
      color: #7b4397;
      margin-bottom: 0.5mm;
      padding-right: 0.5mm;
    }}
    .slip .en {{
      font-size: 5.2pt;
      color: #111;
    }}

    @media print {{
      body {{ background: #fff; padding: 5mm; }}
      .toolbar, .index {{ display: none !important; }}
      .slips {{ gap: 4px; max-width: none; }}
      .slip {{ border-color: #aaa; }}
      @page {{ size: A4 portrait; margin: 8mm; }}
    }}
  </style>
</head>
<body>
  <div class="toolbar">
    <a href="index.html">← HRM</a>
    <span>{len(SLIPS)} карточек · 3.6 cm</span>
    <button type="button" onclick="window.print()">🖨 Печать</button>
  </div>
  <div class="index">
    <h1>Оглавление — {len(SLIPS)} тем (на печати скрыто)</h1>
    <table>
      <tr><th>#</th><th>Вопрос (RU)</th></tr>
{index_rows}    </table>
  </div>
  <div class="slips">
{"".join(strips)}  </div>
</body>
</html>
"""
    path = f"{ROOT}/08_DI_Open_Short_Answers.html"
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Saved", path)


if __name__ == "__main__":
    build_html()
