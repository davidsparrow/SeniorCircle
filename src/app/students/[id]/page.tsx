'use client'
import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { ShieldCheck, CheckCircle, XCircle } from 'lucide-react'
import PageShell from '@/components/PageShell'
import CategoryIcon from '@/components/CategoryIcon'
import { mockTasks, mockStudents, mockSeniors } from '@/lib/mockData'

const CATEGORY_COLORS: Record<string, string> = {
  'Memoir Project': '#D4F5F1', 'Companionship': '#D4F5F1', 'Reading Aloud': '#D4F5F1',
  'Yardwork': '#FFE8D6', 'Cooking': '#FFE8D6', 'Pet Care': '#FFE8D6',
  'Organizing': '#FDD07A', 'Errands': '#FDD07A',
  'Tech Help': '#EDE9FE', 'Arts & Crafts': '#EDE9FE',
}
const CATEGORY_TEXT: Record<string, string> = {
  'Memoir Project': '#1A9E8F', 'Companionship': '#1A9E8F', 'Reading Aloud': '#1A9E8F',
  'Yardwork': '#FF6B35', 'Cooking': '#FF6B35', 'Pet Care': '#FF6B35',
  'Organizing': '#6B4226', 'Errands': '#6B4226',
  'Tech Help': '#7C3AED', 'Arts & Crafts': '#7C3AED',
}
const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  open:      { bg: '#FFE8D6', text: '#FF6B35' },
  matched:   { bg: '#C6F6D5', text: '#38A169' },
  completed: { bg: '#EDF2F7', text: '#4A5568' },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('')
}

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [note, setNote] = useState('')
  const [applied, setApplied] = useState(false)

  const task = mockTasks.find((t) => t.id === id)
  const maya = mockStudents[0]

  if (!task) {
    return (
      <PageShell>
        <p className="section-heading text-2xl">Task not found</p>
        <Link href="/students" className="mt-4 inline-block text-sm" style={{ color: '#FF6B35' }}>← Back to tasks</Link>
      </PageShell>
    )
  }

  const senior = mockSeniors.find((s) => s.id === task.seniorId)
  const matchingSkills = task.skillTags.filter((s) => maya.skills.includes(s))
  const missingSkills = task.skillTags.filter((s) => !maya.skills.includes(s))
  const statusStyle = STATUS_STYLES[task.status] ?? STATUS_STYLES.open
  const newTotal = maya.hoursCompleted + task.duration

  return (
    <PageShell>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── LEFT ── */}
        <div className="lg:col-span-3">
          <Link href="/students" className="inline-flex items-center gap-1 text-sm font-semibold mb-6" style={{ color: '#FF6B35' }}>
            ← Back to tasks
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              style={{
                background: CATEGORY_COLORS[task.category] ?? '#FFE8D6',
                color: CATEGORY_TEXT[task.category] ?? '#FF6B35',
                borderColor: CATEGORY_TEXT[task.category] ?? '#FF6B35',
              }}
            >
              <CategoryIcon category={task.category} />
              {task.category}
            </span>
            <span
              className="rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              style={{ background: statusStyle.bg, color: statusStyle.text, borderColor: statusStyle.text }}
            >
              {task.status}
            </span>
          </div>

          <h1 className="display-heading text-4xl">{task.title}</h1>

          {/* Senior info */}
          <div className="flex items-center gap-3 mt-5">
            <div
              className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: '#FFE8D6', borderColor: '#3D2B1F', color: '#FF6B35' }}
            >
              {initials(task.seniorName)}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={13} style={{ color: '#38A169' }} />
                <p className="font-semibold text-sm" style={{ color: '#3D2B1F' }}>{task.seniorName}</p>
              </div>
              <p className="text-xs" style={{ color: '#A0644A' }}>{task.location} · Joined {senior?.joinedDate ? new Date(senior.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}</p>
            </div>
          </div>

          {/* About task */}
          <div className="mt-8">
            <h2 className="section-heading text-xl mb-3">About this task</h2>
            <p className="text-base leading-relaxed" style={{ color: '#3D2B1F' }}>{task.description}</p>
          </div>

          {/* Details */}
          <div className="mt-8 rounded-xl border-2 p-5" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
            <h2 className="section-heading text-lg mb-4">Details</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="label-caps">Date</p><p style={{ color: '#3D2B1F' }}>{formatDate(task.date)}</p></div>
              <div><p className="label-caps">Duration</p><p style={{ color: '#3D2B1F' }}>{task.duration} hour{task.duration !== 1 ? 's' : ''}</p></div>
              <div><p className="label-caps">Category</p><p style={{ color: '#3D2B1F' }}>{task.category}</p></div>
              <div>
                <p className="label-caps mb-1">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {task.skillTags.map((s) => (
                    <span key={s} className="rounded-full border px-2 py-0.5 text-xs" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* About the senior */}
          {senior && (
            <div className="mt-6">
              <h2 className="section-heading text-lg mb-2">About {task.seniorName.split(' ')[0]}</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6B4226' }}>{senior.bio}</p>
              <p className="text-xs mt-1" style={{ color: '#A0644A' }}>{senior.location}</p>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border-2 p-6" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
            {applied ? (
              <div className="text-center py-4 rounded-xl" style={{ background: '#1A9E8F' }}>
                <CheckCircle size={32} style={{ color: 'white' }} className="mx-auto mb-3" />
                <h3 className="font-serif font-bold text-lg" style={{ color: 'white' }}>Application sent!</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: '#D4F5F1' }}>
                  Your coordinator will be notified. {task.seniorName.split(' ')[0]} will review and confirm.
                </p>
                <Link href="/students" className="inline-block mt-4 text-xs font-semibold" style={{ color: 'white' }}>
                  Browse more tasks →
                </Link>
              </div>
            ) : (
              <>
                <h2 className="section-heading text-xl mb-4">Apply for this task</h2>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  className="w-full border-2 rounded-lg px-4 py-3 text-sm resize-none"
                  style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
                  placeholder={`Tell ${task.seniorName.split(' ')[0]} a little about yourself and why you're a good fit.`}
                />

                {/* Skill match */}
                <div className="mt-4">
                  <p className="label-caps mb-2">Your skill match</p>
                  <div className="flex flex-col gap-1.5">
                    {matchingSkills.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <CheckCircle size={13} style={{ color: '#38A169' }} />
                        <span style={{ color: '#3D2B1F' }}>{s}</span>
                      </div>
                    ))}
                    {missingSkills.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <XCircle size={13} style={{ color: '#A0644A' }} />
                        <span style={{ color: '#A0644A' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hours preview */}
                <div className="mt-4 rounded-lg p-3" style={{ background: '#D4F5F1' }}>
                  <p className="text-xs font-semibold" style={{ color: '#1A9E8F' }}>
                    This task earns {task.duration}h · Your total: {maya.hoursCompleted} → {newTotal} hours
                  </p>
                  <div className="mt-2 rounded-full overflow-hidden" style={{ background: '#FFF8F0', height: 6 }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${(newTotal / maya.hoursGoal) * 100}%`, background: '#1A9E8F' }} />
                  </div>
                </div>

                <button
                  onClick={() => setApplied(true)}
                  className="mt-4 w-full rounded-lg border-2 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                  style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
                >
                  Apply for this task →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
