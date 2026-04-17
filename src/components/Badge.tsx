type BadgeColor = 'orange' | 'teal' | 'gold' | 'purple' | 'green' | 'slate'

const STYLES: Record<BadgeColor, { bg: string; text: string; border: string }> = {
  orange: { bg: '#FFE8D6', text: '#FF6B35', border: '#FF6B35' },
  teal:   { bg: '#D4F5F1', text: '#1A9E8F', border: '#1A9E8F' },
  gold:   { bg: '#FDD07A', text: '#6B4226', border: '#F4A832' },
  purple: { bg: '#EDE9FE', text: '#7C3AED', border: '#7C3AED' },
  green:  { bg: '#C6F6D5', text: '#38A169', border: '#38A169' },
  slate:  { bg: '#EDF2F7', text: '#4A5568', border: '#4A5568' },
}

interface BadgeProps {
  label: string
  color?: BadgeColor
  className?: string
}

export default function Badge({ label, color = 'orange', className = '' }: BadgeProps) {
  const s = STYLES[color]
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      {label}
    </span>
  )
}
