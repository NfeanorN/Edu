import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const economicsDir = path.join(root, '..', 'Economics')
const outDir = path.join(root, 'public', 'topics')

const files = [
  'Budget_Constraint_Explanation.html',
  'PPF_Explanation.html',
  'Demand_Explanation.html',
  'Rational_Choice_Explanation.html',
  'Elasticities_Explanation.html',
  'Production_Cost_Short_Run_Explanation.html',
  'Cost_Long_Run_Explanation.html',
  'Market_Power_Explanation.html',
  'Game_Theory_Explanation.html',
  'Price_Discrimination_Explanation.html',
  'Externalities_Explanation.html',
  'GDP_Macro_Explanation.html',
  'Goods_Market_Multiplier_Explanation.html',
  'Okun_Phillips_Explanation.html',
  'IS_LM_Explanation.html',
  'Fiscal_Monetary_Policy_Explanation.html',
  'Unemployment_Inflation_Explanation.html',
  'Open_Economy_Explanation.html',
]

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

for (const file of files) {
  const src = path.join(economicsDir, file)
  const dest = path.join(outDir, file)
  if (!fs.existsSync(src)) {
    console.warn('Skip (not found):', file)
    continue
  }
  let content = fs.readFileSync(src, 'utf8')
  content = content.replace(
    /<a href="index\.html">/g,
    '<a href="/" target="_parent">'
  )
  fs.writeFileSync(dest, content)
  console.log('Copied:', file)
}

console.log('Done.')
