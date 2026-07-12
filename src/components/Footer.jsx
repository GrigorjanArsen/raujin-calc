import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="divider"></div>
      <div className="footer-content">
        <p className="footer-text">
          Создано в рамках практики · Тюменский индустриальный университет
        </p>
        <p className="footer-text">
          Дизайнер Арсен Григорян · 3 курс
        </p>
        <p className="footer-year numbers">{new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer