'use client'
import { useDemo } from '@/lib/demoContext'

export default function StudentProfilePage() {
  const { role } = useDemo()

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {role === 'coordinator' && (
        <div className="mb-6 rounded-xl border-2 px-5 py-3 flex items-center justify-between flex-wrap gap-3" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
          <p className="text-sm" style={{ color: '#6B4226' }}>
            You&apos;re viewing this as Maya&apos;s coordinator. You can nominate her for Pathways or assign her to a task.
          </p>
          <div className="flex gap-2">
            <button disabled className="rounded-lg border-2 px-3 py-1 text-xs font-semibold opacity-40 cursor-not-allowed" style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}>
              Nominate for Pathways
            </button>
            <button disabled className="rounded-lg border-2 px-3 py-1 text-xs font-semibold opacity-40 cursor-not-allowed" style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}>
              Assign to task
            </button>
          </div>
        </div>
      )}
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#A0644A' }}>Student profile</p>
      <h1 className="font-serif text-4xl font-black mt-2" style={{ color: '#3D2B1F' }}>Maya Reyes</h1>
      <p className="mt-2" style={{ color: '#6B4226' }}>Arcadia High School · Grade 11</p>
      <p className="mt-4" style={{ color: '#6B4226' }}>Full profile — built in Prompt 5.</p>
    </div>
  )
}
