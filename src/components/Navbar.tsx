'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Home, BookOpen, ClipboardList, Sparkles } from 'lucide-react'
import { useDemo } from '@/lib/demoContext'

const ROLE_BADGE = {
  senior: {
    label: 'Eleanor V.',
    bg: '#FFE8D6',
    text: '#FF6B35',
    border: '#FF6B35',
    icon: <Home size={13} />,
  },
  student: {
    label: 'Maya R.',
    bg: '#D4F5F1',
    text: '#1A9E8F',
    border: '#1A9E8F',
    icon: <BookOpen size={13} />,
  },
  coordinator: {
    label: 'Ms. Holt',
    bg: '#EDE9FE',
    text: '#7C3AED',
    border: '#7C3AED',
    icon: <ClipboardList size={13} />,
  },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { role } = useDemo()
  const badge = ROLE_BADGE[role]

  return (
    <nav
      className="sticky top-0 z-40 border-b-2"
      style={{ background: '#FFF8F0', borderColor: '#3D2B1F' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 font-serif font-black text-xl" style={{ color: '#3D2B1F', letterSpacing: '-0.02em' }}>
          SeniorCircle
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#FF6B35', marginBottom: 2 }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/seniors" className="text-sm font-medium hover:text-orange transition-colors" style={{ color: '#A0644A' }}>
            For Seniors
          </Link>
          <Link href="/students" className="text-sm font-medium hover:text-orange transition-colors" style={{ color: '#A0644A' }}>
            For Students
          </Link>
          <Link href="/pathways" className="flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: '#F4A832' }}>
            <Sparkles size={13} />
            Pathways
          </Link>

          {/* Role badge replaces CTA */}
          <span
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold"
            style={{ background: badge.bg, color: badge.text, borderColor: badge.border }}
          >
            {badge.icon}
            {badge.label}
          </span>

          <Link
            href="/seniors/post-task"
            className="rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors hover:bg-orangeL"
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
