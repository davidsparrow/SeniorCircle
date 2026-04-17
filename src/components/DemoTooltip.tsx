'use client'
import { useEffect, useState } from 'react'

export default function DemoTooltip() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('sc_demo_tooltip_seen')
    if (!seen) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        localStorage.setItem('sc_demo_tooltip_seen', '1')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    setVisible(false)
    localStorage.setItem('sc_demo_tooltip_seen', '1')
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-xl p-4 shadow-lg"
      style={{ background: '#3D2B1F', color: '#FFF8F0', maxWidth: 380, width: 'calc(100vw - 32px)' }}
    >
      <p className="text-sm leading-relaxed">
        👋 This is a live demo. Use the bar below to switch between a Senior, a Student, and a School Coordinator.
      </p>
      <div className="mt-3 flex justify-end">
        <button
          onClick={dismiss}
          className="rounded-lg border-2 border-[#FF6B35] px-3 py-1 text-xs font-semibold text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-colors"
        >
          Got it →
        </button>
      </div>
      {/* notch pointing down toward DemoBar */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid #3D2B1F',
        }}
      />
    </div>
  )
}
