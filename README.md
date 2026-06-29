# Sales Dashboard

A responsive analytics dashboard built with React, TypeScript, Vite, Tailwind CSS, and Recharts. It uses mock sales data to demonstrate KPI cards, time-series charts, product breakdowns, and a regional summary table.

Live demo: https://dashboard-six-topaz-bbw1tku351.vercel.app/

## Features

- **4 KPI cards** for total revenue, units sold, average conversion rate, and new customers
- **Date range filter** for switching between the last 30 days, 90 days, 6 months, or 12 months
- **Revenue line chart** with tooltip, legend, and responsive sizing
- **Units sold bar chart** with the same responsive chart layout
- **Product revenue pie chart** with percentage labels and colored slices
- **Regional breakdown table** for quick comparison
- **Fully responsive layout** for mobile, tablet, and desktop

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 3
- Recharts 3

## Project Structure

- `src/data/dashboardData.ts` — typed mock data and interfaces
- `src/components/Dashboard` — dashboard layout and filter logic
- `src/components/DateRangeFilter` — range selector UI
- `src/components/KPICard` — summary metric cards
- `src/components/RevenueLineChart` — revenue chart built with Recharts
- `src/components/SalesBarChart` — units sold bar chart
- `src/components/ProductPieChart` — product revenue pie chart

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — run TypeScript build and create a production bundle
- `npm run lint` — run ESLint across the project
- `npm run preview` — preview the production build locally

## Implementation Notes

- The dashboard uses **mock data only** and does not require an API to run.
- Filtering is done with plain JavaScript `Date` logic and memoised slices in the parent dashboard component.
- Recharts components are wrapped in containers with explicit heights so `ResponsiveContainer` renders correctly.
- The chart callbacks are typed to work with **Recharts v3** and avoid TypeScript build issues.
- The app is ready to swap mock data for a real API later by replacing the data source in `src/data/dashboardData.ts`.

## Deployment

This is a static Vite app, so deployment platforms like **Vercel**, **Netlify**, or **GitHub Pages** can serve the generated `dist/` folder.

1. Run `npm run build`
2. Deploy the `dist/` output directory
3. Set the build command to `npm run build`

## Notes

If you connect a real backend later, keep the current dashboard components and replace the mock data layer with API calls or server-side fetching.

