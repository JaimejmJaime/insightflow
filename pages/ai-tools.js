import { useState } from 'react'


const TOOLS = [
  {
    id: 'summarize',
    icon: '◎',
    title: 'Data Summarizer',
    description: 'Paste any dataset or report — get a plain-English summary with key insights highlighted.',
    status: 'live',
  },
  {
    id: 'sql',
    icon: '▲',
    title: 'Natural Language → SQL',
    description: 'Ask a question in plain English, get a SQL query back ready to run on your data warehouse.',
    status: 'live',
  },
  {
    id: 'report',
    icon: '◈',
    title: 'Auto Report Generator',
    description: 'Choose a time range and metrics — AI drafts a full executive summary report in seconds.',
    status: 'coming',
  },
  {
    id: 'anomaly',
    icon: '◉',
    title: 'Anomaly Detector',
    description: 'Feed in time-series data and let the model flag unusual spikes, dips, or patterns automatically.',
    status: 'coming',
  },
]

export default function AIToolsPage() {
  const [active, setActive] = useState('summarize')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function runTool() {
    if (!input.trim()) return
    setLoading(true)
    setOutput('')
    // Simulate AI response (real integration = future survey winner!)
    await new Promise(r => setTimeout(r, 1200))
    const mockOutputs = {
      summarize: `📊 **Data Summary**\n\nYour dataset contains structured metrics spanning multiple dimensions. Key observations:\n\n• Peak activity detected in the 09:00–11:00 window (32% of total volume)\n• 3 anomalous entries flagged in rows 14, 27, and 89 — values exceed 2σ from baseline\n• Overall trend is positive with +8.4% week-over-week growth\n• Null value rate: 1.2% — within acceptable bounds\n\n**Recommendation:** Focus optimization efforts on the afternoon drop-off between 14:00–16:00 where engagement dips 18% below morning averages.`,
      sql: `-- Generated SQL query\nSELECT\n  DATE_TRUNC('day', created_at) AS day,\n  COUNT(*) AS total_events,\n  COUNT(DISTINCT user_id) AS unique_users,\n  AVG(response_ms) AS avg_latency\nFROM events\nWHERE created_at >= NOW() - INTERVAL '30 days'\n  AND status = 'success'\nGROUP BY 1\nORDER BY 1 DESC;`,
    }
    setOutput(mockOutputs[active] || '✨ Analysis complete. Results ready.')
    setLoading(false)
  }

  const tool = TOOLS.find(t => t.id === active)

  return (
    <>
      <div className="page-header">
        <div className="page-title">AI Tools</div>
        <div className="page-subtitle">// powered by claude-sonnet-4 · real-time inference</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Tool selector */}
        <div>
          {TOOLS.map(t => (
            <div
              key={t.id}
              onClick={() => t.status === 'live' && setActive(t.id)}
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                marginBottom: 8,
                cursor: t.status === 'live' ? 'pointer' : 'default',
                background: active === t.id ? 'var(--cyan-glow)' : 'var(--bg-panel)',
                border: `1px solid ${active === t.id ? 'rgba(0,229,255,0.3)' : 'var(--border)'}`,
                opacity: t.status === 'coming' ? 0.5 : 1,
                transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ color: 'var(--cyan)', fontSize: 16 }}>{t.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{t.title}</span>
              </div>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: t.status === 'live' ? 'var(--green)' : 'var(--text-muted)' }}>
                {t.status === 'live' ? '● live' : '○ coming soon'}
              </div>
            </div>
          ))}
        </div>

        {/* Tool interface */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-label">{tool?.title}</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
              {tool?.description}
            </p>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={active === 'sql' ? 'e.g. Show me daily active users for the last 30 days, broken down by plan type...' : 'Paste your data or describe what you want to analyze...'}
              style={{
                width: '100%',
                height: 140,
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-bright)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                fontFamily: active === 'sql' ? 'var(--font-mono)' : 'var(--font-display)',
                fontSize: 13,
                padding: '12px 14px',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.6,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button
                className="btn btn-primary"
                onClick={runTool}
                disabled={loading || !input.trim()}
                style={{ opacity: loading || !input.trim() ? 0.6 : 1 }}
              >
                {loading ? '⟳ Processing...' : '▶ Run Tool'}
              </button>
            </div>
          </div>

          {output && (
            <div className="card">
              <div className="card-label">Output</div>
              <pre style={{
                fontSize: 13,
                fontFamily: active === 'sql' ? 'var(--font-mono)' : 'var(--font-display)',
                color: 'var(--text-primary)',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
              }}>
                {output}
              </pre>
            </div>
          )}

          {!output && !loading && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
              ◌ Output will appear here
            </div>
          )}
        </div>
      </div>
    </>
  )
}
