import React, { useState, useRef, useEffect } from 'react'
import './CustomSelect.css'

const CustomSelect = ({ options, value, onChange, placeholder, label, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const wrapperRef = useRef(null)

  useEffect(() => {
    const selected = options?.find(opt => opt.id === value)
    setSelectedLabel(selected ? selected.label : '')
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionId) => {
    onChange({ target: { name, value: optionId } })
    setIsOpen(false)
  }

  return (
    <div className="custom-select-wrapper" ref={wrapperRef}>
      {label && <label className="custom-select-label">{label}</label>}
      <div 
        className={`custom-select ${selectedLabel ? 'has-value' : ''} ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select-trigger">
          {selectedLabel || placeholder || 'Выберите...'}
        </span>
        <svg 
          className={`custom-select-arrow ${isOpen ? 'open' : ''}`} 
          viewBox="0 0 12 12" 
          fill="none" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M2 4l4 4 4-4"></path>
        </svg>
      </div>

      {isOpen && (
        <div className="custom-select-dropdown">
          {options?.map((option) => (
            <div
              key={option.id}
              className={`custom-select-option ${option.id === value ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                handleSelect(option.id)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect