#!/usr/bin/env python3
"""Convert Economics explanation HTML files to notebook format."""
import re
from pathlib import Path

ECON = Path(__file__).resolve().parent.parent
CSS_LINK = '<link rel="stylesheet" href="notebook-style.css">'
SKIP = {'Frank_Study_Guide.html', 'Frank_Study_Guide_EN.html', 'Exam_Prep_Guide.html', 'index.html'}

ACCENT = {
    'nb-macro': [
        'GDP', 'Consumption', 'Goods_Market', 'IS_LM', 'Fiscal', 'Okun',
        'Unemployment', 'Open_Economy', 'Exam_Macro',
    ],
    'nb-micro': [
        'PPF', 'Opportunity', 'Budget', 'Rational', 'Intertemporal', 'Marginal_Utility',
    ],
    'nb-firm': ['Production', 'Cost_Long', 'Perfect_Competition'],
    'nb-market': [
        'Demand', 'Supply', 'Elasticities', 'Monopoly', 'Market_Power',
        'Price_Discrimination', 'Game_Theory', 'Externalities', 'Consumer_Surplus',
        'Supply_Demand',
    ],
}

SKIP_CLASSES = {
    'back', 'book-ref', 'source', 'nb-def', 'nb-en', 'en', 'lang-switch',
}


def accent_class(name: str) -> str:
    for cls, keys in ACCENT.items():
        if any(k in name for k in keys):
            return cls
    return 'nb-macro'


def remove_style_blocks(text: str) -> str:
    return re.sub(r'\s*<style>.*?</style>\s*', '\n', text, flags=re.DOTALL)


def add_css_link(text: str) -> str:
    if CSS_LINK in text:
        return text
    if '<meta charset="UTF-8">' in text:
        return text.replace(
            '<meta charset="UTF-8">',
            f'<meta charset="UTF-8">\n    {CSS_LINK}',
            1,
        )
    if '<head>' in text:
        return text.replace('<head>', f'<head>\n    {CSS_LINK}', 1)
    return text


def set_body_class(text: str, extra: str) -> str:
    m = re.search(r'<body([^>]*)>', text)
    if not m:
        return text
    attrs = m.group(1)
    if 'nb-page' in attrs:
        if extra not in attrs:
            text = re.sub(
                r'<body([^>]*)>',
                lambda mo: f'<body class="nb-page {extra}">' if 'class=' not in mo.group(1)
                else re.sub(r'class="([^"]*)"', rf'class="nb-page {extra} \1"', mo.group(0), count=1),
                text,
                count=1,
            )
        return text
    if attrs.strip():
        text = re.sub(r'<body[^>]*>', f'<body class="nb-page {extra}">', text, count=1)
    else:
        text = text.replace('<body>', f'<body class="nb-page {extra}">', 1)
    return text


def wrap_nb_sheet(text: str) -> str:
    if '<div class="nb-sheet">' in text:
        return text
    text = re.sub(
        r'(<body class="nb-page [^"]+">)\s*',
        r'\1\n<div class="nb-sheet">\n',
        text,
        count=1,
    )
    text = text.replace('</body>', '</div>\n</body>', 1)
    return text


def replace_en_class(text: str) -> str:
    text = re.sub(r'\bclass="en"', 'class="nb-en"', text)
    text = re.sub(r"\bclass='en'", "class='nb-en'", text)
    return text


def add_nb_def(text: str) -> str:
    h1 = re.search(r'<h1[^>]*>.*?</h1>', text, flags=re.DOTALL)
    if not h1:
        return text
    rest = text[h1.end():]
    for m in re.finditer(r'<p(?=\s|>)([^>]*)>(.*?)</p>', rest, flags=re.DOTALL):
        attrs = m.group(1)
        if 'class=' in attrs:
            cm = re.search(r'class="([^"]*)"', attrs)
            if cm and cm.group(1).split()[0] in SKIP_CLASSES:
                continue
            if cm and 'nb-def' in cm.group(1):
                break
            continue
        full = m.group(0)
        new = full.replace('<p>', '<p class="nb-def">', 1)
        if new == full:
            new = re.sub(r'<p(\s[^>]*)?>', '<p class="nb-def">', full, count=1)
        pos = h1.end() + m.start()
        return text[:pos] + new + text[pos + len(full):]
    return text


def is_ascii_graph(pre_content: str) -> bool:
    graph_chars = sum(1 for c in pre_content if c in '|/\\─│┌└┐┘├┤┬┴┼+*')
    return graph_chars >= 3 and len(pre_content) > 80


def svg_for_pre(pre_content: str) -> str | None:
    low = pre_content.lower()
    if 'market /' in low and 'single firm' in low:
        return '''<svg class="svg-graph" viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" aria-label="Market vs firm">
            <text x="90" y="22" font-size="13" font-weight="600">Market</text>
            <text x="350" y="22" font-size="13" font-weight="600">Single firm</text>
            <line x1="30" y1="240" x2="250" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="30" y1="40" x2="30" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="280" y1="240" x2="500" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="280" y1="40" x2="280" y2="240" stroke="#333" stroke-width="1.5"/>
            <path d="M 40 200 L 230 80" stroke="#3498db" stroke-width="2" fill="none"/>
            <path d="M 40 80 L 230 200" stroke="#e67e22" stroke-width="2" fill="none"/>
            <circle cx="135" cy="140" r="5" fill="#e74c3c"/>
            <line x1="290" y1="120" x2="490" y2="120" stroke="#2980b9" stroke-width="2.5"/>
            <text x="200" y="75" font-size="11">D</text>
            <text x="200" y="210" font-size="11">S</text>
            <text x="400" y="115" font-size="11">D = MR = P*</text>
        </svg>'''
    if 'budget line' in low or 'бюджетн' in low or ('food' in low and 'shelter' in low):
        return '''<svg class="svg-graph" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-label="Budget line">
            <line x1="50" y1="20" x2="50" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="240" x2="370" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="50" x2="340" y2="240" stroke="#27ae60" stroke-width="2.5"/>
            <circle cx="50" cy="50" r="5" fill="#e74c3c"/>
            <circle cx="340" cy="240" r="5" fill="#e74c3c"/>
            <circle cx="200" cy="145" r="4" fill="#3498db"/>
            <circle cx="120" cy="190" r="4" fill="#8e44ad"/>
            <text x="18" y="55" font-size="12">Good 2</text>
            <text x="300" y="255" font-size="12">Good 1</text>
        </svg>'''
    if 'oranges' in low and ('apples' in low or 'q₁' in low or 'q1' in low):
        return '''<svg class="svg-graph" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-label="Budget line two goods">
            <line x1="50" y1="20" x2="50" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="240" x2="370" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="60" x2="320" y2="240" stroke="#27ae60" stroke-width="2.5"/>
            <text x="18" y="40" font-size="12">Q₂</text>
            <text x="320" y="255" font-size="12">Q₁</text>
        </svg>'''
    if 'phillips' in low or ('π' in pre_content and 'u' in low and 'inflation' in low):
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Phillips curve">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 50 Q 200 130 350 210" stroke="#2980b9" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">π</text>
            <text x="340" y="248" font-size="12">u</text>
        </svg>'''
    if 'output' in low and ('gap' in low or 'y*' in low or 'potential' in low):
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Output gap">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="200" y1="230" x2="200" y2="50" stroke="#888" stroke-dasharray="4,4" stroke-width="1.5"/>
            <path d="M 80 180 Q 200 100 320 70" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">Y</text>
            <text x="340" y="248" font-size="12">time</text>
        </svg>'''
    if 'exchange rate' in low or 'ε' in pre_content or 'real exchange' in low:
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Exchange rate">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 210 Q 200 100 350 50" stroke="#16a085" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">ε</text>
            <text x="340" y="248" font-size="12">Y</text>
        </svg>'''
    if 'is' in low and 'lm' in low and 'interest' in low:
        return '''<svg class="svg-graph" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" aria-label="IS-LM">
            <line x1="50" y1="20" x2="50" y2="220" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="220" x2="340" y2="220" stroke="#333" stroke-width="1.5"/>
            <path d="M 50 200 L 200 120 L 340 40" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <path d="M 50 40 L 200 120 L 340 200" stroke="#e74c3c" stroke-width="2.5" fill="none"/>
            <circle cx="200" cy="120" r="5" fill="#e74c3c"/>
            <text x="28" y="18" font-size="12">i</text>
            <text x="330" y="235" font-size="12">Y</text>
        </svg>'''
    if pre_content.strip().startswith('C\n') or ('consumption' in low and 'income' in low):
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Consumption function">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 50 200 L 350 50" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">C</text>
            <text x="340" y="248" font-size="12">Y</text>
        </svg>'''
    if 'supply' in low and ('shift' in low or 's₀' in low or 's0' in low):
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Supply shift">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 200 L 350 80" stroke="#3498db" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M 70 170 L 350 50" stroke="#e67e22" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">P</text>
            <text x="340" y="248" font-size="12">Q</text>
        </svg>'''
    if 'recession' in low and ('ad' in low or 'g↑' in pre_content):
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="AD shift">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 200 L 350 80" stroke="#3498db" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M 120 200 L 350 110" stroke="#27ae60" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">Y</text>
            <text x="340" y="248" font-size="12">AD</text>
        </svg>'''
    if 'p, cost' in low or ('mc' in low and 'atc' in low and 'profit-max' in low):
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="P=MC profit max">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 60 200 L 200 80 L 340 60" stroke="#e67e22" stroke-width="2" fill="none"/>
            <path d="M 60 180 Q 200 120 340 100" stroke="#8e44ad" stroke-width="2" fill="none"/>
            <line x1="60" y1="130" x2="370" y2="130" stroke="#2980b9" stroke-width="2"/>
            <circle cx="200" cy="130" r="5" fill="#e74c3c"/>
            <text x="22" y="30" font-size="12">P</text>
            <text x="340" y="248" font-size="12">q</text>
        </svg>'''
    if is_ascii_graph(pre_content):
        return '''<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Graph">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 200 Q 200 100 350 60" stroke="#3498db" stroke-width="2.5" fill="none"/>
        </svg>'''
    return None


def replace_ascii_graphs(text: str) -> str:
    def repl(m: re.Match) -> str:
        pre = m.group(1)
        if not is_ascii_graph(pre):
            return m.group(0)
        svg = svg_for_pre(pre)
        if svg:
            return svg
        return m.group(0)

    return re.sub(r'<pre>(.*?)</pre>', repl, text, flags=re.DOTALL)


def ensure_conclusion(text: str, name: str) -> str:
    if 'nb-conclusion' in text or 'ru-foot' in text:
        return text
    title = re.search(r'<title>(.*?)</title>', text, flags=re.DOTALL)
    label = title.group(1).strip() if title else name
    block = f'\n<div class="nb-conclusion"><p>Summary: {label}</p></div>\n'
    return text.replace('</div>\n</body>', block + '</div>\n</body>', 1)


def process(path: Path) -> bool:
    original = path.read_text(encoding='utf-8')
    if CSS_LINK in original and 'class="nb-page' in original and '<div class="nb-sheet">' in original:
        return False

    text = original
    extra = accent_class(path.name)

    text = remove_style_blocks(text)
    text = add_css_link(text)
    text = set_body_class(text, extra)
    text = wrap_nb_sheet(text)
    text = replace_en_class(text)
    text = add_nb_def(text)
    text = replace_ascii_graphs(text)
    text = ensure_conclusion(text, path.stem)

    if text != original:
        path.write_text(text, encoding='utf-8')
        return True
    return False


def main():
    count = 0
    updated = []
    for path in sorted(ECON.glob('*.html')):
        if path.name in SKIP:
            continue
        if 'Explanation' in path.name or path.name.startswith('Exam_Macro'):
            if process(path):
                updated.append(path.name)
                count += 1
    print(f'Updated {count} files:')
    for name in updated:
        print(f'  {name}')


if __name__ == '__main__':
    main()
