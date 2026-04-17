'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ShieldCheck, X } from 'lucide-react'
import PageShell from '@/components/PageShell'
import CategoryIcon from '@/components/CategoryIcon'
import { useDemo } from '@/lib/demoContext'
import { mockTasks, mockStudents, CATEGORIES } from '@/lib/mockData'

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

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function isNew(dateStr: string) {
  const diff = (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  return diff <= 7 && diff >= 0
}

export default function StudentsPage() {
  const { role } = useDemo()
  const maya = mockStudents[0]
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [durationFilter, setDurationFilter] = useState('Any')
  const [showPathways, setShowPathways] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [code, setCode] = useState('')

  const openTasks = mockTasks.filter((t) => t.status === 'open')

  const filtered = openTasks.filter((t) => {
    if (activeCategory !== 'All' && t.category !== activeCategory) return false
    if (durationFilter === 'Under 1 hr' && t.duration >= 1) return false
    if (durationFilter === '1–2 hrs' && (t.duration < 1 || t.duration > 2)) return false
    if (durationFilter === '3+ hrs' && t.duration < 3) return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <section style={{ background: '#FFF8F0', borderBottom: '2px solid #3D2B1F' }}>
        <PageShell>
          <p className="label-caps">For students</p>
          <h1 className="display-heading text-4xl mt-2">
            {role === 'student' ? `Hey ${maya.name.split(' ')[0]}, here's what's open near you.` : 'Find tasks near you. Build your record.'}
          </h1>
          <p className="mt-3 text-base" style={{ color: '#6B4226' }}>
            Browse open tasks posted by seniors in your area. Every completed task earns verified community service hours.
          </p>

          {/* Maya's hours bar */}
          {role === 'student' && (
            <div className="mt-5 rounded-xl border-2 p-4 max-w-sm" style={{ background: '#D4F5F1', borderColor: '#1A9E8F' }}>
              <p className="text-xs font-bold" style={{ color: '#1A9E8F' }}>Your progress this semester</p>
              <div className="mt-2 rounded-full overflow-hidden border" style={{ background: '#FFF8F0', height: 10, borderColor: '#1A9E8F' }}>
                <div className="h-full rounded-full" style={{ width: `${(maya.hoursCompleted / maya.hoursGoal) * 100}%`, background: '#1A9E8F' }} />
              </div>
              <p className="text-xs mt-1 font-semibold" style={{ color: '#1A9E8F' }}>{maya.hoursCompleted} / {maya.hoursGoal} hours</p>
            </div>
          )}

          {/* Enrollment banner */}
          {!enrolled && role !== 'student' && (
            <div className="mt-5 rounded-xl border-2 px-4 py-3 flex flex-wrap items-center gap-3 max-w-lg" style={{ background: '#D4F5F1', borderColor: '#1A9E8F' }}>
              <p className="text-sm" style={{ color: '#1A9E8F' }}>Have a school enrollment code? Enter it to link your account.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ARCADIA2026"
                  className="border-2 rounded-lg px-3 py-1.5 text-xs font-mono w-36"
                  style={{ borderColor: '#1A9E8F', background: '#FFF8F0', color: '#3D2B1F' }}
                />
                <button
                  onClick={() => { if (code) setEnrolled(true) }}
                  className="rounded-lg border-2 px-3 py-1.5 text-xs font-semibold"
                  style={{ background: '#1A9E8F', color: 'white', borderColor: '#3D2B1F' }}
                >
                  Connect →
                </button>
              </div>
            </div>
          )}

          {/* Pathways teaser strip */}
          {showPathways && (
            <div className="mt-4 rounded-xl border px-5 py-3 flex items-start justify-between gap-4 max-w-2xl" style={{ background: '#FDD07A', borderColor: '#3D2B1F' }}>
              <div className="flex items-start gap-2">
                <Sparkles size={16} style={{ color: '#6B4226', flexShrink: 0, marginTop: 2 }} />
                <p className="text-sm" style={{ color: '#3D2B1F' }}>
                  Grade 12? If you&apos;ve discovered a passion through SeniorCircle, ask your coordinator about <strong>Pathways</strong> — real apprenticeships with local pros.{' '}
                  <Link href="/pathways" className="font-semibold" style={{ color: '#6B4226' }}>Learn more →</Link>
                </p>
              </div>
              <button onClick={() => setShowPathways(false)} className="flex-shrink-0" aria-label="Dismiss">
                <X size={16} style={{ color: '#6B4226' }} />
              </button>
            </div>
          )}
        </PageShell>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b-2" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
        <PageShell className="py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
              {['All', ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 rounded-full border-2 px-3 py-1 text-xs font-semibold transition-colors"
                  style={{
                    background: activeCategory === cat ? '#FF6B35' : '#FFF8F0',
                    borderColor: activeCategory === cat ? '#3D2B1F' : '#A0644A',
                    color: activeCategory === cat ? 'white' : '#6B4226',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="border-2 rounded-lg px-3 py-1.5 text-xs font-semibold flex-shrink-0"
              style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
            >
              {['Any', 'Under 1 hr', '1–2 hrs', '3+ hrs'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </PageShell>
      </div>

      {/* Task grid */}
      <PageShell>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center mx-auto mb-4" style={{ borderColor: '#A0644A' }}>
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="section-heading text-2xl">No tasks match your filters</h2>
            <button onClick={() => { setActiveCategory('All'); setDurationFilter('Any') }} className="mt-4 text-sm font-semibold" style={{ color: '#FF6B35' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((task) => {
              const isApplied = role === 'student' && maya.appliedTaskIds.includes(task.id)
              return (
                <div
                  key={task.id}
                  className="rounded-xl border-2 p-5 flex flex-col hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#3D2B1F] transition-all duration-150"
                  style={{
                    background: isApplied ? '#D4F5F1' : '#FFF3E4',
                    borderColor: isApplied ? '#1A9E8F' : '#3D2B1F',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
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
                    {isNew(task.date) && (
                      <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: '#FFE8D6', color: '#FF6B35' }}>NEW</span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg leading-snug flex-1" style={{ color: '#3D2B1F' }}>{task.title}</h3>

                  <div className="flex items-center gap-1 mt-2">
                    <ShieldCheck size={12} style={{ color: '#38A169' }} />
                    <p className="text-xs" style={{ color: '#A0644A' }}>{task.seniorName}</p>
                  </div>
                  <p className="text-xs" style={{ color: '#A0644A' }}>{task.location}</p>

                  <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: '#4A5568' }}>
                    <span>{task.duration}h</span>
                    <span>·</span>
                    <span>{formatDate(task.date)}</span>
                  </div>

                  {task.skillTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {task.skillTags.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-full border px-2 py-0.5 text-xs" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{s}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <Link
                      href={`/students/${task.id}`}
                      className="rounded-lg border-2 px-4 py-1.5 text-xs font-semibold transition-colors hover:bg-[#FFE8D6]"
                      style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
                    >
                      View task →
                    </Link>
                    {isApplied && <span className="text-xs font-semibold" style={{ color: '#1A9E8F' }}>Applied ✓</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </PageShell>
    </div>
  )
}
