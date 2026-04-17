'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import PageShell from '@/components/PageShell'
import CategoryIcon from '@/components/CategoryIcon'
import { CATEGORIES, SKILLS } from '@/lib/mockData'

type Step = 1 | 2 | 3

interface TaskForm {
  title: string
  description: string
  category: string
  skillTags: string[]
  date: string
  duration: string
  address: string
  instructions: string
}

const DURATIONS = ['1 hour', '2 hours', '3 hours', 'Half day']

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {([1, 2, 3] as Step[]).map((s, i) => (
        <div key={s} className="flex items-center">
          <div
            className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: s < current ? '#3D2B1F' : s === current ? '#FF6B35' : '#FFF3E4',
              borderColor: '#3D2B1F',
              color: s <= current ? 'white' : '#3D2B1F',
            }}
          >
            {s < current ? '✓' : s}
          </div>
          {i < 2 && (
            <div className="w-16 h-0.5 mx-1" style={{ background: s < current ? '#3D2B1F' : '#D4C4BB' }} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function PostTaskPage() {
  const [step, setStep] = useState<Step>(1)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState<TaskForm>({
    title: '',
    description: '',
    category: '',
    skillTags: [],
    date: '',
    duration: '',
    address: '',
    instructions: '',
  })

  function toggleSkill(skill: string) {
    setForm((f) => ({
      ...f,
      skillTags: f.skillTags.includes(skill)
        ? f.skillTags.filter((s) => s !== skill)
        : [...f.skillTags, skill],
    }))
  }

  function formatDate(d: string) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (done) {
    return (
      <PageShell>
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#C6F6D5' }}>
            <CheckCircle size={36} style={{ color: '#38A169' }} />
          </div>
          <h1 className="display-heading text-4xl">Your task is posted!</h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: '#6B4226' }}>
            We&apos;ll notify you when a student is matched. You&apos;ll be able to review their profile and approve before anything is confirmed.
          </p>
          <a href="/seniors" className="inline-block mt-6 text-sm font-semibold" style={{ color: '#FF6B35' }}>
            View all my tasks →
          </a>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto">
        <p className="label-caps mb-2">Post a task</p>
        <h1 className="display-heading text-4xl mb-8">
          {step === 1 ? 'What do you need help with?' : step === 2 ? 'When and where?' : 'Review your task'}
        </h1>

        <StepIndicator current={step} />

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <p className="label-caps">Step 1 of 3 — The task</p>

            <div>
              <label className="label-caps" htmlFor="task-title">Task title</label>
              <input
                id="task-title"
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-3 text-sm"
                style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
                placeholder="e.g. Help weeding the front garden"
              />
            </div>

            <div>
              <label className="label-caps" htmlFor="task-desc">Description</label>
              <textarea
                id="task-desc"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-3 text-sm resize-none"
                style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
                placeholder="Describe what you need and any useful details — the more you share, the better the match"
              />
            </div>

            <div>
              <label className="label-caps" htmlFor="task-cat">Category</label>
              <select
                id="task-cat"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-3 text-sm"
                style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="label-caps mb-3 block">Skills needed</label>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => {
                  const active = form.skillTags.includes(skill)
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="rounded-full border-2 px-3 py-1 text-xs font-medium transition-colors"
                      style={{
                        background: active ? '#FF6B35' : '#FFF8F0',
                        borderColor: active ? '#3D2B1F' : '#A0644A',
                        color: active ? 'white' : '#6B4226',
                      }}
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                onClick={() => setStep(2)}
                disabled={!form.title || !form.category}
                className="rounded-lg border-2 px-6 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <p className="label-caps">Step 2 of 3 — Date & location</p>

            <div>
              <label className="label-caps" htmlFor="task-date">Preferred date</label>
              <input
                id="task-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-3 text-sm"
                style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
              />
            </div>

            <div>
              <label className="label-caps mb-3 block">Estimated duration</label>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setForm({ ...form, duration: d })}
                    className="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      background: form.duration === d ? '#FF6B35' : '#FFF8F0',
                      borderColor: '#3D2B1F',
                      color: form.duration === d ? 'white' : '#3D2B1F',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-caps" htmlFor="task-addr">Your address</label>
              <input
                id="task-addr"
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-3 text-sm"
                style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
                placeholder="123 Rose Lane, Pasadena, CA"
              />
              <p className="text-xs mt-1" style={{ color: '#A0644A' }}>Only shown to matched students, never public</p>
            </div>

            <div>
              <label className="label-caps" htmlFor="task-notes">Any special instructions? (optional)</label>
              <textarea
                id="task-notes"
                rows={3}
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-3 text-sm resize-none"
                style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }}
                placeholder="e.g. Ring the doorbell, tools are in the shed…"
              />
            </div>

            <div className="flex justify-between mt-2">
              <button
                onClick={() => setStep(1)}
                className="rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#FFF3E4]"
                style={{ background: '#FFF8F0', color: '#3D2B1F', borderColor: '#3D2B1F' }}
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.date || !form.duration}
                className="rounded-lg border-2 px-6 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <p className="label-caps">Step 3 of 3 — Review your task</p>

            {/* Preview card */}
            <div className="rounded-xl border-2 p-6" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
              {form.category && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3"
                  style={{ background: '#FFE8D6', color: '#FF6B35', borderColor: '#FF6B35' }}
                >
                  <CategoryIcon category={form.category} />
                  {form.category}
                </span>
              )}
              <h2 className="font-serif font-bold text-2xl" style={{ color: '#3D2B1F' }}>{form.title || 'Untitled task'}</h2>
              {form.description && <p className="text-sm mt-2 leading-relaxed" style={{ color: '#6B4226' }}>{form.description}</p>}
              <div className="flex flex-wrap gap-4 mt-4 text-xs" style={{ color: '#4A5568' }}>
                {form.date && <span>📅 {formatDate(form.date)}</span>}
                {form.duration && <span>⏱ {form.duration}</span>}
                {form.address && <span>📍 {form.address}</span>}
              </div>
              {form.skillTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {form.skillTags.map((s) => (
                    <span key={s} className="rounded-full border px-2.5 py-0.5 text-xs" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{s}</span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm" style={{ color: '#6B4226' }}>Looks good? Post it and we&apos;ll start finding matches.</p>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#FFF3E4]"
                style={{ background: '#FFF8F0', color: '#3D2B1F', borderColor: '#3D2B1F' }}
              >
                ← Back
              </button>
              <button
                onClick={() => setDone(true)}
                className="rounded-lg border-2 px-8 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
              >
                Post my task →
              </button>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}
