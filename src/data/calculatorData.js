export const NICHES = [
  { id: 'ecommerce', label: 'E-commerce', avgCheck: 3000, growthBase: 30, conversionRate: 0.025 },
  { id: 'saas', label: 'SaaS', avgCheck: 8000, growthBase: 35, conversionRate: 0.015 },
  { id: 'media', label: 'Медиа', avgCheck: 1500, growthBase: 25, conversionRate: 0.02 },
  { id: 'education', label: 'Образование', avgCheck: 5000, growthBase: 28, conversionRate: 0.018 },
  { id: 'realestate', label: 'Недвижимость', avgCheck: 15000, growthBase: 20, conversionRate: 0.004 },
  { id: 'finance', label: 'Финансы', avgCheck: 10000, growthBase: 22, conversionRate: 0.01 },
  { id: 'health', label: 'Здоровье и медицина', avgCheck: 6000, growthBase: 26, conversionRate: 0.015 },
  { id: 'horeca', label: 'HoReCa', avgCheck: 2000, growthBase: 32, conversionRate: 0.03 },
  { id: 'fashion', label: 'Мода и красота', avgCheck: 2500, growthBase: 34, conversionRate: 0.022 },
  { id: 'construction', label: 'Строительство', avgCheck: 20000, growthBase: 18, conversionRate: 0.003 },
  { id: 'travel', label: 'Туризм', avgCheck: 4000, growthBase: 27, conversionRate: 0.015 },
  { id: 'no-niche', label: 'Нет моей ниши', avgCheck: 0, growthBase: 0, conversionRate: 0 },
]

export const SERVICES = [
  { id: 'branding', label: 'Брендинг', growthMod: 10, profitFactor: 1.8, price: 350000 },
  { id: 'webdesign', label: 'Веб-дизайн', growthMod: 8, profitFactor: 1.5, price: 220000 },
  { id: 'uiux', label: 'UI/UX', growthMod: 12, profitFactor: 1.6, price: 180000 },
  { id: 'marketing', label: 'Маркетинг', growthMod: 15, profitFactor: 2.2, price: 150000 },
  { id: 'smm', label: 'SMM', growthMod: 9, profitFactor: 1.3, price: 70000 },
  { id: 'identity', label: 'Айдентика', growthMod: 5, profitFactor: 1.2, price: 120000 },
  { id: 'packaging', label: 'Упаковка', growthMod: 6, profitFactor: 1.4, price: 90000 },
  { id: 'motion', label: 'Motion-дизайн', growthMod: 7, profitFactor: 1.1, price: 100000 },
  { id: 'print', label: 'Полиграфия', growthMod: 3, profitFactor: 0.9, price: 60000 },
]

export const TRAFFIC_SOURCES = [
  { id: 'instagram', label: 'Instagram', multiplier: 0.9 },
  { id: 'telegram', label: 'Telegram', multiplier: 1.0 },
  { id: 'context_ads', label: 'Контекстная реклама', multiplier: 1.3 },
  { id: 'seo', label: 'SEO', multiplier: 1.4 },
  { id: 'offline', label: 'Офлайн', multiplier: 1.1 },
  { id: 'referral', label: 'Сарафанное радио', multiplier: 1.5 },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

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

  const effectiveConversionRate = niche.conversionRate * traffic.multiplier
  const customers = aud * effectiveConversionRate
  const dealValue = niche.avgCheck * service.profitFactor
  const profit = Math.round(customers * dealValue * (growth / 100))

  const monthlyProfit = Math.max(profit / 12, 1)
  const payback = clamp(service.price / monthlyProfit, 1, 36)

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