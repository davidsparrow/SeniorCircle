import Link from 'next/link'
import { Sparkles, CheckCircle } from 'lucide-react'
import PageShell from '@/components/PageShell'
import CategoryIcon from '@/components/CategoryIcon'
import { mockTasks, mockTradeProfs, CATEGORIES } from '@/lib/mockData'

const CATEGORY_COLORS: Record<string, string> = {
  'Memoir Project': '#D4F5F1',
  'Companionship':  '#D4F5F1',
  'Reading Aloud':  '#D4F5F1',
  'Yardwork':       '#FFE8D6',
  'Cooking':        '#FFE8D6',
  'Pet Care':       '#FFE8D6',
  'Organizing':     '#FDD07A',
  'Errands':        '#FDD07A',
  'Tech Help':      '#EDE9FE',
  'Arts & Crafts':  '#EDE9FE',
}
const CATEGORY_TEXT: Record<string, string> = {
  'Memoir Project': '#1A9E8F',
  'Companionship':  '#1A9E8F',
  'Reading Aloud':  '#1A9E8F',
  'Yardwork':       '#FF6B35',
  'Cooking':        '#FF6B35',
  'Pet Care':       '#FF6B35',
  'Organizing':     '#6B4226',
  'Errands':        '#6B4226',
  'Tech Help':      '#7C3AED',
  'Arts & Crafts':  '#7C3AED',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const openTasks = mockTasks.filter((t) => t.status === 'open').slice(0, 3)

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: '#FFF8F0' }}>
        <PageShell>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8 lg:py-16">
            {/* Left */}
            <div>
              <p className="label-caps">Connecting generations · San Gabriel Valley</p>
              <h1 className="display-heading mt-3 text-5xl sm:text-6xl">
                Your neighborhood.<br />Your neighbors.<br />A little help.
              </h1>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: '#6B4226' }}>
                SeniorCircle connects seniors who need a hand around the house with high school students who need community service hours. Real help. Real connections.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/seniors"
                  className="rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                  style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
                >
                  I need some help
                </Link>
                <Link
                  href="/students"
                  className="rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#FFF3E4]"
                  style={{ background: '#FFF8F0', color: '#3D2B1F', borderColor: '#3D2B1F' }}
                >
                  I want to volunteer
                </Link>
              </div>
            </div>

            {/* Right — decorative task cards */}
            <div className="hidden lg:flex flex-col gap-3 relative">
              {[
                { category: 'Memoir Project', title: 'Help me start writing my memoirs', senior: 'Eleanor Voss', location: 'Pasadena, CA' },
                { category: 'Yardwork', title: 'Back garden tidy and hedge trim', senior: 'George Adeyemi', location: 'Arcadia, CA' },
                { category: 'Cooking', title: 'Cook a simple weekday dinner', senior: 'Harold Chen', location: 'Arcadia, CA' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl border-2 p-4 transition-transform"
                  style={{
                    background: '#FFF3E4',
                    borderColor: '#3D2B1F',
                    marginLeft: i * 16,
                  }}
                >
                  <span
                    className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2"
                    style={{
                      background: CATEGORY_COLORS[card.category] ?? '#FFE8D6',
                      color: CATEGORY_TEXT[card.category] ?? '#FF6B35',
                      borderColor: CATEGORY_TEXT[card.category] ?? '#FF6B35',
                    }}
                  >
                    <CategoryIcon category={card.category} />
                    {card.category}
                  </span>
                  <p className="font-serif font-bold text-base" style={{ color: '#3D2B1F' }}>{card.title}</p>
                  <p className="text-xs mt-1" style={{ color: '#A0644A' }}>{card.senior} · {card.location}</p>
                </div>
              ))}
            </div>
          </div>
        </PageShell>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: '#FFF3E4', borderTop: '2px solid #3D2B1F', borderBottom: '2px solid #3D2B1F' }}>
        <PageShell>
          <h2 className="section-heading text-4xl mb-10">Simple for everyone.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: '1',
                heading: 'Seniors post tasks',
                body: 'Describe what you need, set a date, and wait for a match. Every task is reviewed and every student is verified by their school.',
              },
              {
                n: '2',
                heading: 'Students apply',
                body: 'Browse open tasks nearby, apply with a short note, and get matched by their school coordinator who knows their skills.',
              },
              {
                n: '3',
                heading: 'Everyone wins',
                body: 'Seniors get real, trusted help. Students earn verified service hours and a credential that stands out on college applications.',
              },
            ].map(({ n, heading, body }) => (
              <div key={n} className="rounded-xl border-2 p-8" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
                <p className="font-serif font-black text-5xl" style={{ color: '#FF6B35' }}>{n}</p>
                <h3 className="section-heading text-xl mt-3">{heading}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#6B4226' }}>{body}</p>
              </div>
            ))}
          </div>
        </PageShell>
      </section>

      {/* ── CATEGORY STRIP ── */}
      <section style={{ background: '#FFF3E4', borderBottom: '2px solid #3D2B1F' }}>
        <PageShell>
          <h2 className="section-heading text-2xl mb-6">What kind of help can seniors post?</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="flex-shrink-0 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium"
                style={{ borderColor: '#FF6B35', color: '#FF6B35', background: '#FFF8F0' }}
              >
                <CategoryIcon category={cat} />
                {cat}
              </span>
            ))}
          </div>
        </PageShell>
      </section>

      {/* ── FEATURED TASKS ── */}
      <section style={{ background: '#FFF8F0' }}>
        <PageShell>
          <h2 className="section-heading text-3xl mb-8">Open tasks near you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {openTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border-2 p-5 flex flex-col hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#3D2B1F] transition-all duration-150"
                style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}
              >
                <span
                  className="self-start flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3"
                  style={{
                    background: CATEGORY_COLORS[task.category] ?? '#FFE8D6',
                    color: CATEGORY_TEXT[task.category] ?? '#FF6B35',
                    borderColor: CATEGORY_TEXT[task.category] ?? '#FF6B35',
                  }}
                >
                  <CategoryIcon category={task.category} />
                  {task.category}
                </span>
                <h3 className="font-serif font-bold text-lg leading-snug flex-1" style={{ color: '#3D2B1F' }}>{task.title}</h3>
                <p className="text-sm mt-1" style={{ color: '#A0644A' }}>{task.seniorName} · {task.location}</p>
                <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: '#4A5568' }}>
                  <span>{task.duration}h</span>
                  <span>·</span>
                  <span>{formatDate(task.date)}</span>
                </div>
                <Link
                  href={`/students/${task.id}`}
                  className="mt-4 self-start rounded-lg border-2 px-4 py-1.5 text-xs font-semibold transition-colors hover:bg-[#FFE8D6]"
                  style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
                >
                  See details →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/students" className="text-sm font-semibold" style={{ color: '#FF6B35' }}>
              Browse all open tasks →
            </Link>
          </div>
        </PageShell>
      </section>

      {/* ── FOR SCHOOLS CTA ── */}
      <section style={{ background: '#FFF3E4', borderTop: '2px solid #3D2B1F', borderBottom: '2px solid #3D2B1F' }}>
        <PageShell>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-caps" style={{ color: '#7C3AED' }}>For school administrators</p>
              <h2 className="section-heading text-3xl mt-2">Are you a school administrator?</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: '#6B4226' }}>
                School coordinators get a dedicated dashboard to match students to tasks, track verified service hours, and generate official transcripts for college applications.
              </p>
              <Link
                href="/coordinator"
                className="inline-block mt-6 rounded-lg border-2 px-6 py-2.5 text-sm font-semibold transition-colors hover:opacity-90"
                style={{ background: '#7C3AED', color: 'white', borderColor: '#3D2B1F' }}
              >
                Set up your school →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { stat: '40+', label: 'Tasks posted this month' },
                { stat: '12', label: 'Schools enrolled' },
                { stat: '3,200+', label: 'Hours logged' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="font-serif font-black text-5xl" style={{ color: '#FF6B35' }}>{stat}</p>
                  <p className="mt-1 text-xs leading-tight" style={{ color: '#A0644A' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </PageShell>
      </section>

      {/* ── PATHWAYS BAND ── */}
      <section style={{ background: '#FDD07A', borderTop: '2px solid #3D2B1F', borderBottom: '2px solid #3D2B1F' }}>
        <PageShell>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="label-caps flex items-center gap-1.5" style={{ color: '#6B4226' }}>
                <Sparkles size={13} /> Coming for graduating seniors
              </p>
              <h2 className="font-serif font-black text-4xl mt-3 leading-tight" style={{ color: '#3D2B1F', letterSpacing: '-0.02em' }}>
                From service hours<br />to skilled careers.
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#3D2B1F' }}>
                Some students who volunteer through SeniorCircle discover a real passion — for cooking, for organizing, for telling someone&apos;s story.{' '}
                <strong>SeniorCircle Pathways</strong> connects these standout graduating seniors with local trade professionals who are looking for motivated apprentices. No degree required. Just demonstrated grit and a skill that shines.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/pathways"
                  className="rounded-lg border-2 px-5 py-2 text-sm font-semibold transition-colors hover:bg-[#FFF3E4]"
                  style={{ borderColor: '#3D2B1F', color: '#3D2B1F' }}
                >
                  Learn about Pathways →
                </Link>
                <p className="text-xs" style={{ color: '#6B4226' }}>
                  For coordinators: flag your graduating seniors who are ready for the next step.
                </p>
              </div>
            </div>

            {/* Trade prof mini cards */}
            <div className="flex flex-col gap-3">
              {mockTradeProfs.slice(0, 3).map((tp) => (
                <div key={tp.id} className="rounded-xl border-2 p-4 flex items-start gap-3" style={{ background: '#FFF3E4', borderColor: '#3D2B1F' }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: '#FF6B35' }}>
                    <CategoryIcon category={
                      tp.trade.includes('Landscape') ? 'Yardwork' :
                      tp.trade.includes('Culinary') ? 'Cooking' :
                      tp.trade.includes('Organizing') ? 'Organizing' : 'Memoir Project'
                    } size={20} />
                  </span>
                  <div>
                    <p className="font-serif font-bold text-sm" style={{ color: '#3D2B1F' }}>{tp.trade}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6B4226' }}>{tp.name} · {tp.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageShell>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: '#3D2B1F' }}>
        <PageShell>
          <div className="text-center py-8">
            <h2 className="font-serif font-black text-4xl" style={{ color: '#FFF8F0' }}>
              Ready to make a difference?
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/seniors/post-task"
                className="rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                style={{ background: '#FF6B35', color: 'white', borderColor: '#FFF8F0' }}
              >
                Post your first task
              </Link>
              <Link
                href="/students"
                className="rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#6B4226]"
                style={{ background: 'transparent', color: '#FFF8F0', borderColor: '#FFF8F0' }}
              >
                Browse open tasks
              </Link>
            </div>
          </div>
        </PageShell>
      </section>
    </div>
  )
}
