import { useState } from 'react'

// Backlog starts empty — gets populated each Friday with losing survey options
const BACKLOG = [
  // Example entries (will grow each week)
]

const DEPLOYED = [
  {
    id: 'init',
    title: 'Initial Platform Launch',
    description: 'Core dashboard, AI tools scaffold, analytics foundation, weekly survey system, and feature backlog tracker.',
    week: 'Week of Mar 1, 2026',
    votes: 'N/A',
    priority: 'high',
    status: 'deployed',
    tags: ['platform', 'core'],
  },
]

export default function BacklogPage() {
  const [filter, setFilter] = useState('all')

  return (
    <>
      <div className="page-header">
        <div className="page-title">Feature Backlog</div>
        <div className="page-subtitle">// runners-up from weekly surveys · {BACKLOG.length} pending items</div>
      </div>

      {/* Deployed */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)',
          letterSpacing: 1.2, textTransform: 'uppercase'
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
          Shipped Features
        </div>

        <div className="card">
          <table className="backlog-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Shipped</th>
                <th>Tags</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DEPLOYED.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{item.description}</div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11, whiteSpace: 'nowrap' }}>{item.week}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </td>
                  <td>
                    <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>● deployed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backlog */}
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)',
          letterSpacing: 1.2, textTransform: 'uppercase'
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
          Pending Backlog ({BACKLOG.length} items)
        </div>

        {BACKLOG.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Backlog is empty
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Runners-up from this Friday&apos;s survey will appear here
            </div>
          </div>
        ) : (
          <div className="card">
            <table className="backlog-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Suggested</th>
                  <th>Votes</th>
                  <th>Priority</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {BACKLOG.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{item.description}</div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11, whiteSpace: 'nowrap' }}>{item.week}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{item.votes}</td>
                    <td>
                      <span className={`priority-badge priority-${item.priority}`}>{item.priority}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 10 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          <strong style={{ color: 'var(--cyan)' }}>How features enter the backlog:</strong> Each week, 4 enhancement options are presented in the survey.
          The most-voted option gets built and deployed the following Friday. The remaining 3 options are added here as backlog items,
          tagged with vote counts and week. High-vote items may resurface in future surveys.
        </div>
      </div>
    </>
  )
}
