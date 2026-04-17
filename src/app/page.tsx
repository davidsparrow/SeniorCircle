export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#A0644A' }}>
        Connecting generations · San Gabriel Valley
      </p>
      <h1
        className="font-serif text-5xl font-black mt-3 leading-tight"
        style={{ color: '#3D2B1F', letterSpacing: '-0.02em' }}
      >
        Your neighborhood.<br />Your neighbors.<br />A little help.
      </h1>
      <p className="mt-6 text-lg" style={{ color: '#6B4226' }}>
        SeniorCircle connects seniors who need a hand around the house with high school
        students who need community service hours. Real help. Real connections.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/seniors"
          className="rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
          style={{ background: '#FF6B35', color: 'white', borderColor: '#3D2B1F' }}
        >
          I need some help
        </a>
        <a
          href="/students"
          className="rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#FFF3E4]"
          style={{ background: '#FFF8F0', color: '#3D2B1F', borderColor: '#3D2B1F' }}
        >
          I want to volunteer
        </a>
      </div>
      <p className="mt-12 text-xs" style={{ color: '#A0644A' }}>
        Full landing page — built in Prompt 2.
      </p>
    </div>
  )
}
