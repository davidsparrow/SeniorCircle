'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import PageShell from '@/components/PageShell'
import { useDemo } from '@/lib/demoContext'

export default function SeniorsPage() {
  const { role } = useDemo()
  const [familyAccess, setFamilyAccess] = useState(false)

  if (role === 'senior') {
    return (
      <PageShell>
        <p className="label-caps">Your dashboard</p>
        <h1 className="display-heading text-4xl mt-2">Welcome back, Eleanor.</h1>
        <p className="mt-3 text-base" style={{ color: '#6B4226' }}>
          Here are your posted tasks and their current statuses.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { title: 'Help with front yard weeding', status: 'open', statusColor: '#FF6B35', statusBg: '#FFE8D6', date: 'May 10, 2026' },
            { title: 'Help me start writing my memoirs', status: 'matched', statusColor: '#38A169', statusBg: '#C6F6D5', date: 'May 14, 2026', match: 'Maya Reyes' },
          ].map((t) => (
            <div key={t.title} className="rounded-xl border-2 p-5" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif font-bold text-base leading-snug" style={{ color: '#3D2B1F' }}>{t.title}</h3>
                <span className="flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold" style={{ background: t.statusBg, color: t.statusColor, borderColor: t.statusColor }}>
                  {t.status}
                </span>
              </div>
              <p className="text-xs mt-2" style={{ color: '#A0644A' }}>{t.date}</p>
              {t.match && <p className="text-xs mt-1" style={{ color: '#38A169' }}>Matched with {t.match}</p>}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/seniors/post-task"
            className="rounded-lg border-2 px-6 py-2.5 text-sm font-semibold inline-block transition-colors hover:opacity-90"
            style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
          >
            Post a new task →
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <p className="label-caps">For seniors</p>
      <h1 className="display-heading text-4xl mt-2">Welcome. Let&apos;s find you some help.</h1>
      <p className="mt-3 text-base leading-relaxed" style={{ color: '#6B4226' }}>
        Every student is verified by their school before they can be matched to a task. You review and approve who helps you — no one shows up unannounced.
      </p>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Sign-up form */}
        <div className="rounded-xl border-2 p-6" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
          <h2 className="section-heading text-xl mb-5">Create your account</h2>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label-caps" htmlFor="sen-name">Full name</label>
              <input id="sen-name" type="text" required className="w-full border-2 rounded-lg px-4 py-3 text-sm" style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }} placeholder="e.g. Eleanor Voss" />
            </div>
            <div>
              <label className="label-caps" htmlFor="sen-city">City / neighborhood</label>
              <input id="sen-city" type="text" required className="w-full border-2 rounded-lg px-4 py-3 text-sm" style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }} placeholder="e.g. Pasadena, CA" />
            </div>
            <div>
              <label className="label-caps" htmlFor="sen-phone">Phone (optional)</label>
              <input id="sen-phone" type="tel" className="w-full border-2 rounded-lg px-4 py-3 text-sm" style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }} placeholder="(626) 555-0100" />
            </div>
            <div>
              <label className="label-caps" htmlFor="sen-email">Email</label>
              <input id="sen-email" type="email" required className="w-full border-2 rounded-lg px-4 py-3 text-sm" style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }} placeholder="you@example.com" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#3D2B1F' }}>
              <input type="checkbox" checked={familyAccess} onChange={(e) => setFamilyAccess(e.target.checked)} className="w-4 h-4 rounded" />
              I&apos;d like a family member to also have access to my account.
            </label>
            {familyAccess && (
              <div>
                <label className="label-caps" htmlFor="sen-family-email">Family member&apos;s email</label>
                <input id="sen-family-email" type="email" className="w-full border-2 rounded-lg px-4 py-3 text-sm" style={{ borderColor: '#3D2B1F', background: '#FFF8F0', color: '#3D2B1F' }} placeholder="family@example.com" />
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg border-2 py-3 text-sm font-semibold mt-1 transition-colors hover:opacity-90"
              style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
            >
              Create my account →
            </button>
          </form>
        </div>

        {/* Trust signals + testimonial */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {[
              'Every student is school-verified',
              'You approve who helps you',
              'No strangers without a confirmed match',
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-3">
                <CheckCircle size={20} style={{ color: '#38A169', flexShrink: 0 }} />
                <p className="text-sm font-medium" style={{ color: '#3D2B1F' }}>{signal}</p>
              </div>
            ))}
          </div>

          <blockquote className="rounded-xl border-2 p-6" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
            <p className="font-serif italic text-lg leading-relaxed" style={{ color: '#3D2B1F' }}>
              &ldquo;I was nervous at first — letting someone I didn&apos;t know into my garden. But my coordinator matched me with Maya and she was absolutely wonderful. I couldn&apos;t have done it without her.&rdquo;
            </p>
            <p className="label-caps mt-3">— Eleanor Voss, Pasadena CA</p>
          </blockquote>
        </div>
      </div>
    </PageShell>
  )
}
