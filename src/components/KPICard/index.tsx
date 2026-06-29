// ─── KPI Card ───────────────────────────────────────────────────────────────────

interface KPICardProps {
  title: string
  value: string
  change: number        // percentage change vs previous period
  icon: string          // emoji / unicode icon
  prefix?: string
  suffix?: string
}

export default function KPICard({ title, value, change, icon, prefix = '', suffix = '' }: KPICardProps) {
  const isPositive = change >= 0
  const arrow = isPositive ? '▲' : '▼'
  const changeColor = isPositive ? 'text-emerald-600' : 'text-red-500'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-slate-800">
        {prefix}{value}{suffix}
      </div>

      {/* Change vs previous period */}
      <div className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}>
        <span>{arrow}</span>
        <span>{Math.abs(change).toFixed(1)}% vs prev. period</span>
      </div>
    </div>
  )
}

