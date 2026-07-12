import React, { useEffect, useRef, useState } from 'react'
import './RJSelect.css'

const RJSelect = ({ id, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false)
  const [openAbove, setOpenAbove] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const rootRef = useRef(null)
  const listRef = useRef(null)

  const selectedIndex = options.findIndex((option) => option.id === value)
  const selected = options[selectedIndex]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open) {
      setHighlighted(selectedIndex >= 0 ? selectedIndex : 0)
    }
  }, [open])

  useEffect(() => {
    if (open && highlighted >= 0 && listRef.current) {
      const item = listRef.current.children[highlighted]
      if (item) item.scrollIntoView({ block: 'nearest' })
    }
  }, [highlighted, open])

  const toggleOpen = () => {
    if (!open && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const estimatedListHeight = Math.min(240, options.length * 40 + 8) + 6
      setOpenAbove(spaceBelow < estimatedListHeight && rect.top > estimatedListHeight)
    }
    setOpen((prev) => !prev)
  }

  const selectOption = (option) => {
    onChange(option.id)
    setOpen(false)
  }

  const handleKeyDown = (e) => {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        toggleOpen()
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (highlighted >= 0) selectOption(options[highlighted])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div
      className={`rj-select${open ? ' open' : ''}${selected ? ' filled' : ''}`}
      ref={rootRef}
      tabIndex={0}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={`${id}-listbox`}
      aria-labelledby={`${id}-label`}
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
    >
      <span className="rj-select-value">{selected ? selected.label : placeholder}</span>
      <svg
        className="rj-select-arrow"
        viewBox="0 0 12 12"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 4l4 4 4-4"></path>
      </svg>
      {open && (
        <ul
          className={`rj-select-list${openAbove ? ' above' : ''}`}
          role="listbox"
          id={`${id}-listbox`}
          ref={listRef}
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={option.id === value}
              className={`rj-select-option${index === highlighted ? ' highlighted' : ''}${option.id === value ? ' selected' : ''}`}
              onMouseEnter={() => setHighlighted(index)}
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
              }}
            >
              <span>{option.label}</span>
              {option.id === value && <span className="rj-select-option-marker"></span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RJSelect