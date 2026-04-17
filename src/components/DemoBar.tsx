'use client'
import { Home, BookOpen, ClipboardList } from 'lucide-react'
import { useDemo, DemoRole } from '@/lib/demoContext'

const PERSONAS: { role: DemoRole; label: string; icon: React.ReactNode; hint: string }[] = [
  {
    role: 'senior',
    label: 'Senior',
    icon: <Home size={15} />,
    hint: 'Eleanor Voss · Pasadena, CA',
  },
  {
    role: 'student',
    label: 'Student',
    icon: <BookOpen size={15} />,
    hint: 'Maya Reyes · Arcadia High · Grade 11',
  },
  {
    role: 'coordinator',
    label: 'Coordinator',
    icon: <ClipboardList size={15} />,
    hint: 'Ms. Holt · Arcadia High School',
  },
]

const ACTIVE_STYLES: Record<DemoRole, string> = {
  senior: 'bg-[#FF6B35] text-white border-[#FF8C5A]',
  student: 'bg-[#1A9E8F] text-white border-[#4DC4B6]',
  coordinator: 'bg-[#7C3AED] text-white border-[#EDE9FE]',
}

export default function DemoBar() {
  const { role, setRole } = useDemo()

  return (
    <div
      className="sticky top-16 z-30 flex items-center justify-between px-6 border-b-2 py-[10px]"
      style={{ background: '#3D2B1F', borderColor: '#6B4226' }}
    >
      <span
        className="hidden text-[11px] font-bold tracking-widest uppercase sm:block"
        style={{ color: '#FFF8F0', opacity: 0.7 }}
      >
        Viewing as:
      </span>

      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        {PERSONAS.map(({ role: r, label, icon }) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`flex items-center gap-1.5 rounded-lg border-2 px-4 py-1.5 text-sm font-semibold transition-all ${
              role === r
                ? ACTIVE_STYLES[r]
                : 'border-[#6B4226] bg-[#6B4226] text-[#FFF8F0] opacity-70 hover:opacity-90'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <span
        className="hidden text-xs sm:block"
        style={{ color: '#FFF8F0', opacity: 0.8 }}
      >
        {PERSONAS.find((p) => p.role === role)?.hint}
      </span>
    </div>
  )
}
