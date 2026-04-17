'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Home, BookOpen, ClipboardList, Sparkles } from 'lucide-react'
import { useDemo, DemoRole } from '@/lib/demoContext'

const ROLES: { role: DemoRole; label: string; fullName: string; icon: React.ReactNode; bg: string; text: string; border: string }[] = [
  {
    role: 'senior',
    label: 'Senior',
    fullName: 'Eleanor V.',
    icon: <Home size={14} />,
    bg: '#FF6B35',
    text: '#ffffff',
    border: '#3D2B1F',
  },
  {
    role: 'student',
    label: 'Student',
    fullName: 'Maya R.',
    icon: <BookOpen size={14} />,
    bg: '#1A9E8F',
    text: '#ffffff',
    border: '#3D2B1F',
  },
  {
    role: 'coordinator',
    label: 'Coordinator',
    fullName: 'Ms. Holt',
    icon: <ClipboardList size={14} />,
    bg: '#7C3AED',
    text: '#ffffff',
    border: '#3D2B1F',
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { role, setRole } = useDemo()

  return (
    <nav
      className="sticky top-0 z-40 border-b-2"
      style={{ background: '#FFF8F0', borderColor: '#3D2B1F' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 font-serif font-black text-xl flex-shrink-0" style={{ color: '#3D2B1F', letterSpacing: '-0.02em' }}>
          SeniorCircle
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#FF6B35', marginBottom: 2 }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 flex-1 justify-end">
          <Link href="/seniors" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#A0644A' }}>
            For Seniors
          </Link>
          <Link href="/students" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#A0644A' }}>
            For Students
          </Link>
          <Link href="/pathways" className="flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-70" style={{ color: '#F4A832' }}>
            <Sparkles size={13} />
            Pathways
          </Link>

          {/* Divider */}
          <div className="w-px h-5 self-center" style={{ background: '#D4C4BB' }} />

          {/* Role switcher pills */}
          <div className="flex items-center gap-1.5">
            {ROLES.map(({ role: r, label, fullName, icon, bg, text, border }) => {
              const active = role === r
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-semibold transition-all"
                  style={
                    active
                      ? { background: bg, color: text, borderColor: border }
                      : { background: '#FFF3E4', color: '#A0644A', borderColor: '#D4C4BB' }
                  }
                  title={active ? `Viewing as ${fullName}` : `Switch to ${label}`}
                >
                  {icon}
                  <span>{active ? fullName : label}</span>
                </button>
              )
            })}
          </div>

          <Link
            href="/seniors/post-task"
            className="flex-shrink-0 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90"
            style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
          >
            Post a Task
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-2 px-4 py-4 flex flex-col gap-3" style={{ borderColor: '#3D2B1F', background: '#FFF8F0' }}>
          <Link href="/seniors" className="text-sm font-medium py-2" style={{ color: '#3D2B1F' }} onClick={() => setOpen(false)}>For Seniors</Link>
          <Link href="/students" className="text-sm font-medium py-2" style={{ color: '#3D2B1F' }} onClick={() => setOpen(false)}>For Students</Link>
          <Link href="/pathways" className="flex items-center gap-1 text-sm font-semibold py-2" style={{ color: '#F4A832' }} onClick={() => setOpen(false)}>
            <Sparkles size={13} /> Pathways
          </Link>

          {/* Mobile role switcher */}
          <div className="flex gap-2 pt-1">
            {ROLES.map(({ role: r, label, fullName, icon, bg, text, border }) => {
              const active = role === r
              return (
                <button
                  key={r}
                  onClick={() => { setRole(r); setOpen(false) }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-2 text-xs font-semibold transition-all"
                  style={
                    active
                      ? { background: bg, color: text, borderColor: border }
                      : { background: '#FFF3E4', color: '#A0644A', borderColor: '#D4C4BB' }
                  }
                >
                  {icon}
                  <span>{active ? fullName : label}</span>
                </button>
              )
            })}
          </div>

          <Link
            href="/seniors/post-task"
            className="rounded-lg border-2 px-4 py-2 text-sm font-semibold text-center mt-1"
            style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
            onClick={() => setOpen(false)}
          >
            Post a Task
          </Link>
        </div>
      )}
    </nav>
  )
}
