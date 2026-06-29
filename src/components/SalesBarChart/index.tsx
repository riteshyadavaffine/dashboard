// ─── Sales Bar Chart ────────────────────────────────────────────────────────────
// Displays units sold per month as a vertical bar chart.

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface SalesBarChartProps {
  data: Record<string, unknown>[]
  xKey: string
  yKey: string
  color?: string
  label?: string
}

export default function SalesBarChart({
  data,
  xKey,
  yKey,
  color = '#8b5cf6',
  label = 'Units Sold',
}: SalesBarChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), label]}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 13 }}
            cursor={{ fill: '#f1f5f9' }}
          />
          <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
          <Bar
            dataKey={yKey}
            name={label}
            fill={color}
            radius={[4, 4, 0, 0]}
            isAnimationActive
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

