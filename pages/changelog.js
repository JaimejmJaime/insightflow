// Changelog — auto-updated every Friday deployment

const CHANGELOG = [
  {
    version: 'v0.1.0',
    date: 'March 1, 2026',
    type: 'launch',
    title: 'Initial Platform Launch 🚀',
    items: [
      'Core dashboard with real-time stats, area charts, and activity feed',
      'Analytics page with 30-day trend explorer across key metrics',
      'AI Tools page with Data Summarizer and NL→SQL tools',
      'Weekly Enhancement Survey system — vote on what gets built next',
      'Feature Backlog tracker — runners-up saved for future sprints',
      'Changelog page — transparent record of every deployment',
      'Dark data-terminal aesthetic with Space Mono + Syne typography',
      'Responsive layout with collapsible sidebar on mobile',
    ],
    survey_winner: null,
    backlog_added: [],
  },
]

const TYPE_STYLES = {
  launch: { color: '#00e5ff', label: 'LAUNCH' },
  feature: { color: '#00e676', label: 'FEATURE' },
  fix: { color: '#ffb300', label: 'FIX' },
  improvement: { color: '#7c83fd', label: 'IMPROVEMENT' },
}

export default function ChangelogPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Changelog</div>
        <div className="page-subtitle">// deployed every Friday · community-driven</div>
      </div>

      <div style={{ maxWidth: 720, position: 'relative' }}>
        {/* Vertical timeline line */}
        <div style={{
          position: 'absolute',
          left: 0, top: 8, bottom: 8, width: 1,
          background: 'linear-gradient(180deg, var(--cyan), var(--border))',
          opacity: 0.4,
        }} />

        {CHANGELOG.map((release, i) => {
          const typeStyle = TYPE_STYLES[release.type] || TYPE_STYLES.feature
          return (
            <div key={release.version} style={{ paddingLeft: 32, paddingBottom: 36, position: 'relative' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -5, top: 4,
                width: 10, height: 10, borderRadius: '50%',
                background: typeStyle.color,
                boxShadow: `0 0 8px ${typeStyle.color}`,
              }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: typeStyle.color, letterSpacing: 1.2,
                  background: `${typeStyle.color}20`,
                  padding: '2px 8px', borderRadius: 4,
                }}>
                  {typeStyle.label}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                  {release.version}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                  · {release.date}
                </span>
              </div>

              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
                {release.title}
              </div>

              <div className="card">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {release.items.map((item, j) => (
                    <li key={j} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '7px 0', borderBottom: j < release.items.length - 1 ? '1px solid var(--border)' : 'none',
                      fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5,
                    }}>
                      <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 2 }}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {release.survey_winner && (
                  <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(0,229,255,0.06)', borderRadius: 6, border: '1px solid rgba(0,229,255,0.15)' }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>
                      🗳 Survey winner: <strong>{release.survey_winner}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Future dot */}
        <div style={{ paddingLeft: 32, paddingBottom: 8, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: -5, top: 4,
            width: 10, height: 10, borderRadius: '50%',
            border: '2px solid var(--border-bright)',
          }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
            v0.2.0 · Friday, Mar 6, 2026
            <span style={{ marginLeft: 10, color: 'var(--cyan)', opacity: 0.6 }}>← survey winner ships here</span>
          </div>
        </div>
      </div>
    </>
  )
}
