// ─── Product Pie Chart ──────────────────────────────────────────────────────────
// Shows revenue share by product using a Recharts PieChart.

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import type { ProductSalesData } from '../../data/dashboardData'

interface ProductPieChartProps {
  data: ProductSalesData[]
}

const formatRevenue = (value: number) =>
  `$${(value / 1_000).toFixed(0)}k`

export default function ProductPieChart({ data }: ProductPieChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="revenue"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={80}
            isAnimationActive
            animationDuration={800}
            label={({ percent }: { percent: number }) =>
              `${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatRevenue(value), 'Revenue']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 13 }}
          />
          <Legend
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

