// ─── Date Range Filter ──────────────────────────────────────────────────────────
// Options map to "number of months to show" from the most-recent data point.

export type DateRange = '1' | '3' | '6' | '12'

export const DATE_RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: '1',  label: 'Last 30 days'  },
  { value: '3',  label: 'Last 90 days'  },
  { value: '6',  label: 'Last 6 months' },
  { value: '12', label: 'Last 12 months'},
]

interface DateRangeFilterProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

export default function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {DATE_RANGE_OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${value === opt.value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

