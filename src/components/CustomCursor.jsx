import React, { useEffect, useRef } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const handRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const frameRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const handleMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
      if (handRef.current) {
        handRef.current.style.left = `${e.clientX}px`
        handRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleOver = (e) => {
      const interactive = e.target.closest(
        'a, button, [role="button"], [role="combobox"], [role="option"], input, textarea'
      )
      if (ringRef.current) ringRef.current.classList.toggle('cur-ring-active', Boolean(interactive))
      if (handRef.current) handRef.current.classList.toggle('cur-hand-active', Boolean(interactive))
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top = `${ring.current.y}px`
      }
      frameRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <>
      <div id="cur" ref={dotRef}></div>
      <div id="cur-ring" ref={ringRef}></div>
      <div id="cur-hand" ref={handRef}>
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M11.4 15.6 V5.4 c0-1.22 .99-2.2 2.2-2.2 1.22 0 2.2 .98 2.2 2.2 V13.5 c.42-.5 1.05-.82 1.75-.82 1.02 0 1.88 .7 2.12 1.64 c.42-.42 .99-.68 1.63-.68 1.13 0 2.05 .82 2.14 1.9 c.4-.32 .9-.52 1.45-.52 1.22 0 2.2 .99 2.2 2.2 v4.05 c0 3.62-2.94 6.56-6.56 6.56 h-1.86 c-1.72 0-3.37-.7-4.56-1.95 l-4.86-5.1 c-.8-.84-.77-2.16 .06-2.96 .82-.78 2.11-.76 2.9 .05 l1.65 1.7 z"
            strokeWidth="0.85"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15.8 15.2 v3.4 M19.7 15.6 v3.2 M23.5 16.6 v2.6"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity=".45"
          ></path>
        </svg>
      </div>
    </>
  )
}

export default CustomCursor