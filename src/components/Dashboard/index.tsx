// ─── Dashboard ──────────────────────────────────────────────────────────────────
// Composes KPI cards, charts, and the date-range filter.
// Filtering is done with plain JS Date objects — no external date library.

import { useState, useMemo } from 'react'
import { monthlyData, topProducts } from '../../data/dashboardData'
import type { MonthlySalesData } from '../../data/dashboardData'
import DateRangeFilter from '../DateRangeFilter'
import type { DateRange } from '../DateRangeFilter'
import KPICard from '../KPICard'
import RevenueLineChart from '../RevenueLineChart'
import SalesBarChart from '../SalesBarChart'
import ProductPieChart from '../ProductPieChart'

// ─── Helpers ────────────────────────────────────────────────────────────────────

/** Slice the last `n` items from the sorted monthly array */
function sliceMonths(data: MonthlySalesData[], n: number): MonthlySalesData[] {
  return data.slice(-n)
}

/** Aggregate key metrics across a slice of months */
function aggregate(slice: MonthlySalesData[]) {
  const totalRevenue     = slice.reduce((s, m) => s + m.revenue,        0)
  const totalUnits       = slice.reduce((s, m) => s + m.unitsSold,      0)
  const avgConversion    = slice.length
    ? slice.reduce((s, m) => s + m.conversionRate, 0) / slice.length
    : 0
  const totalNewCustomers = slice.reduce((s, m) => s + m.newCustomers,  0)
  return { totalRevenue, totalUnits, avgConversion, totalNewCustomers }
}

/** Percentage change: (current - previous) / previous * 100 */
function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

/** Format a revenue number as a readable string */
function fmtRevenue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000)     return `${(value / 1_000).toFixed(1)}k`
  return String(value)
}

// ─── Component ──────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [range, setRange] = useState<DateRange>('6')

  const n = Number(range) // months in the selected window

  /** Current period slice — memoised to avoid recomputing on every render */
  const currentSlice = useMemo(() => sliceMonths(monthlyData, n), [n])

  /** Previous period slice of the same length (for change calculation) */
  const previousSlice = useMemo(
    () => sliceMonths(monthlyData.slice(0, monthlyData.length - n), n),
    [n],
  )

  const current  = useMemo(() => aggregate(currentSlice),  [currentSlice])
  const previous = useMemo(() => aggregate(previousSlice), [previousSlice])

  // Chart data: use short label (e.g. "Jul") for x-axis readability when many months are shown
  const chartData = useMemo(
    () => currentSlice.map(m => ({ ...m, label: m.label.split(' ')[0] })),
    [currentSlice],
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>📊</span> Sales Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Jul 2025 – Jun 2026 · mock data
            </p>
          </div>
          <DateRangeFilter value={range} onChange={setRange} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Row 1: KPI Cards ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard
            title="Total Revenue"
            value={fmtRevenue(current.totalRevenue)}
            change={pctChange(current.totalRevenue, previous.totalRevenue)}
            icon="💰"
            prefix="$"
          />
          <KPICard
            title="Units Sold"
            value={current.totalUnits.toLocaleString()}
            change={pctChange(current.totalUnits, previous.totalUnits)}
            icon="📦"
          />
          <KPICard
            title="Avg. Conversion"
            value={current.avgConversion.toFixed(1)}
            change={pctChange(current.avgConversion, previous.avgConversion)}
            icon="🎯"
            suffix="%"
          />
          <KPICard
            title="New Customers"
            value={current.totalNewCustomers.toLocaleString()}
            change={pctChange(current.totalNewCustomers, previous.totalNewCustomers)}
            icon="👥"
          />
        </section>

        {/* ── Row 2: Revenue Line Chart (full width) ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-semibold text-slate-700 mb-4">Revenue Over Time</h2>
          <RevenueLineChart
            data={chartData as Record<string, unknown>[]}
            xKey="label"
            yKey="revenue"
            color="#3b82f6"
            label="Revenue"
          />
        </section>

        {/* ── Row 3: Bar chart (60%) + Pie chart (40%) ── */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Bar chart – 60% */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-semibold text-slate-700 mb-4">Units Sold by Month</h2>
            <SalesBarChart
              data={chartData as Record<string, unknown>[]}
              xKey="label"
              yKey="unitsSold"
              color="#8b5cf6"
              label="Units Sold"
            />
          </div>

          {/* Pie chart – 40% */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-semibold text-slate-700 mb-4">Revenue by Product</h2>
            <ProductPieChart data={topProducts} />
          </div>

        </section>

        {/* ── Row 4: Regional breakdown table ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-semibold text-slate-700 mb-4">Regional Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 text-slate-500 font-medium w-1/3">Region</th>
                  <th className="pb-2 text-slate-500 font-medium text-right">Revenue</th>
                  <th className="pb-2 text-slate-500 font-medium text-right">Units Sold</th>
                  <th className="pb-2 text-slate-500 font-medium text-right">Share</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { region: 'East',  revenue: 726_000, unitsSold: 6_300 },
                  { region: 'North', revenue: 605_000, unitsSold: 5_250 },
                  { region: 'West',  revenue: 605_000, unitsSold: 5_250 },
                  { region: 'South', revenue: 484_000, unitsSold: 4_200 },
                ].map(row => {
                  const share = ((row.revenue / 2_420_000) * 100).toFixed(1)
                  return (
                    <tr key={row.region} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 font-medium text-slate-700">{row.region}</td>
                      <td className="py-2.5 text-right text-slate-600">${row.revenue.toLocaleString()}</td>
                      <td className="py-2.5 text-right text-slate-600">{row.unitsSold.toLocaleString()}</td>
                      <td className="py-2.5 text-right">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="inline-block h-1.5 rounded-full bg-blue-500"
                            style={{ width: `${share}%`, maxWidth: 80, minWidth: 16 }}
                          />
                          <span className="text-slate-500">{share}%</span>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <footer className="text-center text-xs text-slate-400 py-6">
        Sales Dashboard · Mock data · {new Date().getFullYear()}
      </footer>
    </div>
  )
}

