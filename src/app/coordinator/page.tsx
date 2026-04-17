'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check, Sparkles, Star, ChevronDown, ChevronUp } from 'lucide-react'
import PageShell from '@/components/PageShell'
import CategoryIcon from '@/components/CategoryIcon'
import { useDemo } from '@/lib/demoContext'
import { mockStudents, mockTasks, mockSchools, mockPathwaysCandidates, mockTradeProfs } from '@/lib/mockData'

type Tab = 'pending' | 'completed' | 'report' | 'pathways'

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('')
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function bestMatch(skillTags: string[]) {
  let best = mockStudents[0]
  let bestCount = 0
  for (const s of mockStudents) {
    const count = skillTags.filter((t) => s.skills.includes(t)).length
    if (count > bestCount) { bestCount = count; best = s }
  }
  return best
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} fill={i <= rating ? '#F4A832' : 'none'} style={{ color: '#F4A832' }} />
      ))}
    </span>
  )
}

export default function CoordinatorPage() {
  const { role, setRole } = useDemo()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('pending')
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)
  const [assignConfirm, setAssignConfirm] = useState<string | null>(null)
  const [assignedTasks, setAssignedTasks] = useState<Record<string, string>>({})
  const [completingTask, setCompletingTask] = useState<string | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [completeRating, setCompleteRating] = useState(5)
  const [sortCol, setSortCol] = useState<string>('date')
  const [sortDir, setSortDir] = useState<1 | -1>(1)

  const school = mockSchools[0]
  const students = mockStudents.filter((s) => school.students.includes(s.id))
  const openTasks = mockTasks.filter((t) => t.status === 'open')
  const matchedTasks = mockTasks.filter((t) => t.status === 'matched')
  const allSessions = students.flatMap((s) => s.sessions.map((sess) => ({ ...sess, studentName: s.name, studentId: s.id })))

  const sortedSessions = [...allSessions].sort((a, b) => {
    const key = sortCol as keyof typeof a
    const av = a[key] ?? ''
    const bv = b[key] ?? ''
    return av < bv ? -sortDir : av > bv ? sortDir : 0
  })

  function copyCode() {
    navigator.clipboard.writeText(school.enrollmentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function toggleSort(col: string) {
    if (sortCol === col) setSortDir((d) => (d === 1 ? -1 : 1))
    else { setSortCol(col); setSortDir(1) }
  }

  if (role !== 'coordinator') {
    return (
      <PageShell>
        <div className="max-w-xl mx-auto py-16 text-center">
          <div className="rounded-2xl border-2 p-10" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
            <h2 className="section-heading text-2xl">This dashboard is for school coordinators.</h2>
            <p className="mt-3 text-sm" style={{ color: '#6B4226' }}>Switch to Coordinator view to explore it.</p>
            <button
              onClick={() => setRole('coordinator')}
              className="mt-6 rounded-lg border-2 px-6 py-2.5 text-sm font-semibold transition-colors hover:opacity-90"
              style={{ background: '#7C3AED', color: 'white', borderColor: '#3D2B1F' }}
            >
              Switch to Coordinator view
            </button>
          </div>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <p className="label-caps" style={{ color: '#7C3AED' }}>{school.name} · Coordinator Dashboard</p>
          <h1 className="display-heading text-4xl mt-1">Good morning, Ms. Holt.</h1>
          <p className="mt-2 text-sm" style={{ color: '#6B4226' }}>
            {students.length} students · {matchedTasks.length} open matches · {openTasks.length} tasks awaiting assignment
          </p>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#FFF3E4]"
          style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}
        >
          {copied ? <Check size={14} style={{ color: '#38A169' }} /> : <Copy size={14} />}
          School code: {school.enrollmentCode}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Students enrolled', value: students.length.toString(), accent: '#FF6B35' },
          { label: 'Hours this semester', value: school.totalHoursLogged.toString(), accent: '#FF6B35' },
          { label: 'Tasks completed', value: school.tasksCompleted.toString(), accent: '#FF6B35' },
          { label: 'Open tasks nearby', value: openTasks.length.toString(), accent: '#1A9E8F', dot: true },
        ].map(({ label, value, accent, dot }) => (
          <div key={label} className="rounded-xl border-2 p-5" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
            <div className="flex items-center gap-2">
              <p className="font-serif font-black text-4xl" style={{ color: accent }}>{value}</p>
              {dot && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#1A9E8F' }} />}
            </div>
            <p className="text-xs mt-1" style={{ color: '#A0644A' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
        {/* Student roster */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading text-2xl">Your students</h2>
            <button disabled className="rounded-lg border-2 px-4 py-1.5 text-xs font-semibold opacity-40 cursor-not-allowed" style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}>
              Invite student →
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {students.map((s) => {
              const pct = s.hoursCompleted / s.hoursGoal
              const expanded = expandedStudent === s.id
              return (
                <div key={s.id} className="rounded-xl border-2" style={{ background: '#FFF8F0', borderColor: '#3D2B1F' }}>
                  <button
                    className="w-full text-left p-4 flex items-center gap-4"
                    onClick={() => setExpandedStudent(expanded ? null : s.id)}
                  >
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: '#D4F5F1', borderColor: '#3D2B1F', color: '#1A9E8F' }}>
                      {initials(s.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm" style={{ color: '#3D2B1F' }}>{s.name}</p>
                        <p className="text-xs" style={{ color: '#A0644A' }}>Grade {s.grade}</p>
                        {pct >= 0.8 && (
                          <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: '#FDD07A', color: '#6B4226' }}>
                            <Star size={10} fill="#F4A832" style={{ color: '#F4A832' }} /> On track
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 rounded-full overflow-hidden" style={{ background: '#FFF3E4', height: 6 }}>
                        <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: '#1A9E8F' }} />
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: '#A0644A' }}>{s.hoursCompleted} / {s.hoursGoal} hrs</p>
                    </div>
                    <div className="flex flex-wrap gap-1 hidden sm:flex">
                      {s.skills.slice(0, 3).map((sk) => (
                        <span key={sk} className="rounded-full border px-2 py-0.5 text-xs" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{sk}</span>
                      ))}
                    </div>
                    {expanded ? <ChevronUp size={16} style={{ color: '#A0644A', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: '#A0644A', flexShrink: 0 }} />}
                  </button>

                  {expanded && (
                    <div className="px-4 pb-4 border-t" style={{ borderColor: '#FFE8D6' }}>
                      <div className="flex flex-wrap gap-1.5 pt-3 mb-3">
                        {s.skills.map((sk) => (
                          <span key={sk} className="rounded-full border px-2.5 py-0.5 text-xs" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{sk}</span>
                        ))}
                      </div>
                      <table className="w-full text-xs">
                        <thead>
                          <tr style={{ color: '#A0644A' }}>
                            <th className="text-left pb-1 font-bold uppercase tracking-wider text-[10px]">Task</th>
                            <th className="text-left pb-1 font-bold uppercase tracking-wider text-[10px]">Date</th>
                            <th className="text-left pb-1 font-bold uppercase tracking-wider text-[10px]">Hrs</th>
                            <th className="text-left pb-1 font-bold uppercase tracking-wider text-[10px]">Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {s.sessions.slice(0, 5).map((sess) => (
                            <tr key={sess.taskId} style={{ color: '#3D2B1F' }}>
                              <td className="py-1 pr-2 max-w-[140px] truncate">{sess.taskTitle}</td>
                              <td className="py-1 pr-2 whitespace-nowrap">{formatDate(sess.date)}</td>
                              <td className="py-1 pr-2">{sess.hours}</td>
                              <td className="py-1"><StarRating rating={sess.rating} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Link href="/students/profile" className="inline-block mt-3 text-xs font-semibold" style={{ color: '#FF6B35' }}>
                        View full profile →
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Open tasks */}
        <div className="lg:col-span-2">
          <h2 className="section-heading text-2xl mb-4">Open tasks near your school</h2>
          <div className="flex flex-col gap-3">
            {openTasks.map((task) => {
              const match = bestMatch(task.skillTags)
              const confirmed = assignedTasks[task.id]
              const confirming = assignConfirm === task.id
              return (
                <div key={task.id} className="rounded-xl border-2 p-4" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold flex-shrink-0" style={{ background: '#FFE8D6', color: '#FF6B35', borderColor: '#FF6B35' }}>
                      <CategoryIcon category={task.category} />
                      {task.category}
                    </span>
                  </div>
                  <p className="font-serif font-bold text-sm" style={{ color: '#3D2B1F' }}>{task.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#A0644A' }}>{task.seniorName} · {formatDate(task.date)} · {task.duration}h</p>

                  {confirmed ? (
                    <div className="mt-3 rounded-lg px-3 py-2" style={{ background: '#C6F6D5' }}>
                      <p className="text-xs font-semibold" style={{ color: '#38A169' }}>Matched ✓ · {confirmed} has been notified</p>
                    </div>
                  ) : confirming ? (
                    <div className="mt-3 rounded-lg border p-3" style={{ background: '#FFF8F0', borderColor: '#3D2B1F' }}>
                      <p className="text-xs mb-2" style={{ color: '#3D2B1F' }}>Assign <strong>{match.name}</strong> to this task?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setAssignedTasks({ ...assignedTasks, [task.id]: match.name }); setAssignConfirm(null) }}
                          className="rounded-lg border-2 px-3 py-1 text-xs font-semibold"
                          style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
                        >
                          Confirm
                        </button>
                        <button onClick={() => setAssignConfirm(null)} className="rounded-lg border-2 px-3 py-1 text-xs font-semibold" style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs" style={{ color: '#6B4226' }}>Best match: <strong>{match.name}</strong></p>
                      <button
                        onClick={() => setAssignConfirm(task.id)}
                        className="rounded-lg border-2 px-3 py-1.5 text-xs font-semibold transition-colors hover:opacity-90"
                        style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
                      >
                        Assign {match.name.split(' ')[0]} →
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t-2" style={{ borderColor: '#3D2B1F' }}>
        <div className="flex gap-0 border-b-2 overflow-x-auto" style={{ borderColor: '#3D2B1F' }}>
          {(['pending', 'completed', 'report', 'pathways'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-1.5 px-5 py-3 text-sm font-semibold border-r-2 flex-shrink-0 transition-colors"
              style={{
                borderColor: '#3D2B1F',
                background: activeTab === tab ? '#3D2B1F' : '#FFF8F0',
                color: activeTab === tab ? '#FFF8F0' : tab === 'pathways' ? '#F4A832' : '#6B4226',
              }}
            >
              {tab === 'pathways' && <Sparkles size={13} style={{ color: '#F4A832' }} />}
              {tab === 'pending' ? 'Pending matches' :
               tab === 'completed' ? 'Completed sessions' :
               tab === 'report' ? 'Generate report' : 'Pathways ✦'}
            </button>
          ))}
        </div>

        {/* Pending */}
        {activeTab === 'pending' && (
          <div className="py-6 flex flex-col gap-4">
            {matchedTasks.length === 0 ? (
              <p className="text-sm" style={{ color: '#A0644A' }}>No pending matches right now.</p>
            ) : matchedTasks.map((task) => {
              const student = mockStudents.find((s) => s.id === task.assignedStudentId)
              const done = completedTasks.has(task.id)
              const completing = completingTask === task.id
              return (
                <div key={task.id} className="rounded-xl border-2 p-5 flex flex-wrap items-center justify-between gap-4" style={{ background: done ? '#C6F6D5' : '#FFF3E4', borderColor: '#3D2B1F' }}>
                  <div>
                    <p className="font-serif font-bold text-base" style={{ color: '#3D2B1F' }}>{task.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#A0644A' }}>
                      {student?.name} · {task.seniorName} · {formatDate(task.date)}
                    </p>
                  </div>
                  {done ? (
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#38A169', color: 'white' }}>Completed ✓</span>
                  ) : completing ? (
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <button key={i} onClick={() => setCompleteRating(i)}>
                            <Star size={18} fill={i <= completeRating ? '#F4A832' : 'none'} style={{ color: '#F4A832' }} />
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => { setCompletedTasks(new Set([...completedTasks, task.id])); setCompletingTask(null) }}
                        className="rounded-lg border-2 px-4 py-1.5 text-xs font-semibold"
                        style={{ background: '#38A169', color: 'white', borderColor: '#3D2B1F' }}
                      >
                        Confirm complete
                      </button>
                      <button onClick={() => setCompletingTask(null)} className="text-xs" style={{ color: '#A0644A' }}>Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCompletingTask(task.id)}
                      className="rounded-lg border-2 px-4 py-1.5 text-xs font-semibold transition-colors hover:bg-[#C6F6D5]"
                      style={{ borderColor: '#38A169', color: '#38A169' }}
                    >
                      Mark complete
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Completed sessions */}
        {activeTab === 'completed' && (
          <div className="py-6 overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr style={{ borderBottom: '2px solid #3D2B1F' }}>
                  {[['studentName', 'Student'], ['taskTitle', 'Task'], ['seniorName', 'Senior'], ['date', 'Date'], ['hours', 'Hours'], ['rating', 'Rating']].map(([col, label]) => (
                    <th
                      key={col}
                      className="text-left pb-2 pr-4 text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-70"
                      style={{ color: '#A0644A' }}
                      onClick={() => toggleSort(col)}
                    >
                      {label} {sortCol === col ? (sortDir === 1 ? '↑' : '↓') : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedSessions.map((sess, i) => (
                  <tr key={`${sess.taskId}-${sess.studentId}`} style={{ background: i % 2 === 0 ? '#FFF8F0' : '#FFF3E4' }}>
                    <td className="py-2 pr-4" style={{ color: '#3D2B1F' }}>{sess.studentName}</td>
                    <td className="py-2 pr-4 max-w-[160px] truncate" style={{ color: '#3D2B1F' }}>{sess.taskTitle}</td>
                    <td className="py-2 pr-4" style={{ color: '#A0644A' }}>{sess.seniorName}</td>
                    <td className="py-2 pr-4 whitespace-nowrap" style={{ color: '#A0644A' }}>{formatDate(sess.date)}</td>
                    <td className="py-2 pr-4 font-semibold" style={{ color: '#FF6B35' }}>{sess.hours}h</td>
                    <td className="py-2"><StarRating rating={sess.rating} /></td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #3D2B1F' }}>
                  <td colSpan={4} className="pt-3 font-bold text-xs uppercase tracking-wider" style={{ color: '#A0644A' }}>Total</td>
                  <td className="pt-3 font-bold" style={{ color: '#FF6B35' }}>{sortedSessions.reduce((a, s) => a + s.hours, 0)}h</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Report */}
        {activeTab === 'report' && (
          <div className="py-6">
            <div className="rounded-xl border-2 p-8 max-w-2xl" style={{ background: '#FFF8F0', borderColor: '#3D2B1F', outline: '2px solid #FFE8D6', outlineOffset: -12 }}>
              <p className="font-serif font-black text-2xl text-center" style={{ color: '#FF6B35' }}>SeniorCircle</p>
              <p className="text-center text-sm mt-1" style={{ color: '#A0644A' }}>Community Service Record · Spring Semester 2026</p>
              <div className="border-t-2 mt-4 pt-4" style={{ borderColor: '#3D2B1F' }}>
                <p className="font-serif font-bold text-lg mb-1" style={{ color: '#3D2B1F' }}>{school.name}</p>
                <p className="text-xs" style={{ color: '#A0644A' }}>Coordinator: Ms. Patricia Holt · {school.coordinatorEmail}</p>
              </div>
              <table className="w-full mt-6 text-sm">
                <thead>
                  <tr style={{ borderBottom: '2px solid #3D2B1F' }}>
                    {['Student', 'Grade', 'Hours', 'Completion'].map((h) => (
                      <th key={h} className="text-left pb-2 text-[10px] font-bold uppercase tracking-wider pr-4" style={{ color: '#A0644A' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #FFE8D6' }}>
                      <td className="py-2 pr-4 font-semibold" style={{ color: '#3D2B1F' }}>{s.name}</td>
                      <td className="py-2 pr-4" style={{ color: '#A0644A' }}>{s.grade}</td>
                      <td className="py-2 pr-4 font-semibold" style={{ color: '#FF6B35' }}>{s.hoursCompleted}h</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full overflow-hidden flex-1" style={{ background: '#FFE8D6', height: 6 }}>
                            <div className="h-full rounded-full" style={{ width: `${(s.hoursCompleted / s.hoursGoal) * 100}%`, background: '#FF6B35' }} />
                          </div>
                          <span className="text-xs" style={{ color: '#A0644A' }}>{Math.round((s.hoursCompleted / s.hoursGoal) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-8 pt-4 border-t" style={{ borderColor: '#3D2B1F' }}>
                <p className="text-xs" style={{ color: '#A0644A' }}>Certified by: ___________________________________ Ms. Patricia Holt</p>
              </div>
            </div>
            <button
              disabled
              title="PDF generation coming soon"
              className="mt-4 rounded-lg border-2 px-6 py-2.5 text-sm font-semibold opacity-40 cursor-not-allowed no-print"
              style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}
            >
              Download as PDF
            </button>
          </div>
        )}

        {/* Pathways */}
        {activeTab === 'pathways' && (
          <div className="py-6">
            <div className="rounded-2xl border-2 p-8" style={{ background: '#FDD07A', borderColor: '#3D2B1F' }}>
              <h2 className="font-serif font-black text-3xl" style={{ color: '#3D2B1F' }}>SeniorCircle Pathways</h2>
              <p className="font-serif italic text-lg mt-1" style={{ color: '#6B4226' }}>From service hours to skilled careers.</p>
              <p className="mt-4 text-sm leading-relaxed max-w-2xl" style={{ color: '#3D2B1F' }}>
                When a graduating senior shows consistent aptitude in a skill area — and the passion to go further — Pathways connects them directly with local trade professionals who are actively looking for apprentices. No degree required. Just demonstrated dedication, verified hours, and a coordinator&apos;s recommendation.
              </p>

              {/* Candidates */}
              <div className="mt-6">
                <p className="label-caps mb-3" style={{ color: '#6B4226' }}>Pathways candidates</p>
                {mockPathwaysCandidates.map((c) => {
                  const student = mockStudents.find((s) => s.id === c.studentId)
                  if (!student) return null
                  return (
                    <div key={c.studentId} className="rounded-xl border-2 p-5 mb-3" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className="font-serif font-bold text-lg" style={{ color: '#3D2B1F' }}>{student.name}</p>
                          <p className="text-xs" style={{ color: '#A0644A' }}>Grade {student.grade} · {student.hoursCompleted} hours completed</p>
                          <p className="text-xs mt-1" style={{ color: '#A0644A' }}>Recommended trade: {c.recommendedTrade}</p>
                          <p className="text-sm italic mt-2" style={{ color: '#6B4226' }}>&ldquo;{c.note}&rdquo;</p>
                        </div>
                        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#FDD07A', color: '#6B4226', border: '1px solid #F4A832' }}>
                          {c.status === 'introduced' ? `Introduced to ${mockTradeProfs.find((t) => t.id === c.matchedProfId)?.name}` : c.status}
                        </span>
                      </div>
                      <button
                        disabled
                        title="Full Pathways management coming in v2"
                        className="mt-4 rounded-lg border-2 px-4 py-1.5 text-xs font-semibold opacity-40 cursor-not-allowed"
                        style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}
                      >
                        Manage introduction →
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Trade pros */}
              <div className="mt-6">
                <p className="label-caps mb-3" style={{ color: '#6B4226' }}>Available trade professionals</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mockTradeProfs.map((tp) => (
                    <div key={tp.id} className="rounded-xl border-2 p-4" style={{ background: '#FFF8F0', borderColor: '#3D2B1F' }}>
                      <p className="font-serif font-bold text-sm" style={{ color: '#3D2B1F' }}>{tp.trade}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#A0644A' }}>{tp.name} · {tp.company} · {tp.location}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tp.lookingFor.map((s) => <span key={s} className="rounded-full border px-2 py-0.5 text-xs" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{s}</span>)}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-semibold" style={{ background: '#FDD07A', color: '#6B4226', padding: '2px 8px', borderRadius: 9999 }}>{tp.openings} opening{tp.openings !== 1 ? 's' : ''}</span>
                        <button disabled title="Coming in Pathways v1" className="text-xs font-semibold opacity-40 cursor-not-allowed" style={{ color: '#3D2B1F' }}>
                          Connect a student →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="label-caps mt-6" style={{ color: '#6B4226' }}>
                Pathways is currently in private beta · Contact hello@seniorcircle.app to enroll your school
              </p>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}
