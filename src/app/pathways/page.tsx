import Link from 'next/link'
import { Sparkles, CheckCircle } from 'lucide-react'
import PageShell from '@/components/PageShell'
import CategoryIcon from '@/components/CategoryIcon'
import { mockTradeProfs } from '@/lib/mockData'

export default function PathwaysPage() {
  return (
    <div>
      {/* Gold accent stripe */}
      <div style={{ height: 6, background: '#F4A832' }} />

      {/* Header */}
      <section style={{ background: '#FFF8F0' }}>
        <PageShell>
          <p className="label-caps flex items-center gap-1.5">
            <Sparkles size={13} /> SeniorCircle Pathways · Coming soon
          </p>
          <h1 className="display-heading text-5xl sm:text-6xl mt-3">
            From service hours<br />to skilled careers.
          </h1>
          <p className="mt-5 text-xl leading-relaxed max-w-2xl" style={{ color: '#6B4226' }}>
            Some students who volunteer through SeniorCircle discover a passion that surprises them — a knack for organizing, a love of cooking, a gift for helping someone tell their story. Pathways is what happens next.
          </p>
        </PageShell>
      </section>

      {/* Concept */}
      <section style={{ background: '#FFF3E4', borderTop: '2px solid #3D2B1F', borderBottom: '2px solid #3D2B1F' }}>
        <PageShell>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left body copy */}
            <div className="lg:col-span-3">
              <p className="text-base leading-loose" style={{ color: '#3D2B1F' }}>
                When a graduating senior has completed a meaningful number of hours, demonstrated consistent skill in a category, and earned strong ratings from the seniors they&apos;ve helped — their school coordinator can nominate them for SeniorCircle Pathways.
              </p>
              <p className="mt-4 text-base leading-loose" style={{ color: '#3D2B1F' }}>
                Pathways connects that student with a local trade professional in a matching field — a landscaper, a caterer, a home organizer, an editorial professional — who has agreed to take on a motivated apprentice. Not an internship. Not a shadowing day. A real working relationship with someone who has built a business around the very thing the student has been practicing.
              </p>
              <p className="mt-4 text-base leading-loose" style={{ color: '#3D2B1F' }}>
                No college degree. No connections. Just demonstrated grit, a verified track record, and a coordinator who believes in them.
              </p>

              {/* Pull quote */}
              <blockquote className="mt-8 border-l-4 pl-5" style={{ borderColor: '#FF6B35' }}>
                <p className="font-serif italic text-2xl leading-relaxed" style={{ color: '#3D2B1F' }}>
                  &ldquo;The hours you logged helping Eleanor were your audition. Pathways is the callback.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Right — eligibility card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border-2 p-8" style={{ background: '#FDD07A', borderColor: '#3D2B1F' }}>
                <h2 className="font-serif font-bold text-2xl" style={{ color: '#3D2B1F' }}>Who qualifies?</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {[
                    'Graduating senior (Grade 12)',
                    '25+ verified hours completed',
                    'Average senior rating of 4.5★ or higher',
                    'Coordinator nomination',
                    'Demonstrated skill in a trade-adjacent category',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#3D2B1F' }}>
                      <CheckCircle size={16} style={{ color: '#FF6B35', flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t mt-6 pt-5" style={{ borderColor: '#3D2B1F' }}>
                  <p className="label-caps mb-3" style={{ color: '#6B4226' }}>Then what?</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-medium" style={{ color: '#3D2B1F' }}>
                    <span className="rounded-full px-3 py-1 border" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>Coordinator nominates</span>
                    <span style={{ color: '#A0644A' }}>→</span>
                    <span className="rounded-full px-3 py-1 border" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>Trade pro reviews passport</span>
                    <span style={{ color: '#A0644A' }}>→</span>
                    <span className="rounded-full px-3 py-1 border" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>Introduction is made</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      {/* Trade partners */}
      <section style={{ background: '#FFF8F0' }}>
        <PageShell>
          <h2 className="section-heading text-3xl mb-3">Local professionals who are ready to teach</h2>
          <p className="text-base mb-8" style={{ color: '#6B4226' }}>
            These are real people who have built something with their hands, their creativity, or their expertise. They&apos;ve joined Pathways because they believe in giving motivated young people a real start.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockTradeProfs.map((tp) => (
              <div key={tp.id} className="rounded-xl border-2 p-6 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#3D2B1F] transition-all duration-150" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
                <div className="flex items-start gap-3 mb-3">
                  <span style={{ color: '#FF6B35' }}>
                    <CategoryIcon category={
                      tp.trade.includes('Landscape') ? 'Yardwork' :
                      tp.trade.includes('Culinary') ? 'Cooking' :
                      tp.trade.includes('Organizing') ? 'Organizing' : 'Memoir Project'
                    } size={24} />
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-xl" style={{ color: '#3D2B1F' }}>{tp.trade}</h3>
                    <p className="text-xs mt-0.5" style={{ color: '#A0644A' }}>{tp.name} · {tp.company} · {tp.location}</p>
                  </div>
                </div>
                <p className="text-sm italic leading-relaxed" style={{ color: '#6B4226' }}>{tp.bio}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#A0644A' }}>Looking for:</span>
                  {tp.lookingFor.map((s) => (
                    <span key={s} className="rounded-full border px-2.5 py-0.5 text-xs" style={{ background: '#D4F5F1', color: '#1A9E8F', borderColor: '#1A9E8F' }}>{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#FDD07A', color: '#6B4226' }}>
                    {tp.openings} opening{tp.openings !== 1 ? 's' : ''}
                  </span>
                  <div className="text-right">
                    <button
                      disabled
                      title="Available when your coordinator nominates you"
                      className="text-xs font-semibold opacity-40 cursor-not-allowed"
                      style={{ color: '#3D2B1F' }}
                    >
                      Express interest →
                    </button>
                    <p className="text-[10px] mt-0.5" style={{ color: '#A0644A' }}>Available when your coordinator nominates you</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageShell>
      </section>

      {/* Roadmap */}
      <section style={{ background: '#FFF3E4', borderTop: '2px solid #3D2B1F', borderBottom: '2px solid #3D2B1F' }}>
        <PageShell>
          <h2 className="section-heading text-3xl mb-3">The Pathways roadmap</h2>
          <p className="text-base mb-8" style={{ color: '#6B4226' }}>
            Pathways is the next chapter for SeniorCircle. Here&apos;s where we are and where we&apos;re going.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Now (in demo)',
                badge: 'Live in demo',
                badgeBg: '#FFE8D6', badgeText: '#FF6B35',
                items: ['Trade partner profiles visible', 'Pathways teaser on student profiles', 'Coordinator can flag graduating seniors', 'Eligibility criteria published'],
              },
              {
                title: 'Next (v1 launch)',
                badge: 'Coming v1',
                badgeBg: '#D4F5F1', badgeText: '#1A9E8F',
                items: ['Coordinator nomination flow (in-app)', 'Student Pathways profile (extended passport)', 'Trade pro dashboard to review nominees', 'Introduction / match confirmation system', 'Messaging between student and trade pro'],
              },
              {
                title: 'Later (v2+)',
                badge: 'On the horizon',
                badgeBg: '#EDF2F7', badgeText: '#4A5568',
                items: ['Apprenticeship progress tracking', 'Trade pro ratings and reviews', 'Pathways alumni network', 'Partnership with community colleges', 'Employer verification badges'],
              },
            ].map(({ title, badge, badgeBg, badgeText, items }) => (
              <div key={title} className="rounded-xl border-2 p-6" style={{ background: '#FFF8F0', borderColor: '#3D2B1F' }}>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <h3 className="section-heading text-xl">{title}</h3>
                  <span className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: badgeBg, color: badgeText }}>{badge}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#6B4226' }}>
                      <span style={{ color: '#A0644A', flexShrink: 0 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trade partner CTA */}
          <div className="mt-10 rounded-xl border-2 p-8 text-center" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
            <h2 className="font-serif font-black text-3xl" style={{ color: '#3D2B1F' }}>Want to be a Pathways trade partner?</h2>
            <p className="mt-3 text-base" style={{ color: '#6B4226' }}>
              If you&apos;re a local professional in any trade and you&apos;d like to be part of this program, we&apos;d love to hear from you.
            </p>
            <Link
              href="mailto:pathways@seniorcircle.app"
              className="inline-block mt-6 rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
              style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
            >
              Get in touch →
            </Link>
          </div>
        </PageShell>
      </section>
    </div>
  )
}
