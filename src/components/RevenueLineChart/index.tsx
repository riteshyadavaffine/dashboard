// ─── Revenue Line Chart ─────────────────────────────────────────────────────────
// Displays revenue (or any numeric field) over time using Recharts.

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface RevenueLineChartProps {
  data: Record<string, unknown>[]
  xKey: string
  yKey: string
  color?: string
  label?: string
}

const formatRevenue = (value: number) =>
  value >= 1_000 ? `$${(value / 1_000).toFixed(0)}k` : `$${value}`

export default function RevenueLineChart({
  data,
  xKey,
  yKey,
  color = '#3b82f6',
  label = 'Revenue',
}: RevenueLineChartProps) {
  return (
    /* Explicit height on the wrapper prevents Recharts ResponsiveContainer from collapsing to 0 */
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: '#64748b' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tickFormatter={formatRevenue}
            tick={{ fontSize: 12, fill: '#64748b' }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, label]}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 13 }}
          />
          <Legend wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
          <Line
            type="monotone"
            dataKey={yKey}
            name={label}
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 4, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            isAnimationActive
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

