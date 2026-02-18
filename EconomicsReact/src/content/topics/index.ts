import type { TopicContent } from '../../components/TopicContent'
import { budgetConstraint } from './budget-constraint'
import { intertemporalBudgetConstraint } from './intertemporal-budget-constraint'
import { opportunityCost } from './opportunity-cost'
import { ppf } from './ppf'
import { demand } from './demand'
import { consumerSurplus } from './consumer-surplus'
import { supply } from './supply'
import { rationalChoice } from './rational-choice'
import { elasticities } from './elasticities'
import { productionCostShortRun } from './production-cost-short-run'
import { productionFunction } from './production-function'
import { costLongRun } from './cost-long-run'
import { marketPower } from './market-power'
import { gameTheory } from './game-theory'
import { priceDiscrimination } from './price-discrimination'
import { externalities } from './externalities'
import { gdpMacro } from './gdp-macro'
import { goodsMarketMultiplier } from './goods-market-multiplier'
import { okunPhillips } from './okun-phillips'
import { isLm } from './is-lm'
import { fiscalMonetaryPolicy } from './fiscal-monetary-policy'
import { unemploymentInflation } from './unemployment-inflation'
import { openEconomy } from './open-economy'

const map: Record<string, TopicContent> = {
  'budget-constraint': budgetConstraint,
  'intertemporal-budget-constraint': intertemporalBudgetConstraint,
  'opportunity-cost': opportunityCost,
  'ppf': ppf,
  'demand': demand,
  'consumer-surplus': consumerSurplus,
  'supply': supply,
  'rational-choice': rationalChoice,
  'elasticities': elasticities,
  'production-cost-short-run': productionCostShortRun,
  'production-function': productionFunction,
  'cost-long-run': costLongRun,
  'market-power': marketPower,
  'game-theory': gameTheory,
  'price-discrimination': priceDiscrimination,
  'externalities': externalities,
  'gdp-macro': gdpMacro,
  'goods-market-multiplier': goodsMarketMultiplier,
  'okun-phillips': okunPhillips,
  'is-lm': isLm,
  'fiscal-monetary-policy': fiscalMonetaryPolicy,
  'unemployment-inflation': unemploymentInflation,
  'open-economy': openEconomy,
}

export function getTopicContent(slug: string | undefined): TopicContent | undefined {
  if (slug == null) return undefined
  return map[slug]
}
