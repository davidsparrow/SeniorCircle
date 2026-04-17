'use client'
import Link from 'next/link'
import { Star, Sparkles } from 'lucide-react'
import PageShell from '@/components/PageShell'
import CategoryIcon from '@/components/CategoryIcon'
import { useDemo } from '@/lib/demoContext'
import { mockStudents, SKILLS } from '@/lib/mockData'

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= rating ? '#F4A832' : 'none'} style={{ color: '#F4A832' }} />
      ))}
    </span>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('')
}

export default function StudentProfilePage() {
  const { role } = useDemo()
  const maya = mockStudents[0]

  const pct = maya.hoursCompleted / maya.hoursGoal
  const avgRating = maya.sessions.reduce((a, s) => a + s.rating, 0) / maya.sessions.length

  // Count skill demonstrations
  const skillCounts: Record<string, number> = {}
  maya.sessions.forEach((sess) => {
    const task = sess.taskTitle.toLowerCase()
    SKILLS.forEach((sk) => { if (task.includes(sk.split(' ')[0])) skillCounts[sk] = (skillCounts[sk] ?? 0) + 1 })
  })
  maya.skills.forEach((sk) => { if (!skillCounts[sk]) skillCounts[sk] = 1 })

  // Category counts for Hour Passport
  const catCounts: Record<string, number> = {}
  maya.sessions.forEach((sess) => {
    const c = sess.taskTitle.includes('memoir') || sess.taskTitle.toLowerCase().includes('memoir') ? 'Memoir Project'
      : sess.taskTitle.toLowerCase().includes('garden') || sess.taskTitle.toLowerCase().includes('weed') ? 'Yardwork'
      : sess.taskTitle.toLowerCase().includes('sort') || sess.taskTitle.toLowerCase().includes('organiz') ? 'Organizing'
      : sess.taskTitle.toLowerCase().includes('read') || sess.taskTitle.toLowerCase().includes('poetry') ? 'Reading Aloud'
      : 'Companionship'
    catCounts[c] = (catCounts[c] ?? 0) + 1
  })
  const topCategories = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c]) => c)

  return (
    <div>
      {/* Coordinator banner */}
      {role === 'coordinator' && (
        <div className="border-b-2" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
          <PageShell className="py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm" style={{ color: '#6B4226' }}>
                You&apos;re viewing this as Maya&apos;s coordinator. You can nominate her for Pathways or assign her to a task.
              </p>
              <div className="flex gap-2">
                <button disabled title="Coming in Pathways v1" className="rounded-lg border-2 px-3 py-1.5 text-xs font-semibold opacity-40 cursor-not-allowed" style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}>Nominate for Pathways</button>
                <button disabled title="Coming in Pathways v1" className="rounded-lg border-2 px-3 py-1.5 text-xs font-semibold opacity-40 cursor-not-allowed" style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}>Assign to task</button>
              </div>
            </div>
          </PageShell>
        </div>
      )}

      {/* Profile header */}
      <div className="border-b-2" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
        <PageShell>
          <div className="flex flex-wrap items-start gap-6">
            <div
              className="w-20 h-20 rounded-full border-2 flex items-center justify-center font-bold text-2xl flex-shrink-0"
              style={{ background: '#FFE8D6', borderColor: '#3D2B1F', color: '#FF6B35' }}
            >
              {initials(maya.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="display-heading text-4xl">{maya.name}</h1>
              <p className="text-sm mt-1" style={{ color: '#A0644A' }}>{maya.school} · Grade {maya.grade} · Joined {formatDate(maya.joinedDate)}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {maya.skills.map((sk) => (
                  <span key={sk} className="rounded-full border px-2.5 py-0.5 text-xs font-medium" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{sk}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-6 text-center">
              <div><p className="font-serif font-black text-4xl" style={{ color: '#FF6B35' }}>{maya.hoursCompleted}</p><p className="text-xs" style={{ color: '#A0644A' }}>Total hours</p></div>
              <div><p className="font-serif font-black text-4xl" style={{ color: '#FF6B35' }}>{maya.sessions.length}</p><p className="text-xs" style={{ color: '#A0644A' }}>Tasks done</p></div>
              <div>
                <StarRating rating={Math.round(avgRating)} size={18} />
                <p className="text-xs mt-0.5" style={{ color: '#A0644A' }}>Avg rating</p>
              </div>
            </div>
          </div>
        </PageShell>
      </div>

      <PageShell>
        {/* Hours progress */}
        <div className="mb-10">
          <p className="label-caps mb-2">Semester goal</p>
          <div className="relative rounded-full overflow-visible border-2" style={{ background: '#FFF3E4', height: 20, borderColor: '#3D2B1F' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct * 100}%`, background: '#1A9E8F' }} />
            {/* Milestones */}
            {[10, 25, 50].map((m) => {
              const mPct = (m / maya.hoursGoal) * 100
              const reached = maya.hoursCompleted >= m
              return (
                <div key={m} className="absolute top-0 -translate-x-1/2 flex flex-col items-center" style={{ left: `${mPct}%` }}>
                  <div className="w-0.5 h-5" style={{ background: '#3D2B1F' }} />
                  <Star size={12} fill={reached ? '#F4A832' : 'none'} style={{ color: '#F4A832', marginTop: 2 }} />
                  <span className="text-[10px] mt-0.5 font-semibold" style={{ color: '#A0644A' }}>{m}h</span>
                </div>
              )
            })}
          </div>
          <p className="text-sm mt-3" style={{ color: '#6B4226' }}>
            {maya.hoursCompleted} of {maya.hoursGoal} hours complete · {maya.hoursGoal - maya.hoursCompleted} hours to go
          </p>
          <p className="text-xs mt-1" style={{ color: '#A0644A' }}>
            Milestones: ★ 10 hrs reached · ☆ 25 hrs ({25 - maya.hoursCompleted > 0 ? `${25 - maya.hoursCompleted} more to go` : 'reached'}) · ☆ 50 hrs
          </p>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Session history */}
          <div>
            <h2 className="section-heading text-2xl mb-5">Your completed tasks</h2>
            <div className="flex flex-col gap-3">
              {maya.sessions.map((sess) => (
                <div key={sess.taskId} className="rounded-xl border-2 p-4" style={{ background: '#FFF8F0', borderColor: '#3D2B1F' }}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-base leading-snug" style={{ color: '#3D2B1F' }}>{sess.taskTitle}</h3>
                    <span className="flex-shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold" style={{ background: '#FFE8D6', color: '#FF6B35', borderColor: '#FF6B35' }}>
                      {sess.hours}h
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#A0644A' }}>{sess.seniorName} · {formatDate(sess.date)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <StarRating rating={sess.rating} />
                    <span className="rounded-full border px-2 py-0.5 text-xs font-semibold" style={{ background: '#C6F6D5', color: '#38A169', borderColor: '#38A169' }}>Confirmed</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: '#A0644A' }}>
              Total: {maya.hoursCompleted} hours across {maya.sessions.length} sessions
            </p>
          </div>

          {/* Hour Passport */}
          <div>
            <h2 className="section-heading text-2xl mb-5">Your Hour Passport</h2>
            <div
              className="rounded-2xl border-2 p-8"
              style={{ background: '#FFF3E4', borderColor: '#3D2B1F', outline: '2px solid #FFE8D6', outlineOffset: -12 }}
            >
              <p className="font-serif font-black text-2xl text-center" style={{ color: '#FF6B35' }}>SeniorCircle</p>
              <p className="text-center text-sm mt-0.5" style={{ color: '#A0644A' }}>Community Service Passport</p>
              <div className="border-t-2 my-5" style={{ borderColor: '#3D2B1F' }} />
              <p className="font-serif font-black text-4xl text-center" style={{ color: '#3D2B1F' }}>{maya.name}</p>
              <p className="text-center text-xs mt-1" style={{ color: '#A0644A' }}>{maya.school} · Spring Semester 2026</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: 'Hours completed', value: maya.hoursCompleted.toString() },
                  { label: 'Tasks completed', value: maya.sessions.length.toString() },
                  { label: 'Avg. senior rating', value: `★ ${avgRating.toFixed(1)}` },
                  { label: 'Skills demonstrated', value: maya.skills.slice(0, 3).join(', ') },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg p-3 border" style={{ background: '#FFF8F0', borderColor: '#FFE8D6' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#A0644A' }}>{label}</p>
                    <p className="font-serif font-bold text-sm mt-0.5" style={{ color: '#3D2B1F' }}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="label-caps mb-2">Top categories</p>
                <div className="flex flex-wrap gap-2">
                  {topCategories.map((cat) => (
                    <span key={cat} className="flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold" style={{ background: '#FFE8D6', color: '#FF6B35', borderColor: '#FF6B35' }}>
                      <CategoryIcon category={cat} />
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t mt-5 pt-4" style={{ borderColor: '#3D2B1F' }}>
                <p className="text-xs italic text-center" style={{ color: '#A0644A' }}>
                  Certified by <span className="font-serif">Ms. Patricia Holt</span>
                </p>
                <p className="text-center mt-1 text-xs" style={{ color: '#A0644A', textDecoration: 'underline' }}>Arcadia High School</p>
              </div>
              <p className="text-center text-xs mt-3" style={{ color: '#A0644A' }}>seniorcircle.app</p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => window.print()}
                className="w-full rounded-lg border-2 py-2.5 text-sm font-semibold transition-colors hover:opacity-90 no-print"
                style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
              >
                Download PDF
              </button>
              <button
                disabled
                className="w-full rounded-lg border-2 py-2.5 text-sm font-semibold opacity-40 cursor-not-allowed no-print"
                style={{ background: '#FFF8F0', color: '#3D2B1F', borderColor: '#3D2B1F' }}
              >
                Share with school →
              </button>
            </div>

            {/* Pathways banner */}
            <div className="mt-6 rounded-xl border-2 p-6" style={{ background: '#FDD07A', borderColor: '#3D2B1F' }}>
              <Sparkles size={20} style={{ color: '#6B4226', marginBottom: 8 }} />
              <h3 className="font-serif font-bold text-xl" style={{ color: '#3D2B1F' }}>Thinking about what comes next?</h3>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: '#3D2B1F' }}>
                Students who show real skill and dedication through SeniorCircle may qualify for <strong>Pathways</strong> — connecting graduating seniors with local trade professionals offering paid apprenticeships. Talk to Ms. Holt to find out if you&apos;re on track.
              </p>
              <Link
                href="/pathways"
                className="inline-block mt-4 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#FFF3E4]"
                style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}
              >
                Learn about Pathways →
              </Link>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="mt-14">
          <h2 className="section-heading text-2xl mb-6">Your skills profile</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SKILLS.map((skill) => {
              const count = skillCounts[skill] ?? 0
              const demonstrated = maya.skills.includes(skill)
              return (
                <div
                  key={skill}
                  className="rounded-xl border-2 p-4"
                  style={{
                    background: demonstrated ? '#FFF3E4' : '#FFF8F0',
                    borderColor: demonstrated ? '#3D2B1F' : '#FFE8D6',
                    opacity: demonstrated ? 1 : 0.6,
                  }}
                >
                  <p className="text-sm font-semibold" style={{ color: '#3D2B1F' }}>{skill}</p>
                  {demonstrated ? (
                    <>
                      <div className="mt-2 rounded-full overflow-hidden" style={{ background: '#FFE8D6', height: 4 }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(count * 20, 100)}%`, background: '#FF6B35' }} />
                      </div>
                      <p className="text-[10px] mt-1" style={{ color: '#A0644A' }}>Demonstrated {count}×</p>
                    </>
                  ) : (
                    <p className="text-[10px] mt-2" style={{ color: '#A0644A' }}>Not yet demonstrated</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Senior reviews */}
        <div className="mt-14">
          <h2 className="section-heading text-2xl mb-6">What seniors said</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { quote: 'Maya was absolutely wonderful — patient, organized, and so easy to talk to. I could not have sorted Harold\'s blueprints without her.', author: 'Harold Chen', date: 'April 2026' },
              { quote: 'She helped me write the first chapter of my memoir. I did not expect to feel so heard. I hope she comes back.', author: 'Ruth Nakamura', date: 'March 2026' },
            ].map(({ quote, author, date }) => (
              <div key={author} className="rounded-xl border-2 p-6" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
                <p className="font-serif text-6xl leading-none" style={{ color: '#FF6B35' }}>&ldquo;</p>
                <p className="font-serif italic text-lg leading-relaxed -mt-4" style={{ color: '#3D2B1F' }}>{quote}</p>
                <p className="label-caps mt-4">— {author}, {date}</p>
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </div>
  )
}
