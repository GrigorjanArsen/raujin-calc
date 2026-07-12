export const NICHES = [
  { id: 'ecommerce', label: 'E-commerce', avgCheck: 4000, growthBase: 30, conversionRate: 0.025 },
  { id: 'saas', label: 'SaaS', avgCheck: 5000, growthBase: 35, conversionRate: 0.015 },
  { id: 'media', label: 'Медиа', avgCheck: 3000, growthBase: 25, conversionRate: 0.02 },
  { id: 'education', label: 'Образование', avgCheck: 20000, growthBase: 28, conversionRate: 0.018 },
  { id: 'realestate', label: 'Недвижимость', avgCheck: 80000, growthBase: 20, conversionRate: 0.004 },
  { id: 'finance', label: 'Финансы', avgCheck: 15000, growthBase: 22, conversionRate: 0.01 },
  { id: 'health', label: 'Здоровье и медицина', avgCheck: 8000, growthBase: 26, conversionRate: 0.015 },
  { id: 'horeca', label: 'HoReCa', avgCheck: 1500, growthBase: 32, conversionRate: 0.03 },
  { id: 'fashion', label: 'Мода и красота', avgCheck: 3000, growthBase: 34, conversionRate: 0.022 },
  { id: 'construction', label: 'Строительство', avgCheck: 150000, growthBase: 18, conversionRate: 0.003 },
  { id: 'travel', label: 'Туризм', avgCheck: 50000, growthBase: 27, conversionRate: 0.015 },
  { id: 'no-niche', label: 'Нет моей ниши', avgCheck: 0, growthBase: 0, conversionRate: 0 },
]

export const SERVICES = [
  { id: 'branding', label: 'Брендинг', growthMod: 10, priceMin: 15000, priceAvg: 21200, priceMax: 30000 },
  { id: 'webdesign', label: 'Веб-дизайн', growthMod: 8, priceMin: 18000, priceAvg: 25500, priceMax: 36000 },
  { id: 'uiux', label: 'UI/UX', growthMod: 12, priceMin: 22000, priceAvg: 31000, priceMax: 45000 },
  { id: 'marketing', label: 'Маркетинг', growthMod: 15, priceMin: 12000, priceAvg: 17000, priceMax: 25000 },
  { id: 'smm', label: 'SMM', growthMod: 9, priceMin: 8000, priceAvg: 12000, priceMax: 18000 },
  { id: 'identity', label: 'Айдентика', growthMod: 5, priceMin: 6000, priceAvg: 9500, priceMax: 15000 },
  { id: 'packaging', label: 'Упаковка', growthMod: 6, priceMin: 2000, priceAvg: 2800, priceMax: 4000 },
  { id: 'motion', label: 'Motion-дизайн', growthMod: 7, priceMin: 9000, priceAvg: 13500, priceMax: 20000 },
  { id: 'print', label: 'Полиграфия', growthMod: 3, priceMin: 1500, priceAvg: 1900, priceMax: 2500 },
]

export const TRAFFIC_SOURCES = [
  { id: 'instagram', label: 'Instagram', multiplier: 0.9 },
  { id: 'telegram', label: 'Telegram', multiplier: 1.0 },
  { id: 'context_ads', label: 'Контекстная реклама', multiplier: 1.3 },
  { id: 'seo', label: 'SEO', multiplier: 1.4 },
  { id: 'offline', label: 'Офлайн', multiplier: 1.1 },
  { id: 'referral', label: 'Сарафанное радио', multiplier: 1.5 },
]

const AUDIENCE_CAP = 300000

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function getServicePrice(service, audience) {
  if (audience < 5000) return service.priceMin
  if (audience < 50000) return service.priceAvg
  return service.priceMax
}

export function calculateResults(nicheId, serviceId, audience, trafficId) {
  const niche = NICHES.find((n) => n.id === nicheId)
  const service = SERVICES.find((s) => s.id === serviceId)
  const traffic = TRAFFIC_SOURCES.find((t) => t.id === trafficId)
  const aud = Number(audience)

  if (!niche || !service || !traffic || !Number.isFinite(aud) || aud < 100 || aud > 10000000) {
    return null
  }

  const growthAudienceBonus = Math.round(15 * (aud / (aud + 20000)))
  const growth = clamp(niche.growthBase + service.growthMod + growthAudienceBonus, 15, 65)

  const effectiveAudience = (aud * AUDIENCE_CAP) / (aud + AUDIENCE_CAP)
  const effectiveConversionRate = niche.conversionRate * traffic.multiplier
  const customers = effectiveAudience * effectiveConversionRate
  const profit = Math.round(customers * niche.avgCheck * (growth / 100))

  const price = getServicePrice(service, aud)
  const monthlyProfit = Math.max(profit / 12, 1)
  const payback = clamp(price / monthlyProfit, 1, 36)

  const description =
    `«${service.label}» для ниши «${niche.label}» при трафике из канала «${traffic.label}» ` +
    `даёт расчётный прирост в ${growth}% за счёт увеличения конверсии и среднего чека. ` +
    `При вашем объёме аудитории (${new Intl.NumberFormat('ru-RU').format(aud)} чел.) ` +
    `это ориентировочно ${new Intl.NumberFormat('ru-RU').format(Math.round(customers))} новых клиентов ` +
    `и окупаемость услуги за ${payback.toFixed(1)} мес.`

  return {
    growth,
    profit,
    payback: payback.toFixed(1),
    customers: Math.round(customers),
    description,
  }
}