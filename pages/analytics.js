import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-bright)',
      borderRadius: 6, padding: '8px 12px', fontSize: 12, fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {Number(p.value).toLocaleString()}</div>
      ))}
    </div>
  )
}

function makeData(days, base, variance) {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (days - i))
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(0, Math.round(base + Math.sin(i * 0.5) * variance + (i * base * 0.008))),
    }
  })
}

const METRICS = [
  { key: 'users', label: 'Active Users', base: 2200, variance: 400, color: '#00e5ff', current: '2,847', delta: '+12.4%' },
  { key: 'queries', label: 'AI Queries', base: 15000, variance: 3000, color: '#ffb300', current: '18,392', delta: '+8.1%' },
  { key: 'latency', label: 'Avg Latency (ms)', base: 160, variance: 30, color: '#00e676', current: '142ms', delta: '-13%' },
]

export default function AnalyticsPage() {
  const [selected, setSelected] = useState('users')
  const [chartData, setChartData] = useState({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const d = {}
    METRICS.forEach(m => { d[m.key] = makeData(30, m.base, m.variance) })
    setChartData(d)
    setMounted(true)
  }, [])

  const metric = METRICS.find(m => m.key === selected)

  return (
    <>
      <div className="page-header">
        <div className="page-title">Analytics</div>
        <div className="page-subtitle">// 30-day rolling window · auto-refreshed</div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {METRICS.map(m => (
          <button
            key={m.key}
            className={`btn ${selected === m.key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setSelected(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {metric && (
        <>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 24 }}>
            <div className="card">
              <div className="card-label">Current</div>
              <div className="card-value" style={{ color: metric.color }}>{metric.current}</div>
              <div className="card-delta up">{metric.delta} vs last period</div>
            </div>
            <div className="card">
              <div className="card-label">30-Day Peak</div>
              <div className="card-value">{mounted && chartData[selected]
                ? Math.max(...chartData[selected].map(d => d.value)).toLocaleString()
                : '—'
              }</div>
            </div>
            <div className="card">
              <div className="card-label">30-Day Avg</div>
              <div className="card-value">{mounted && chartData[selected]
                ? Math.round(chartData[selected].reduce((a, b) => a + b.value, 0) / 30).toLocaleString()
                : '—'
              }</div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <span className="card-title-dot" style={{ background: metric.color }}></span>
              {metric.label} — 30 Day Trend
            </div>
            {mounted && chartData[selected] && (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData[selected]}>
                  <CartesianGrid stroke="rgba(30,45,69,0.6)" strokeDasharray="4 4" />
                  <XAxis dataKey="date" tick={{ fill: '#3d5a73', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} interval={4} />
                  <YAxis tick={{ fill: '#3d5a73', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" name={metric.label} stroke={metric.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: metric.color }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </>
  )
}
