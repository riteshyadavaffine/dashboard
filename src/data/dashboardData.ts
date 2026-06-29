// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface MonthlySalesData {
  /** ISO year-month key, e.g. "2025-07" */
  month: string
  /** Human-readable label, e.g. "Jul 2025" */
  label: string
  revenue: number
  unitsSold: number
  /** Percentage, e.g. 3.2 = 3.2 % */
  conversionRate: number
  newCustomers: number
  returningCustomers: number
}

export interface ProductSalesData {
  name: string
  revenue: number
  units: number
  /** Tailwind / hex colour used in the pie chart */
  fill: string
}

export interface RegionalData {
  region: string
  revenue: number
  unitsSold: number
}

export interface DashboardData {
  monthly: MonthlySalesData[]
  topProducts: ProductSalesData[]
  regional: RegionalData[]
}

// ─── Mock Data ──────────────────────────────────────────────────────────────────

/**
 * 12 months of realistic sales data (Jul 2025 – Jun 2026).
 * Numbers include natural seasonal variance:
 *   • Q4 spike for holiday season
 *   • Jan dip / post-holiday correction
 *   • Steady upward trend through H1 2026
 */
export const monthlyData: MonthlySalesData[] = [
  {
    month: '2025-07',
    label: 'Jul 2025',
    revenue: 142_500,
    unitsSold: 1_240,
    conversionRate: 3.2,
    newCustomers: 312,
    returningCustomers: 928,
  },
  {
    month: '2025-08',
    label: 'Aug 2025',
    revenue: 158_900,
    unitsSold: 1_380,
    conversionRate: 3.5,
    newCustomers: 345,
    returningCustomers: 1_035,
  },
  {
    month: '2025-09',
    label: 'Sep 2025',
    revenue: 167_300,
    unitsSold: 1_450,
    conversionRate: 3.7,
    newCustomers: 380,
    returningCustomers: 1_070,
  },
  {
    month: '2025-10',
    label: 'Oct 2025',
    revenue: 189_200,
    unitsSold: 1_620,
    conversionRate: 4.1,
    newCustomers: 420,
    returningCustomers: 1_200,
  },
  {
    month: '2025-11',
    label: 'Nov 2025',
    revenue: 234_700,
    unitsSold: 2_100,
    conversionRate: 4.8,
    newCustomers: 580,
    returningCustomers: 1_520,
  },
  {
    month: '2025-12',
    label: 'Dec 2025',
    revenue: 312_400,
    unitsSold: 2_890,
    conversionRate: 5.6,
    newCustomers: 720,
    returningCustomers: 2_170,
  },
  {
    month: '2026-01',
    label: 'Jan 2026',
    revenue: 178_600,
    unitsSold: 1_560,
    conversionRate: 3.9,
    newCustomers: 390,
    returningCustomers: 1_170,
  },
  {
    month: '2026-02',
    label: 'Feb 2026',
    revenue: 165_200,
    unitsSold: 1_420,
    conversionRate: 3.6,
    newCustomers: 355,
    returningCustomers: 1_065,
  },
  {
    month: '2026-03',
    label: 'Mar 2026',
    revenue: 195_800,
    unitsSold: 1_710,
    conversionRate: 4.2,
    newCustomers: 445,
    returningCustomers: 1_265,
  },
  {
    month: '2026-04',
    label: 'Apr 2026',
    revenue: 208_400,
    unitsSold: 1_830,
    conversionRate: 4.4,
    newCustomers: 468,
    returningCustomers: 1_362,
  },
  {
    month: '2026-05',
    label: 'May 2026',
    revenue: 221_700,
    unitsSold: 1_950,
    conversionRate: 4.6,
    newCustomers: 510,
    returningCustomers: 1_440,
  },
  {
    month: '2026-06',
    label: 'Jun 2026',
    revenue: 245_300,
    unitsSold: 2_100,
    conversionRate: 4.9,
    newCustomers: 545,
    returningCustomers: 1_555,
  },
]

export const topProducts: ProductSalesData[] = [
  { name: 'Pro Headphones',  revenue: 726_000, units: 4_840, fill: '#3b82f6' },
  { name: 'Smart Speaker',   revenue: 605_000, units: 6_050, fill: '#8b5cf6' },
  { name: 'Wireless Charger',revenue: 484_000, units: 9_680, fill: '#10b981' },
  { name: 'USB-C Hub',       revenue: 363_000, units: 7_260, fill: '#f59e0b' },
  { name: 'Laptop Stand',    revenue: 242_000, units: 4_840, fill: '#ef4444' },
]

export const regionalData: RegionalData[] = [
  { region: 'East',  revenue: 726_000, unitsSold: 6_300 },
  { region: 'North', revenue: 605_000, unitsSold: 5_250 },
  { region: 'West',  revenue: 605_000, unitsSold: 5_250 },
  { region: 'South', revenue: 484_000, unitsSold: 4_200 },
]

export const dashboardData: DashboardData = {
  monthly: monthlyData,
  topProducts,
  regional: regionalData,
}

