import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Generate deterministic-looking mock data
function generateTimeSeries(points = 30, base = 1000, variance = 200) {
  return Array.from({ length: points }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (points - i))
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(0, base + Math.sin(i * 0.4) * variance + (Math.random() - 0.3) * variance * 0.5 + i * (base * 0.01)),
      secondary: Math.max(0, base * 0.6 + Math.cos(i * 0.3) * variance * 0.7 + (Math.random() - 0.5) * variance * 0.3),
    }
  })
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-bright)',
      borderRadius: 6,
      padding: '8px 12px',
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-primary)',
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString(undefined, { maximumFractionDigits: 0 }) : p.value}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [data, setData] = useState([])
  const [barData, setBarData] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setData(generateTimeSeries(30, 4200, 800))
    setBarData([
      { name: 'Mon', queries: 840, errors: 12 },
      { name: 'Tue', queries: 1240, errors: 8 },
      { name: 'Wed', queries: 980, errors: 20 },
      { name: 'Thu', queries: 1560, errors: 5 },
      { name: 'Fri', queries: 1920, errors: 14 },
      { name: 'Sat', queries: 620, errors: 3 },
      { name: 'Sun', queries: 480, errors: 2 },
    ])
    setMounted(true)
  }, [])

  const pieData = [
    { name: 'AI Queries', value: 42 },
    { name: 'Analytics', value: 31 },
    { name: 'Exports', value: 16 },
    { name: 'Other', value: 11 },
  ]
  const PIE_COLORS = ['#00e5ff', '#ffb300', '#00e676', '#3d5a73']

  const stats = [
    { label: 'Active Users', value: '2,847', delta: '+12.4%', dir: 'up' },
    { label: 'AI Queries Today', value: '18,392', delta: '+8.1%', dir: 'up' },
    { label: 'Avg Response ms', value: '142', delta: '-23ms', dir: 'up' },
    { label: 'Uptime', value: '99.97%', delta: '+0.02%', dir: 'up' },
  ]

  return (
    <>
      <div className="page-header">
        <div className="page-title">System Overview</div>
        <div className="page-subtitle">// real-time · refreshed every 30s</div>
      </div>

      {/* Stats row */}
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="card">
            <div className="card-label">{s.label}</div>
            <div className="card-value">{s.value}</div>
            <div className={`card-delta ${s.dir}`}>↑ {s.delta}</div>
          </div>
        ))}
      </div>

      {/* Main chart + pie */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-title"><span className="card-title-dot"></span>Query Volume — 30 Days</div>
          {mounted && (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffb300" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ffb300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: '#3d5a73', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} interval={6} />
                <YAxis tick={{ fill: '#3d5a73', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Queries" stroke="#00e5ff" strokeWidth={2} fill="url(#cyanGrad)" />
                <Area type="monotone" dataKey="secondary" name="Sessions" stroke="#ffb300" strokeWidth={1.5} fill="url(#amberGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <div className="card-title"><span className="card-title-dot"></span>Usage Distribution</div>
          {mounted && (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} opacity={0.9} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {pieData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: PIE_COLORS[i], display: 'inline-block' }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="card">
        <div className="card-title"><span className="card-title-dot"></span>Weekly Query Distribution</div>
        {mounted && (
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={barData} barGap={4}>
              <XAxis dataKey="name" tick={{ fill: '#3d5a73', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#3d5a73', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="queries" name="Queries" fill="#00e5ff" opacity={0.8} radius={[3, 3, 0, 0]} />
              <Bar dataKey="errors" name="Errors" fill="#ff5252" opacity={0.7} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Activity feed */}
      <div style={{ height: 24 }} />
      <div className="card">
        <div className="card-title"><span className="card-title-dot"></span>Recent Activity</div>
        <table className="backlog-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>User</th>
              <th>Module</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {[
              { event: 'AI Summary generated', user: 'user_4821', module: 'AI Tools', status: 'success', time: '2m ago' },
              { event: 'Report exported (CSV)', user: 'user_2034', module: 'Analytics', status: 'success', time: '5m ago' },
              { event: 'Survey vote cast', user: 'user_9102', module: 'Survey', status: 'success', time: '11m ago' },
              { event: 'API rate limit hit', user: 'user_5678', module: 'API', status: 'warn', time: '18m ago' },
              { event: 'Dashboard viewed', user: 'user_3301', module: 'Dashboard', status: 'success', time: '22m ago' },
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{row.event}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{row.user}</td>
                <td><span className="tag">{row.module}</span></td>
                <td>
                  <span style={{ color: row.status === 'success' ? 'var(--green)' : 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                    ● {row.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
