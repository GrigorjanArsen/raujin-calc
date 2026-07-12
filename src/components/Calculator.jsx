import React, { useState } from 'react'
import { NICHES, SERVICES, TRAFFIC_SOURCES, calculateResults } from '../data/calculatorData.js'
import './Calculator.css'
import CustomSelect from './CustomSelect.jsx'

const Calculator = () => {
  const [formData, setFormData] = useState({
    niche: '',
    service: '',
    audience: '',
    traffic: '',
  })

  const [error, setError] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const isNoNiche = formData.niche === 'no-niche'

  const handleChange = (e) => {
    const { name, value } = e.target
    const input = e.target
    if (name === 'audience' && value) {
      const num = Number(value)
      if (num < 100) {
        input.setCustomValidity('Минимальное значение — 100')
      } else if (num > 10000000) {
        input.setCustomValidity('Максимальное значение — 10 000 000')
      } else {
        input.setCustomValidity('')
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    })
    if (results) setResults(null)
    if (error) setError('')
  }

  const handleSpinUp = () => {
    const input = document.querySelector('input[name="audience"]')
    if (input) {
      const val = Number(input.value) || 0
      const max = Number(input.max) || 10000000
      const newVal = Math.min(val + 1, max)
      input.value = newVal
      const event = new Event('input', { bubbles: true })
      input.dispatchEvent(event)
    }
  }

  const handleSpinDown = () => {
    const input = document.querySelector('input[name="audience"]')
    if (input) {
      const val = Number(input.value) || 0
      const min = Number(input.min) || 100
      const newVal = Math.max(val - 1, min)
      input.value = newVal
      const event = new Event('input', { bubbles: true })
      input.dispatchEvent(event)
    }
  }

  const buildLeadUrl = () => {
    const nicheLabel = NICHES.find((n) => n.id === formData.niche)?.label || ''
    const serviceLabel = SERVICES.find((s) => s.id === formData.service)?.label || ''
    const trafficLabel = TRAFFIC_SOURCES.find((t) => t.id === formData.traffic)?.label || ''

    const params = new URLSearchParams({
      niche: nicheLabel,
      service: serviceLabel,
      audience: formData.audience,
      traffic: trafficLabel,
      growth: results ? results.growth : '',
      profit: results ? results.profit : '',
      payback: results ? results.payback : '',
    })

    return `https://raujin.homoplanetae.ru/contact.html?${params.toString()}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isNoNiche) {
      window.location.href = 'https://raujin.homoplanetae.ru/contact.html'
      return
    }

    const audienceNum = Number(formData.audience)
    if (!Number.isFinite(audienceNum) || audienceNum < 100 || audienceNum > 10000000) {
      setError('Введите объём аудитории от 100 до 10 000 000 человек')
      return
    }

    const calculated = calculateResults(formData.niche, formData.service, formData.audience, formData.traffic)
    if (!calculated) {
      setError('Не удалось рассчитать для выбранной комбинации. Проверьте, что все поля заполнены корректно.')
      return
    }
    setError('')

    setLoading(true)
    setTimeout(() => {
      setResults(calculated)
      setLoading(false)
    }, 600)
  }

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h1>
          Калькулятор <span className="gold">дизайна</span>
        </h1>
        <div className="divider"></div>
        <p className="subtitle">Рассчитайте потенциал роста вашего бизнеса</p>
      </div>

      <form onSubmit={handleSubmit} className="calculator-form">
        {/* НИША — лейбл внутри CustomSelect, поэтому <label> не нужен */}
        <CustomSelect
          options={NICHES}
          value={formData.niche}
          onChange={handleChange}
          placeholder="Выберите нишу"
          label="НИША"
          name="niche"
          required
        />

        {isNoNiche ? (
          <div className="no-niche-message">
            <p className="no-niche-text">
              Не нашли свою нишу? Напишите нам — мы сделаем индивидуальный расчёт!
            </p>
          </div>
        ) : (
          <>
            <CustomSelect
              options={SERVICES}
              value={formData.service}
              onChange={handleChange}
              placeholder="Выберите услугу"
              label="УСЛУГА"
              name="service"
              required
            />

            <CustomSelect
              options={TRAFFIC_SOURCES}
              value={formData.traffic}
              onChange={handleChange}
              placeholder="Выберите источник"
              label="ОТКУДА ТРАФИК"
              name="traffic"
              required
            />

            <div className="form-group">
              <label className="numbers">ОБЪЁМ АУДИТОРИИ</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()}
                  onKeyDown={(e) => {
                    if (['e', 'E', '+', '-'].includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                  placeholder="Например: 10000"
                  required
                  min="100"
                  max="10000000"
                />
                <div className="spin-buttons">
                  <button type="button" className="spin-btn" onClick={handleSpinUp}>
                    ▲
                  </button>
                  <button type="button" className="spin-btn" onClick={handleSpinDown}>
                    ▼
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="calculate-btn" disabled={loading}>
          {loading ? 'РАССЧИТЫВАЕМ...' : isNoNiche ? 'НАПИСАТЬ' : 'РАССЧИТАТЬ'}
        </button>
      </form>

      {results && (
        <div className="results-container results-enter" role="status" aria-live="polite">
          <div className="divider"></div>
          <div className="results-grid">
            <div className="result-item">
              <span className="label numbers">ПОТЕНЦИАЛ РОСТА</span>
              <span className="value gold">+{results.growth}%</span>
            </div>
            <div className="result-item">
              <span className="label numbers">ПРИБЫЛЬ</span>
              <span className="value gold">
                {new Intl.NumberFormat('ru-RU').format(results.profit)} ₽
              </span>
            </div>
            <div className="result-item">
              <span className="label numbers">ОКУПАЕМОСТЬ</span>
              <span className="value gold">{results.payback} мес.</span>
            </div>
          </div>

          <div className="explanation-block">
            <span className="label numbers explanation-title">ПОЧЕМУ ИМЕННО ТАК</span>
            <p className="explanation-text">{results.description}</p>
          </div>

          <a className="lead-btn" href={buildLeadUrl()}>
            ОСТАВИТЬ ЗАЯВКУ С ЭТИМ РАСЧЁТОМ
          </a>

          <p className="disclaimer">
            Расчёт ориентировочный, основан на средних показателях по нише, не является гарантией дохода.
          </p>
        </div>
      )}
    </div>
  )
}

export default Calculator