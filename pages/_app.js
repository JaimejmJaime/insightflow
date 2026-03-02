import '../styles/globals.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Sidebar({ currentPath }) {
  const navItems = [
    { href: '/', icon: '◈', label: 'Dashboard' },
    { href: '/ai-tools', icon: '◎', label: 'AI Tools' },
    { href: '/analytics', icon: '▲', label: 'Analytics' },
  ]
  const systemItems = [
    { href: '/survey', icon: '◉', label: 'Vote', badge: 'LIVE' },
    { href: '/backlog', icon: '≡', label: 'Backlog' },
    { href: '/changelog', icon: '◷', label: 'Changelog' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">IF</div>
          <div className="logo-text">Insight<span>Flow</span></div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Platform</div>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${currentPath === item.href ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="nav-label">Community</div>
        {systemItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${currentPath === item.href ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="version-tag">
          <span className="status-dot"></span>
          v0.1.0 · live
        </div>
      </div>
    </aside>
  )
}

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="clock">{time}</span>
}

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/ai-tools': 'AI Tools',
  '/analytics': 'Analytics',
  '/survey': 'Weekly Survey',
  '/backlog': 'Feature Backlog',
  '/changelog': 'Changelog',
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const title = PAGE_TITLES[router.pathname] || 'InsightFlow'

  return (
    <div className="app-shell">
      <Sidebar currentPath={router.pathname} />
      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">{title}</span>
          <span className="topbar-sub">// InsightFlow</span>
          <div className="topbar-actions">
            <Clock />
          </div>
        </header>
        <main className="page-content">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  )
}
