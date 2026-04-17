'use client'
import { useDemo } from '@/lib/demoContext'

export default function SeniorsPage() {
  const { role } = useDemo()

  if (role === 'senior') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#A0644A' }}>Your dashboard</p>
        <h1 className="font-serif text-4xl font-black mt-2" style={{ color: '#3D2B1F' }}>
          Welcome back, Eleanor.
        </h1>
        <p className="mt-4" style={{ color: '#6B4226' }}>Your posted tasks and match statuses will appear here.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#A0644A' }}>For seniors</p>
      <h1 className="font-serif text-4xl font-black mt-2" style={{ color: '#3D2B1F' }}>
        Welcome. Let&apos;s find you some help.
      </h1>
      <p className="mt-4" style={{ color: '#6B4226' }}>Sign up to post tasks and get matched with local students.</p>
    </div>
  )
}
