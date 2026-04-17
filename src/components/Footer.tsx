import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t-2" style={{ background: '#3D2B1F', borderColor: '#3D2B1F', color: '#FFF8F0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif font-black text-xl" style={{ letterSpacing: '-0.02em' }}>
              SeniorCircle
              <span className="inline-block w-2 h-2 rounded-full ml-1 mb-0.5" style={{ background: '#FF6B35' }} />
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: '#A0644A' }}>
              Connecting seniors who need a hand with high school students who need community service hours. San Gabriel Valley, CA.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#A0644A' }}>Quick links</p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/seniors', label: 'For Seniors' },
                { href: '/seniors/post-task', label: 'Post a Task' },
                { href: '/students', label: 'For Students' },
                { href: '/coordinator', label: 'School Coordinators' },
                { href: '/pathways', label: 'Pathways ✦' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: '#A0644A' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#A0644A' }}>Contact</p>
            <p className="text-sm leading-relaxed" style={{ color: '#A0644A' }}>
              Questions about SeniorCircle?<br />
              Email us at{' '}
              <a href="mailto:hello@seniorcircle.app" className="hover:text-white transition-colors" style={{ color: '#FF6B35' }}>
                hello@seniorcircle.app
              </a>
            </p>
            <p className="mt-4 text-sm" style={{ color: '#A0644A' }}>
              For Pathways partnerships:{' '}
              <a href="mailto:pathways@seniorcircle.app" className="hover:text-white transition-colors" style={{ color: '#F4A832' }}>
                pathways@seniorcircle.app
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderColor: '#6B4226' }}>
          <p className="text-xs" style={{ color: '#6B4226' }}>© 2026 SeniorCircle. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#6B4226' }}>San Gabriel Valley, California</p>
        </div>
      </div>
    </footer>
  )
}
