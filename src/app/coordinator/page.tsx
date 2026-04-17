'use client'
import { useDemo } from '@/lib/demoContext'

export default function CoordinatorPage() {
  const { role, setRole } = useDemo()

  if (role === 'coordinator') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#7C3AED' }}>Arcadia High School · Coordinator Dashboard</p>
        <h1 className="font-serif text-4xl font-black mt-2" style={{ color: '#3D2B1F' }}>
          Good morning, Ms. Holt.
        </h1>
        <p className="mt-4" style={{ color: '#6B4226' }}>Full coordinator dashboard — built in Prompt 4.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="rounded-2xl border-2 p-10" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
        <h2 className="font-serif text-2xl font-bold" style={{ color: '#3D2B1F' }}>
          This dashboard is for school coordinators.
        </h2>
        <p className="mt-3 text-sm" style={{ color: '#6B4226' }}>
          Switch to Coordinator view to explore it.
        </p>
        <button
          onClick={() => setRole('coordinator')}
          className="mt-6 rounded-lg border-2 px-6 py-2.5 text-sm font-semibold transition-colors"
          style={{ background: '#7C3AED', color: 'white', borderColor: '#3D2B1F' }}
        >
          Switch to Coordinator view
        </button>
      </div>
    </div>
  )
}
