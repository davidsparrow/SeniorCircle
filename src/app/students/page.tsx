'use client'
import { useDemo } from '@/lib/demoContext'

export default function StudentsPage() {
  const { role } = useDemo()

  if (role === 'student') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#1A9E8F' }}>Your dashboard</p>
        <h1 className="font-serif text-4xl font-black mt-2" style={{ color: '#3D2B1F' }}>
          Hey Maya, here&apos;s what&apos;s open near you.
        </h1>
        <div className="mt-4 p-4 rounded-xl border-2" style={{ background: '#D4F5F1', borderColor: '#1A9E8F' }}>
          <p className="text-sm font-semibold" style={{ color: '#1A9E8F' }}>18 / 40 hours complete</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#A0644A' }}>For students</p>
      <h1 className="font-serif text-4xl font-black mt-2" style={{ color: '#3D2B1F' }}>
        Find tasks near you. Build your record.
      </h1>
      <p className="mt-4" style={{ color: '#6B4226' }}>Browse open tasks and earn verified community service hours.</p>
    </div>
  )
}
