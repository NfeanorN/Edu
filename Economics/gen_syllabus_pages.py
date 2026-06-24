#!/usr/bin/env python3
"""Generate 36 syllabus topic pages — simple English, Frank examples for micro."""

from pathlib import Path

from syllabus_extras import EXTRAS

OUT = Path(__file__).parent / "Syllabus"

CSS = """
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.75; margin: 0; padding: 1.5rem 1rem; color: #1a1a2e; background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%); }
        .wrap { max-width: 880px; margin: 0 auto; background: #fff; padding: 2rem 2.2rem; border-radius: 14px; box-shadow: 0 4px 20px rgba(0,0,0,.06); }
        h1 { color: #1a3a5c; border-bottom: 4px solid #27ae60; padding-bottom: 12px; font-size: 1.75rem; margin-top: 0; }
        h2 { color: #1a3a5c; margin-top: 2rem; font-size: 1.2rem; border-left: 5px solid #27ae60; padding-left: 12px; }
        p { margin: 10px 0; }
        ul, ol { margin: 10px 0; padding-left: 1.4rem; }
        li { margin: 6px 0; }
        .meta { color: #666; font-size: 0.92rem; margin-bottom: 1.2rem; }
        .back a { color: #27ae60; text-decoration: none; font-weight: 500; }
        .back a:hover { text-decoration: underline; }
        .frank { background: #eef3ff; border-left: 4px solid #5b8def; padding: 12px 16px; margin: 14px 0; border-radius: 6px; }
        .frank::before { content: "📙 Frank textbook: "; font-weight: 700; color: #3a6cdc; }
        .macro { background: #fff8e6; border-left: 4px solid #f39c12; padding: 12px 16px; margin: 14px 0; border-radius: 6px; font-size: 0.95rem; }
        .macro::before { content: "📊 Macro (course — not in Frank): "; font-weight: 700; color: #d68910; }
        .formula { background: #eef8f0; border-left: 4px solid #27ae60; padding: 12px 16px; margin: 14px 0; border-radius: 6px; font-family: Cambria, Georgia, serif; }
        .key { background: #fff8e7; border-left: 4px solid #f0b429; padding: 12px 16px; margin: 14px 0; border-radius: 6px; }
        .key::before { content: "⭐ Exam: "; font-weight: 700; color: #8a6d1f; }
        .graph { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 14px; margin: 14px 0; }
        .svg-graph { max-width: 100%; height: auto; display: block; margin: 0 auto; }
        .fig-cap { text-align: center; font-size: 0.88em; color: #555; margin-top: 8px; }
        table { border-collapse: collapse; width: 100%; margin: 14px 0; font-size: 0.93em; }
        th, td { border: 1px solid #e0e6ed; padding: 8px 10px; text-align: left; }
        th { background: #27ae60; color: #fff; }
        tr:nth-child(even) { background: #f8f9fa; }
        .more { margin-top: 1.5rem; padding-top: 1rem; border-top: 2px solid #ecf0f1; font-size: 0.95rem; }
        .more a { color: #27ae60; }
        code { background: #f1f3f6; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .warn { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px 14px; margin: 12px 0; border-radius: 6px; font-size: 0.94em; }
        .ru-foot { margin-top: 2.5rem; padding: 1rem 0 0; border-top: 1px dashed #bbb; font-size: 0.78rem; line-height: 1.6; color: #666; }
        .ru-foot h3 { font-size: 0.82rem; color: #888; margin: 0 0 8px; font-weight: 600; }
        .ru-foot p, .ru-foot li { margin: 6px 0; }
        .ru-foot ul { padding-left: 1.2rem; margin: 6px 0; }
"""

AXIS = """<line x1="50" y1="20" x2="50" y2="220" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="220" x2="380" y2="220" stroke="#333" stroke-width="1.5"/>"""

TOPICS = [
    {
        "num": 1, "slug": "01_Returns_to_Scale", "title": "Returns to Scale",
        "source": "Frank, Ch. 8–9 (Production & Long-Run Costs)",
        "frank": True,
        "body": """
<p><strong>Returns to scale (RTS)</strong> asks: if you double <em>all</em> inputs (labour and capital together), does output double, more than double, or less?</p>
<div class="frank">Frank's bakery (Ch. 9): when the firm scales up <strong>both</strong> ovens (K) and bakers (L), output can grow faster than inputs if workers specialize — that is <strong>increasing returns to scale</strong>. If doubling everything gives exactly twice the pies → <strong>constant RTS</strong>. If coordination problems appear → <strong>decreasing RTS</strong>.</div>
<table>
<tr><th>Type</th><th>If all inputs ×2</th><th>LRAC curve</th></tr>
<tr><td>Increasing</td><td>Output &gt; 2×</td><td>Falls ↓</td></tr>
<tr><td>Constant</td><td>Output = 2×</td><td>Flat</td></tr>
<tr><td>Decreasing</td><td>Output &lt; 2×</td><td>Rises ↑</td></tr>
</table>
<div class="formula">If Q = A·L<sup>α</sup>·K<sup>β</sup>: α + β &gt; 1 → increasing · = 1 → constant · &lt; 1 → decreasing</div>
<div class="key">RTS is a <strong>long-run</strong> idea (all factors variable). Do not confuse with <strong>diminishing marginal product</strong> in the short run (Ch. 8 kitchen — one more cook with a fixed kitchen).</div>""",
        "graph": f"""<div class="graph"><svg class="svg-graph" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">{AXIS}
            <path d="M 70 50 Q 200 180 350 200" stroke="#8e44ad" stroke-width="2.5" fill="none"/>
            <text x="300" y="45" font-size="12" fill="#8e44ad">LRAC</text>
            <text x="120" y="100" font-size="11">economies of scale</text>
            <text x="280" y="190" font-size="11">diseconomies</text>
            <text x="18" y="28">Cost</text><text x="360" y="235">Q</text>
        </svg><p class="fig-cap">Frank Ch. 9: falling LRAC ↔ increasing RTS (economies of scale).</p></div>""",
        "links": "Production_Function_Explanation.html · Cost_Long_Run_Explanation.html",
    },
    {
        "num": 2, "slug": "02_Short_vs_Long_Run", "title": "Short Run vs Long Run",
        "source": "Frank, Ch. 8–9",
        "frank": True,
        "body": """
<p><strong>Short run:</strong> at least one input is <strong>fixed</strong>. Frank (Ch. 8): the kitchen size is fixed — you can hire more cooks (L) but not instantly build a bigger kitchen (K).</p>
<p><strong>Long run:</strong> <strong>all</strong> inputs can change. The firm can choose plant size, technology, and the best mix of L and K (isoquants & isocosts, Ch. 9).</p>
<div class="frank">Short run → diminishing returns to labour (MP<sub>L</sub> eventually falls). Long run → returns to scale and LRAC envelope from many short-run ATC curves.</div>
<div class="key">"Short run" is not "tomorrow vs ten years" — it means "can you change the factory <em>right now</em>?"</div>""",
        "graph": "",
        "links": "Production_Cost_Short_Run_Explanation.html · Production_Function_Explanation.html",
    },
    {
        "num": 3, "slug": "03_Isoquant_Isocost", "title": "Isoquant & Isocost — Produce More with Less Unit Cost",
        "source": "Frank, Ch. 9 — Figures 9.10, 9.13",
        "frank": True,
        "body": """
<p><strong>Isoquant:</strong> all (L, K) bundles that produce the <strong>same output Q</strong>. Higher curve = more output.</p>
<p><strong>Isocost:</strong> all bundles that cost the same: <strong>C = wL + rK</strong>. Slope = <strong>−w/r</strong>.</p>
<p>Minimum cost for a given Q = <strong>tangency</strong> (touch point) of isoquant and the lowest possible isocost line.</p>
<div class="frank">With <strong>increasing returns to scale</strong> (Ch. 9), scaling up both L and K can raise Q <em>faster</em> than cost — so <strong>unit cost (AC) falls</strong>. That is how you "produce more with less cost per unit."</div>
<div class="formula">Optimum: MRTS = MP<sub>L</sub>/MP<sub>K</sub> = w/r</div>""",
        "graph": f"""<div class="graph"><svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">{AXIS}
            <path d="M 70 50 Q 140 130 220 170 T 340 210" stroke="#27ae60" stroke-width="2" fill="none"/>
            <path d="M 70 90 Q 160 200 280 215" stroke="#27ae60" stroke-width="2" fill="none" opacity="0.5"/>
            <line x1="60" y1="70" x2="330" y2="210" stroke="#e67e22" stroke-width="2"/>
            <line x1="60" y1="110" x2="280" y2="215" stroke="#e67e22" stroke-width="2" opacity="0.55"/>
            <circle cx="175" cy="145" r="5" fill="#8e44ad"/><circle cx="230" cy="195" r="5" fill="#8e44ad"/>
            <text x="18" y="28">K</text><text x="360" y="235">L</text>
        </svg><p class="fig-cap">Green = isoquants (Q₁, Q₂). Orange = isocosts. Purple dots = cost-minimizing tangency points.</p></div>""",
        "links": "Cost_Long_Run_Explanation.html",
    },
    {
        "num": 4, "slug": "04_MC_MR_Average_Cost", "title": "MC, MR & Average Cost",
        "source": "Frank, Ch. 9 (Fig. 9.4), Ch. 10–11",
        "frank": True,
        "body": """
<p><strong>MC</strong> = extra cost of one more unit. <strong>AVC / ATC</strong> = average cost per unit.</p>
<p>Frank (Fig. 9.4): <strong>MC crosses AVC and ATC at their minimum points</strong>. When MC &lt; AVC, AVC is falling.</p>
<p><strong>MR</strong> = extra revenue from one more unit. Perfect competition (Ch. 10): <strong>P = MR</strong>. Monopoly (Ch. 11): <strong>MR &lt; P</strong>.</p>
<div class="frank">Monopoly example (Ch. 11): to sell 11 units instead of 10, price must drop from $100 to $95. Revenue rises by $45, not $95 — that is <strong>MR = $45</strong> on the 11th unit.</div>
<div class="formula">Profit max (any firm): <strong>MR = MC</strong> · Competition: <strong>P = MC</strong></div>""",
        "graph": f"""<div class="graph"><svg class="svg-graph" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">{AXIS}
            <path d="M 60 200 Q 120 60 200 80 T 350 50" stroke="#2980b9" stroke-width="2.5" fill="none"/>
            <path d="M 60 180 Q 150 100 200 95 T 350 85" stroke="#16a085" stroke-width="2" fill="none"/>
            <path d="M 60 170 Q 140 90 200 88 T 350 75" stroke="#8e44ad" stroke-width="2" stroke-dasharray="4,3" fill="none"/>
            <text x="300" y="55" font-size="11" fill="#2980b9">MC</text>
            <text x="300" y="90" font-size="11" fill="#16a085">AVC</text>
            <text x="300" y="78" font-size="11" fill="#8e44ad">ATC</text>
        </svg><p class="fig-cap">Figure 9.4 style: MC cuts AVC and ATC at their bottoms.</p></div>""",
        "links": "Production_Cost_Short_Run_Explanation.html · Monopoly_Explanation.html · Perfect_Competition_Explanation.html",
    },
    {
        "num": 5, "slug": "05_Isocost", "title": "Iso-cost Function",
        "source": "Frank, Ch. 9",
        "frank": True,
        "body": """
<div class="formula"><strong>C = wL + rK</strong><br>w = wage rate · r = rental rate of capital · slope of isocost = <strong>−w/r</strong></div>
<p>Parallel isocost lines = different total budgets. If wages rise (w ↑), the line becomes steeper — labour is relatively more expensive, so the firm shifts toward more capital (K).</p>
<div class="frank">Frank (Ch. 9): the firm picks the lowest isocost line that still reaches the required isoquant — same logic as a consumer picking the lowest budget line that reaches an indifference curve (Ch. 3).</div>""",
        "graph": "",
        "links": "Cost_Long_Run_Explanation.html",
    },
    {
        "num": 6, "slug": "06_Game_Theory", "title": "Game Theory & Nash Equilibrium",
        "source": "Frank, Ch. 12 — Table 12.1",
        "frank": True,
        "body": """
<p>Game theory studies situations where your payoff depends on <strong>what others do</strong> (strategic behaviour). Ch. 13 oligopoly builds on Ch. 12.</p>
<div class="frank"><strong>Prisoner's Dilemma (Table 12.1):</strong> two suspects choose <em>Confess</em> or <em>Don't confess</em>. Each wants a shorter sentence, but mutual confession is worse for both than mutual silence. <strong>Dominant strategy</strong> = best move no matter what the other does. <strong>Nash equilibrium</strong> = no player wants to change alone.</div>
<table>
<tr><th></th><th>Other: Silent</th><th>Other: Confess</th></tr>
<tr><td><strong>You: Silent</strong></td><td>Light sentence for both (best joint)</td><td>You punished, other goes free</td></tr>
<tr><td><strong>You: Confess</strong></td><td>You go free, other punished</td><td>Medium sentence for both (Nash)</td></tr>
</table>
<p>Frank links this to oligopoly: each firm wants to undercut or overproduce, but industry profit is higher if they cooperate — yet each has incentive to cheat (Ch. 13).</p>
<div class="key">Nash equilibrium ≠ best outcome for society. Prisoner's dilemma shows why cooperation is hard without binding agreements.</div>""",
        "graph": "",
        "links": "Game_Theory_Explanation.html · Market_Power_Explanation.html · Frank_Study_Guide_EN.html#oligopoly",
    },
    {
        "num": 7, "slug": "07_Utility_Function", "title": "Shape of the Utility Function",
        "source": "Frank, Ch. 3 — Appendix",
        "frank": True,
        "body": """
<p>Utility U measures satisfaction from a consumption bundle. Frank uses <strong>indifference curves</strong> — all bundles with the same U.</p>
<div class="frank">Example from Ch. 3 Appendix: <strong>U(F, S) = F × S</strong> where F = food (lb/week), S = shelter (sq yd/week). Bundle (4, 3) and (3, 4) both give U = 12. Bundle (8, 6) gives U = 48 — higher utility, outer indifference curve.</div>
<p>Typical shape: <strong>diminishing marginal utility</strong> — each extra unit of a good adds less extra satisfaction. Indifference curves are <strong>downward sloping</strong> and <strong>convex to the origin</strong> (Frank, Ch. 3).</p>""",
        "graph": "",
        "links": "Rational_Choice_Explanation_EN.html",
    },
    {
        "num": 8, "slug": "08_Intertemporal_Budget", "title": "Intertemporal Budget Constraint (PV & FV)",
        "source": "Frank, Ch. 5 — Figures 5.13–5.17",
        "frank": True,
        "body": """
<p>You choose consumption in <strong>period 1</strong> (today) and <strong>period 2</strong> (future), not just across goods.</p>
<div class="frank">Frank (Ch. 5): income M₁ = <strong>$50,000</strong> in period 1 and M₂ = <strong>$60,000</strong> in period 2, interest rate <strong>r = 20%</strong>. Present-value budget line: <strong>C₁ + C₂/(1+r) = M₁ + M₂/(1+r)</strong>. Equivalently in future-value form: <strong>C₁(1+r) + C₂ = M₁(1+r) + M₂</strong> → slope in (C₁, C₂) space: <strong>−(1+r)</strong>.</div>
<div class="formula">PV of $1 next year = 1/(1+r) · FV of $1 today = 1+r<br>Save if C₁ &lt; M₁ · Borrow if C₁ &gt; M₁</div>
<p>Figure 5.17: a <strong>patient</strong> person saves (consumes less than income today); an <strong>impatient</strong> person borrows (consumes more than income today).</p>""",
        "graph": f"""<div class="graph"><svg class="svg-graph" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">{AXIS}
            <line x1="80" y1="50" x2="320" y2="200" stroke="#e74c3c" stroke-width="2.5"/>
            <circle cx="200" cy="125" r="5" fill="#27ae60"/>
            <text x="18" y="28">C₂</text><text x="360" y="235">C₁</text>
            <text x="190" y="115" font-size="11">endowment</text>
        </svg><p class="fig-cap">Budget line between C₁ and C₂; slope reflects interest rate (Frank Fig. 5.13–5.17).</p></div>""",
        "links": "Intertemporal_Budget_Constraint_Explanation.html",
    },
    {
        "num": 9, "slug": "09_Central_Bank_Inflation", "title": "Why Does the Central Bank Change the Interest Rate?",
        "source": "Macroeconomics course (not in Frank)",
        "frank": False,
        "body": """
<div class="macro">This topic is from your <strong>macro</strong> course. Frank's textbook focuses on micro; use your lecture notes for exact numbers.</div>
<p>The central bank (ECB, Fed) sets a <strong>policy interest rate</strong> mainly to control <strong>inflation</strong> (target ~2%).</p>
<ul>
<li><strong>Inflation too high</strong> → raise r → loans cost more → spending falls → prices cool down</li>
<li><strong>Recession / low inflation</strong> → cut r → stimulate spending</li>
</ul>
<div class="key">Main exam answer: CB changes r to control inflation (price stability), not "to help banks."</div>""",
        "graph": "",
        "links": "Fiscal_Monetary_Policy_Explanation.html · Exam_Macro_Key_Questions.html",
    },
    {
        "num": 10, "slug": "10_Interest_Rate_GDP", "title": "How Does the Interest Rate Affect GDP?",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro topic — not in Frank textbook.</div>
<p><strong>Higher r:</strong> borrowing is expensive → <strong>C</strong> ↓ (mortgages, cars) and <strong>I</strong> ↓ (business investment) → <strong>aggregate demand ↓</strong> → <strong>GDP (Y) ↓</strong> → less inflation pressure.</p>
<p><strong>Lower r:</strong> the opposite chain → GDP ↑.</p>
<div class="key">Chain: r → C and I → AD → Y (GDP). On IS-LM: higher r moves equilibrium left (lower Y).</div>""",
        "graph": "",
        "links": "IS_LM_Explanation.html · Fiscal_Monetary_Policy_Explanation.html",
    },
    {
        "num": 11, "slug": "11_Marginal_Propensity", "title": "Marginal Propensity to Consume (MPC)",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro topic — consumption function C = c₀ + c₁Y is not in Frank.</div>
<div class="formula">MPC = ΔC / ΔY (fraction of extra income spent) · MPS = ΔS / ΔY · MPC + MPS = 1</div>
<p>If you earn €100 more and spend €80, MPC = 0.8 and MPS = 0.2.</p>
<div class="key">MPC is the <strong>slope</strong> of the consumption function C(Y). Higher MPC → bigger multiplier.</div>""",
        "graph": "",
        "links": "Consumption_Function_Explanation.html · Goods_Market_Multiplier_Explanation.html",
    },
    {
        "num": 12, "slug": "12_Marginal_Utility", "title": "Marginal Utility (MU)",
        "source": "Frank, Ch. 1 & 3",
        "frank": True,
        "body": """
<p><strong>Marginal utility (MU)</strong> = extra satisfaction from <strong>one more unit</strong> of a good.</p>
<div class="frank">Ch. 1 (Figure 1.1): marginal <em>benefit</em> of talking on the phone falls as you talk longer — same idea as diminishing MU for goods. Ch. 3: rational rule uses <strong>MU per dollar</strong>, not raw MU.</div>
<div class="formula">Rational spending: MU<sub>x</sub>/P<sub>x</sub> = MU<sub>y</sub>/P<sub>y</sub></div>
<div class="key">You do NOT maximize MU alone — you equalize MU/P across goods (Exam topic 22).</div>""",
        "graph": "",
        "links": "Rational_Choice_Explanation_EN.html",
    },
    {
        "num": 13, "slug": "13_Reservation_Price", "title": "Reservation Price",
        "source": "Frank, Ch. 1 & 2",
        "frank": True,
        "body": """
<p><strong>Reservation price</strong> = the highest price you are still willing to pay for one more unit.</p>
<div class="frank">Ch. 1: stereo sale — you buy at $1 but not at $0.75; your reservation price is between those values. Ch. 2 (lobsters, Figure 2.1): the demand schedule shows reservation prices — at Q = 4,000 lobsters/day the marginal buyer's reservation price is <strong>$8</strong>.</div>
<div class="key">If market price &gt; your reservation price → you do not buy. Demand curve = marginal reservation prices.</div>""",
        "graph": "",
        "links": "Demand_Explanation.html · Consumer_Surplus_Explanation.html",
    },
    {
        "num": 14, "slug": "14_Opportunity_Cost", "title": "Opportunity Cost",
        "source": "Frank, Ch. 1 & 3",
        "frank": True,
        "body": """
<p><strong>Opportunity cost</strong> = value of the <strong>best alternative</strong> you give up.</p>
<div class="frank">Ch. 1 pitfalls: confusing accounting cost with economic cost — tuition is explicit, but <strong>forgone wages</strong> are opportunity cost of college. Ch. 3: slope of budget line for shelter & food (M = $100/wk, P<sub>S</sub> = $5, P<sub>F</sub> = $10) = <strong>−P<sub>S</sub>/P<sub>F</sub> = −1/2</strong> = opportunity cost of one more sq yd of shelter in terms of food.</div>
<div class="key">Sunk costs (already paid, cannot recover) should NOT affect current decisions (Frank, Ch. 9).</div>""",
        "graph": "",
        "links": "Opportunity_Cost_Explanation.html · Budget_Constraint_Explanation.html",
    },
    {
        "num": 15, "slug": "15_Perfect_Competition", "title": "Perfect Competition",
        "source": "Frank, Ch. 10 — Figures 10.2, 10.4",
        "frank": True,
        "body": """
<p>Many small firms, identical product, free entry — each firm is a <strong>price taker</strong>.</p>
<div class="frank">Frank (Ch. 10): if one wheat farmer raises price by a penny, buyers switch — so <strong>P = MR = AR</strong> for the firm. Profit max: <strong>P = MC</strong>. <strong>Shutdown rule:</strong> produce only if <strong>P ≥ AVC<sub>min</sub></strong> (Figure 10.4). Long run: entry drives <strong>economic profit to zero</strong> (p. 321).</div>""",
        "graph": "",
        "links": "Perfect_Competition_Explanation.html",
    },
    {
        "num": 16, "slug": "16_Rational_Spending_Rule", "title": "Rational Spending Rule",
        "source": "Frank, Ch. 3 — Figure 3.15",
        "frank": True,
        "body": """
<div class="formula"><strong>MU<sub>S</sub>/P<sub>S</sub> = MU<sub>F</sub>/P<sub>F</sub></strong> equivalently <strong>MRS = P<sub>S</sub>/P<sub>F</sub></strong></div>
<div class="frank">Shelter & food, M = $100/wk, P<sub>S</sub> = $5/sq yd, P<sub>F</sub> = $10/lb. At a point where IC slope (MRS) = 1/4 but budget slope = 1/2, the consumer should buy <strong>more food</strong> and less shelter until rates match (Figure 3.15).</div>""",
        "graph": "",
        "links": "Rational_Choice_Explanation_EN.html",
    },
    {
        "num": 17, "slug": "17_Investment_vs_Saving", "title": "Investment vs Saving",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro identity — not in Frank micro chapters.</div>
<table>
<tr><th></th><th>Saving (S)</th><th>Investment (I)</th></tr>
<tr><td>Who</td><td>Households (and government surplus)</td><td>Firms buying capital</td></tr>
<tr><td>Meaning</td><td>Income not consumed now</td><td>Spending on machines, buildings, inventory</td></tr>
</table>
<div class="formula">Closed economy equilibrium: <strong>S = I</strong> · Y = C + I + G + NX</div>""",
        "graph": "",
        "links": "Goods_Market_Multiplier_Explanation.html",
    },
    {
        "num": 18, "slug": "18_Supply_and_Demand", "title": "Supply and Demand",
        "source": "Frank, Ch. 2 — Figures 2.1, 2.5, 2.9",
        "frank": True,
        "body": """
<p><strong>Demand:</strong> lower P → higher Q demanded (law of demand). <strong>Supply:</strong> higher P → higher Q supplied.</p>
<div class="frank">Hyannis lobster market (Figure 2.1): at P = $20, Q<sub>D</sub> = 1,000/day; at P = $8, Q<sub>D</sub> = 4,000/day. Equilibrium (Figure 2.5): <strong>P* = $8</strong>, <strong>Q* = 4,000</strong>/day where D and S cross.</div>
<p><strong>Movement along curve</strong> = own price changed. <strong>Shift</strong> = other factor changed (Figure 2.9 — income, substitutes, input prices, etc.).</p>""",
        "graph": f"""<div class="graph"><svg class="svg-graph" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">{AXIS}
            <line x1="60" y1="40" x2="340" y2="200" stroke="#3498db" stroke-width="2.5"/>
            <line x1="60" y1="200" x2="340" y2="40" stroke="#e67e22" stroke-width="2.5"/>
            <circle cx="200" cy="120" r="6" fill="#e74c3c"/>
            <text x="185" y="235" font-size="11">Q*=4</text>
            <text x="22" y="125" font-size="11">P*=8</text>
        </svg><p class="fig-cap">Figure 2.5 style: equilibrium at P* = $8, Q* = 4 (thousands of lobsters/day).</p></div>""",
        "links": "Demand_Explanation.html · Supply_Explanation.html",
    },
    {
        "num": 19, "slug": "19_Money_Market", "title": "Money Market & Money Supply",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro — money market is not in Frank.</div>
<p><strong>Money demand L(r, Y):</strong> falls when r rises (bonds look better); rises when Y rises (more transactions).</p>
<p><strong>Money supply M<sup>s</sup>:</strong> set by central bank — vertical line. Equilibrium sets <strong>interest rate r</strong>.</p>""",
        "graph": "",
        "links": "Fiscal_Monetary_Policy_Explanation.html · IS_LM_Explanation.html",
    },
    {
        "num": 20, "slug": "20_LR_Cost_RTS", "title": "Long-Run Cost Function & Returns to Scale",
        "source": "Frank, Ch. 9 — Figure 9.13",
        "frank": True,
        "body": """
<p><strong>LRAC</strong> = envelope of many short-run ATC curves — each SR curve is for one plant size.</p>
<div class="frank">Frank (Ch. 9, p. 286): shape of LRAC predicts industry structure — <strong>falling LRAC</strong> (increasing RTS) → one big firm tends toward <strong>monopoly</strong>; <strong>rising LRAC</strong> → many small firms.</div>""",
        "graph": "",
        "links": "Cost_Long_Run_Explanation.html",
    },
    {
        "num": 21, "slug": "21_CB_Interest_Rate", "title": "Central Bank & Interest Rate",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Same chain as topics 9–10 — macro course.</div>
<p>The CB sets the <strong>policy rate</strong> → banks adjust loan/deposit rates → affects C, I, and GDP. Tools: open market operations (buy/sell bonds), reserve requirements, discount rate.</p>
<div class="key"><strong>Sell bonds</strong> → money supply ↓ → r ↑ → GDP ↓ (tight policy).</div>""",
        "graph": "",
        "links": "Exam_Macro_Key_Questions.html#q5 · Fiscal_Monetary_Policy_Explanation.html",
    },
    {
        "num": 22, "slug": "22_When_MU_Maximized", "title": "When Is Marginal Utility Maximized?",
        "source": "Frank, Ch. 3",
        "frank": True,
        "body": """
<p>MU for one good is highest at very low consumption, then falls (diminishing MU). But the consumer does <strong>not</strong> choose max MU — they choose <strong>max utility</strong> subject to the budget.</p>
<div class="frank">Optimum: <strong>MU<sub>x</sub>/P<sub>x</sub> = MU<sub>y</sub>/P<sub>y</sub></strong> — last dollar spent on each good gives equal extra utility. MU alone can be high for bread and low for water, but you still buy both because prices differ.</div>""",
        "graph": "",
        "links": "Rational_Choice_Explanation_EN.html",
    },
    {
        "num": 23, "slug": "23_Monopolist_Delta_TR", "title": "Monopolist Strategies & Change in TR",
        "source": "Frank, Ch. 11 — Figure 11.5",
        "frank": True,
        "body": """
<p>Monopolist faces downward-sloping D. To sell more, it must <strong>cut price on all units</strong>, so <strong>MR &lt; P</strong>.</p>
<div class="frank">Ch. 11: 10 units × $100 = TR $1,000. Eleventh unit: P drops to $95, TR = $1,045 → <strong>ΔTR = $45</strong> (not $95). Linear demand: MR has same intercept as D but <strong>twice the slope</strong> (Figure 11.5).</div>
<div class="formula">MR = MC → find Q* → read P* from demand</div>""",
        "graph": "",
        "links": "Monopoly_Explanation.html",
    },
    {
        "num": 24, "slug": "24_Real_vs_Nominal_GDP", "title": "Real GDP vs Nominal GDP",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro — GDP accounting not in Frank.</div>
<p><strong>Nominal GDP</strong> = output valued at <strong>current prices</strong>. <strong>Real GDP</strong> = output at <strong>constant (base-year) prices</strong> — measures actual quantity produced.</p>
<div class="formula">Real GDP = Nominal GDP / GDP deflator</div>""",
        "graph": "",
        "links": "GDP_Macro_Explanation.html",
    },
    {
        "num": 25, "slug": "25_CB_Money_Supply", "title": "How the Central Bank Changes Money Supply",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro tools — not in Frank.</div>
<ul>
<li><strong>Open market operations:</strong> buy bonds → M ↑, r ↓ · sell bonds → M ↓, r ↑</li>
<li><strong>Reserve requirements</strong></li>
<li><strong>Discount rate</strong> (rate at which banks borrow from CB)</li>
</ul>""",
        "graph": "",
        "links": "Exam_Macro_Key_Questions.html#q5 · Fiscal_Monetary_Policy_Explanation.html",
    },
    {
        "num": 26, "slug": "26_IS_LM", "title": "IS-LM Model",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">IS-LM is macro — not in Frank.</div>
<p><strong>IS curve</strong> (goods market): lower interest rate → more I and C → higher Y. Downward sloping.</p>
<p><strong>LM curve</strong> (money market): higher Y → more money demand → higher r. Upward sloping.</p>
<p><strong>Equilibrium:</strong> intersection gives <strong>Y*</strong> and <strong>i*</strong>. Solve two equations with two unknowns on the exam.</p>""",
        "graph": "",
        "links": "IS_LM_Explanation.html · Exam_Macro_Key_Questions.html#q7",
    },
    {
        "num": 27, "slug": "27_Exchange_Rates", "title": "Real vs Nominal Exchange Rate",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Open-economy macro — not in Frank.</div>
<p><strong>Nominal exchange rate:</strong> price of foreign currency in domestic currency.</p>
<p><strong>Real exchange rate:</strong> adjusts nominal rate for <strong>price levels</strong> at home and abroad — measures relative purchasing power of goods.</p>""",
        "graph": "",
        "links": "Open_Economy_Explanation.html",
    },
    {
        "num": 28, "slug": "28_Multiplier", "title": "Spending Multiplier (Graph)",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Keynesian multiplier — macro course.</div>
<div class="formula">Multiplier = 1 / (1 − MPC) = 1 / MPS · ΔY = Multiplier × ΔG</div>
<p>Example: MPC = 0.8 → multiplier = 5. If ΔG = €10 bn, total ΔY = €50 bn through rounds of spending.</p>
<div class="key">On the 45° diagram: AE shifts up parallel → new equilibrium Y is larger than the initial ΔG.</div>""",
        "graph": f"""<div class="graph"><svg class="svg-graph" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">{AXIS}
            <path d="M 50 220 L 360 30" stroke="#999" stroke-dasharray="5,4" fill="none"/>
            <path d="M 50 200 L 340 50" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <path d="M 50 170 L 340 50" stroke="#e67e22" stroke-width="2.5" fill="none"/>
            <text x="280" y="70" font-size="11" fill="#e67e22">AE₁</text>
        </svg><p class="fig-cap">ΔG shifts aggregate expenditure up → ΔY &gt; ΔG.</p></div>""",
        "links": "Goods_Market_Multiplier_Explanation.html",
    },
    {
        "num": 29, "slug": "29_Budget_Shift", "title": "Budget Constraint — Shift When Price Falls",
        "source": "Frank, Ch. 3",
        "frank": True,
        "body": """
<p>Budget line: <strong>P<sub>S</sub>·S + P<sub>F</sub>·F = M</strong>. Intercepts: M/P<sub>S</sub> on shelter axis, M/P<sub>F</sub> on food axis.</p>
<div class="frank">If <strong>P<sub>F</sub> falls</strong> (food cheaper), the food intercept <strong>M/P<sub>F</sub> rises</strong> — the budget line rotates <strong>outward</strong> on the food axis; shelter intercept unchanged. Consumer can reach higher indifference curves (Ch. 3, price and income changes).</div>""",
        "graph": "",
        "links": "Budget_Constraint_Explanation.html · Rational_Choice_Explanation_EN.html",
    },
    {
        "num": 30, "slug": "30_MPC_Slope", "title": "MPC & Slope of Consumption Function",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro consumption function — not Frank.</div>
<div class="formula"><strong>C = c₀ + c₁·Y</strong> · c₁ = MPC = <strong>slope</strong> of C(Y) line</div>
<p>c₀ = autonomous consumption (spending when Y = 0). c₁ = fraction of each extra euro of income spent.</p>""",
        "graph": "",
        "links": "Consumption_Function_Explanation.html · Exam_Macro_Key_Questions.html#q3",
    },
    {
        "num": 31, "slug": "31_Phillips_Okun", "title": "Okun's Law & Phillips Curve",
        "source": "Macroeconomics course",
        "frank": False,
        "body": """
<div class="macro">Macro — not in Frank.</div>
<p><strong>Okun's Law:</strong> when GDP growth is below potential, unemployment rises (rough rule: 1% extra unemployment ↔ ~2% GDP gap).</p>
<p><strong>Phillips curve (short run):</strong> lower unemployment ↔ higher inflation. <strong>Long run:</strong> vertical at natural rate — no trade-off.</p>""",
        "graph": "",
        "links": "Okun_Phillips_Explanation_EN.html",
    },
    {
        "num": 32, "slug": "32_Maximize_Profit", "title": "How to Maximize Profit",
        "source": "Frank, Ch. 10–11",
        "frank": True,
        "body": """
<div class="formula"><strong>MR = MC</strong> → Q* · then P* from demand (monopoly) or P given by market (competition)</div>
<p><strong>Profit</strong> = (P − ATC) × Q at Q*. If P &lt; AVC<sub>min</sub>, shut down in short run (Ch. 10).</p>
<div class="frank">Competition: P = MR so rule becomes P = MC. Monopoly: MR &lt; P — never produce where |ε| &lt; 1 (inelastic region).</div>""",
        "graph": "",
        "links": "Perfect_Competition_Explanation.html · Monopoly_Explanation.html",
    },
    {
        "num": 33, "slug": "33_Price_Discrimination", "title": "Price Discrimination",
        "source": "Frank, Ch. 11, pp. 352–357",
        "frank": True,
        "body": """
<p>Same product sold at <strong>different prices</strong> to different buyers. Needs market power and ability to prevent resale.</p>
<div class="frank">Frank (Ch. 11): with linear demand P = 10 − Q and MC = 2, single-price monopoly sets Q* = 4, P* = 6. With <strong>perfect (first-degree)</strong> discrimination, firm charges each unit its WTP → MR = D, sells until P = MC, no deadweight loss.</div>""",
        "graph": "",
        "links": "Price_Discrimination_Explanation.html",
    },
    {
        "num": 34, "slug": "34_Perfect_Price_Discrimination", "title": "Perfect (First-Degree) Price Discrimination",
        "source": "Frank, Ch. 11",
        "frank": True,
        "body": """
<p>Charge each buyer exactly their <strong>willingness to pay</strong> for each unit. MR curve = demand curve.</p>
<div class="frank">Monopolist captures all consumer surplus; produces efficient quantity where P = MC on last unit. Contrast with single-price monopoly: lower Q, higher P, deadweight loss triangle.</div>""",
        "graph": "",
        "links": "Price_Discrimination_Explanation.html · Consumer_Surplus_Explanation.html",
    },
    {
        "num": 35, "slug": "35_Willingness_to_Pay", "title": "Willingness to Pay (WTP)",
        "source": "Frank, Ch. 2 & 5 — Figure 5.4",
        "frank": True,
        "body": """
<p><strong>WTP</strong> = maximum a buyer would pay for a unit. The demand curve shows marginal WTP at each quantity.</p>
<div class="frank">Ch. 5 (Figure 5.4): <strong>consumer surplus</strong> = area between demand curve and price paid — difference between WTP and actual price for all units bought. Lobster market: buyers who would pay up to $20 but pay $8 gain surplus.</div>""",
        "graph": "",
        "links": "Consumer_Surplus_Explanation.html · Demand_Explanation.html",
    },
    {
        "num": 36, "slug": "36_Industry_Supply", "title": "Industry Supply — Short Run vs Long Run",
        "source": "Frank, Ch. 10 — p. 321, Figure 10.11",
        "frank": True,
        "body": """
<p><strong>Short-run industry supply</strong> = horizontal sum of firms' SR supply (MC above AVC).</p>
<p><strong>Long run:</strong> firms enter if profit &gt; 0, exit if profit &lt; 0 → price moves to minimum LRAC; <strong>economic profit = 0</strong>.</p>
<div class="frank">Frank (Ch. 10): in perfect competition, long-run equilibrium P = min LRAC. Industry with many small bakeries vs natural monopoly from falling LRAC (Ch. 9).</div>""",
        "graph": "",
        "links": "Perfect_Competition_Explanation.html · Cost_Long_Run_Explanation.html",
    },
]


def page(t):
    links_html = " · ".join(
        f'<a href="../{x.strip()}">{x.strip().replace("_", " ").replace(".html", "")}</a>'
        for x in t["links"].split("·")
    )
    source_line = f'<strong>Source:</strong> {t["source"]}'
    ex = EXTRAS.get(t["num"], {})
    extra_html = ex.get("extra", "")
    ru_html = ex.get("ru", "")
    ru_block = (
        f'<div class="ru-foot"><h3>🇷🇺 По-русски</h3>{ru_html}</div>'
        if ru_html
        else ""
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Topic {t['num']}: {t['title']} — Economics Syllabus</title>
    <style>{CSS}</style>
</head>
<body>
<div class="wrap">
    <p class="back"><a href="index.html">← Syllabus (36 topics)</a> · <a href="../index.html">Economics home</a> · <a href="../Exam_Prep_Guide.html#t{t['num']}">Exam Prep #{t['num']}</a></p>
    <h1>Topic {t['num']}: {t['title']}</h1>
    <p class="meta">{source_line}</p>
    {t['body']}
    {t.get('graph', '')}
    {extra_html}
    <div class="more"><strong>Full chapters:</strong> {links_html}</div>
    {ru_block}
</div>
</body>
</html>
"""


def index_html():
    items = "\n".join(
        f'            <li><a href="{t["slug"]}.html"><span class="title">{t["num"]}. {t["title"]}</span>'
        f'<span class="desc">{"Frank textbook" if t.get("frank") else "Macro course"} · simple English + graphs</span></a></li>'
        for t in TOPICS
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Syllabus — 36 Exam Topics (English)</title>
    <style>
        * {{ box-sizing: border-box; }}
        body {{ font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.6; margin: 0; padding: 2rem; color: #1a1a2e; background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%); min-height: 100vh; }}
        .wrap {{ max-width: 820px; margin: 0 auto; }}
        h1 {{ color: #2c3e50; border-bottom: 4px solid #27ae60; padding-bottom: 12px; }}
        .sub {{ color: #555; margin-bottom: 1.5rem; }}
        .topics {{ list-style: none; padding: 0; }}
        .topics li {{ margin: 0.45rem 0; }}
        .topics a {{ display: block; padding: 0.75rem 1rem; background: #fff; border-radius: 10px; text-decoration: none; color: #2c3e50; border: 1px solid #e0e6ed; }}
        .topics a:hover {{ border-color: #27ae60; box-shadow: 0 4px 12px rgba(39,174,96,.12); }}
        .title {{ font-weight: 600; }}
        .desc {{ display: block; color: #666; font-size: 0.82rem; margin-top: 3px; }}
        .back a {{ color: #27ae60; text-decoration: none; }}
        .note {{ background: #fff; border-left: 4px solid #5b8def; padding: 12px 16px; border-radius: 6px; margin: 1rem 0 1.5rem; font-size: 0.95rem; }}
    </style>
</head>
<body>
<div class="wrap">
    <p class="back"><a href="../index.html">← Economics home</a></p>
    <h1>Syllabus — 36 Exam Topics</h1>
    <p class="sub">One page per topic · clearest English · <strong>micro examples from Frank only</strong> · macro marked separately · <strong>🇷🇺 Russian summary at the bottom of each page</strong></p>
    <div class="note">📙 <strong>Micro (topics 1–8, 12–16, 18, 20, 22–23, 29, 32–36):</strong> Robert H. Frank, <em>Microeconomics and Behavior</em>.<br>
    📊 <strong>Macro (topics 9–11, 17, 19, 21, 24–28, 30–31):</strong> course lectures — not in Frank.</div>
    <ul class="topics">
{items}
    </ul>
</div>
</body>
</html>
"""


def main():
    OUT.mkdir(exist_ok=True)
    for t in TOPICS:
        (OUT / f"{t['slug']}.html").write_text(page(t), encoding="utf-8")
    (OUT / "index.html").write_text(index_html(), encoding="utf-8")
    print(f"Wrote {len(TOPICS)} topics + index → {OUT}")


if __name__ == "__main__":
    main()
