"use client";

import { useRef, useEffect } from 'react'

interface MouseState {
  x: number
  y: number
  targetX: number
  targetY: number
  isHoveringClickable: boolean
  isPressed: boolean
}

export function useMouseRef() {
  const mouseRef = useRef<MouseState>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    isHoveringClickable: false,
    isPressed: false,
  })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
      mouseRef.current.isHoveringClickable = !!target.closest(
        'a, button, [role="button"], input, textarea, .clickable'
      )
    }
    const handleDown = () => (mouseRef.current.isPressed = true)
    const handleUp = () => (mouseRef.current.isPressed = false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    let raf: number
    const smooth = () => {
      const m = mouseRef.current
      m.x += (m.targetX - m.x) * 0.08
      m.y += (m.targetY - m.y) * 0.08
      raf = requestAnimationFrame(smooth)
    }
    raf = requestAnimationFrame(smooth)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return mouseRef
}
