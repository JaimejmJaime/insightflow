import { useState, useEffect } from 'react'

const SURVEY_KEY = 'insightflow_survey_v1'
const VOTED_KEY = 'insightflow_voted_v1'

// This week's survey options — updated every Friday deployment
const SURVEY = {
  week: 'Week of Mar 1, 2026',
  closes: 'Friday, Mar 6, 2026',
  options: [
    {
      id: 'a',
      title: 'AI Chat Assistant',
      description: 'Add a conversational AI assistant that can answer questions about your data, generate reports, and suggest insights directly from the dashboard.',
      emoji: '🤖',
    },
    {
      id: 'b',
      title: 'Custom Alert Rules',
      description: 'Set threshold-based alerts (email/Slack) when metrics spike or drop. Define conditions like "notify me when query errors > 50/hr".',
      emoji: '🔔',
    },
    {
      id: 'c',
      title: 'Team Collaboration',
      description: 'Invite teammates, assign roles, share dashboards, and leave comments on charts and reports — turning InsightFlow into a team workspace.',
      emoji: '👥',
    },
    {
      id: 'd',
      title: 'Data Export & Scheduling',
      description: 'Export any chart or report as PDF/CSV/Excel on demand, or set up scheduled email digests with weekly summaries sent automatically.',
      emoji: '📤',
    },
  ],
}

export default function SurveyPage() {
  const [votes, setVotes] = useState({ a: 0, b: 0, c: 0, d: 0 })
  const [hasVoted, setHasVoted] = useState(false)
  const [myVote, setMyVote] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load stored votes
    try {
      const stored = localStorage.getItem(SURVEY_KEY)
      if (stored) setVotes(JSON.parse(stored))
      const voted = localStorage.getItem(VOTED_KEY)
      if (voted) {
        setHasVoted(true)
        setMyVote(voted)
      }
    } catch {}
    setMounted(true)
  }, [])

  function castVote(optionId) {
    if (hasVoted) return
    const newVotes = { ...votes, [optionId]: (votes[optionId] || 0) + 1 }
    setVotes(newVotes)
    setHasVoted(true)
    setMyVote(optionId)
    try {
      localStorage.setItem(SURVEY_KEY, JSON.stringify(newVotes))
      localStorage.setItem(VOTED_KEY, optionId)
    } catch {}
  }

  const total = Object.values(votes).reduce((a, b) => a + b, 0)
  const winnerId = total > 0
    ? Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0]
    : null

  return (
    <>
      <div className="page-header">
        <div className="page-title">🗳 Weekly Enhancement Vote</div>
        <div className="page-subtitle">// {SURVEY.week} · closes {SURVEY.closes}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Each week we ship one new feature — chosen <strong style={{ color: 'var(--text-primary)' }}>by you</strong>.
              Vote below, and the winner gets built and deployed this Friday. Runners-up move to the backlog for future consideration.
            </p>
          </div>

          {SURVEY.options.map(opt => {
            const pct = total > 0 ? Math.round((votes[opt.id] / total) * 100) : 0
            const isWinner = hasVoted && winnerId === opt.id
            const isMyVote = myVote === opt.id
            return (
              <div
                key={opt.id}
                className={`survey-option ${isMyVote ? 'voted' : ''} ${isWinner ? 'winner' : ''}`}
                onClick={() => castVote(opt.id)}
              >
                <div className="option-header">
                  <div className="option-number">{opt.emoji}</div>
                  <div className="option-title">
                    {opt.title}
                    {isWinner && <span style={{ marginLeft: 8, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--amber)', letterSpacing: 1 }}>LEADING</span>}
                    {isMyVote && <span style={{ marginLeft: 8, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--cyan)', letterSpacing: 1 }}>MY VOTE</span>}
                  </div>
                </div>
                <div className="option-desc">{opt.description}</div>
                <div className="vote-bar-wrap">
                  <div
                    className={`vote-bar ${isWinner ? 'winner' : ''}`}
                    style={{ width: mounted && hasVoted ? `${pct}%` : '0%' }}
                  />
                </div>
                <div className="vote-count">
                  {mounted && hasVoted ? `${votes[opt.id]} votes · ${pct}%` : 'Click to vote'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sidebar info */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-label">How It Works</div>
            {[
              ['Mon–Thu', 'Vote on this week\'s 4 options'],
              ['Friday', 'Winner gets built & deployed'],
              ['Friday+', 'New survey goes live'],
              ['Backlog', 'Runners-up saved for later'],
            ].map(([stage, desc]) => (
              <div key={stage} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyan)', minWidth: 60, paddingTop: 2 }}>{stage}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-label">This Week's Stats</div>
            <div style={{ marginTop: 8 }}>
              {[
                ['Total Votes', mounted ? total.toString() : '—'],
                ['Options', '4'],
                ['Closes', 'Friday'],
                ['Backlog Items', '0'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{k}</span>
                  <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
