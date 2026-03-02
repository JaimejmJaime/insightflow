import '../styles/globals.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ALL_NAV = [
  { href: '/',          icon: '◈', label: 'Home',     group: 'platform' },
  { href: '/ai-tools',  icon: '◎', label: 'AI',       group: 'platform' },
  { href: '/analytics', icon: '▲', label: 'Analytics', group: 'platform' },
  { href: '/survey',    icon: '◉', label: 'Vote',      group: 'community', badge: 'LIVE' },
  { href: '/backlog',   icon: '≡', label: 'Backlog',   group: 'community' },
  { href: '/changelog', icon: '◷', label: 'Log',       group: 'community' },
]

function Sidebar({ currentPath }) {
  const platform = ALL_NAV.filter(n => n.group === 'platform')
  const community = ALL_NAV.filter(n => n.group === 'community')

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
        {platform.map(item => (
          <Link key={item.href} href={item.href}
            className={`nav-link ${currentPath === item.href ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="nav-label">Community</div>
        {community.map(item => (
          <Link key={item.href} href={item.href}
            className={`nav-link ${currentPath === item.href ? 'active' : ''}`}>
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

function MobileNav({ currentPath }) {
  return (
    <nav className="mobile-nav">
      {ALL_NAV.map(item => (
        <div key={item.href} className="mobile-nav-item-wrap">
          <Link href={item.href}
            className={`mobile-nav-item ${currentPath === item.href ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
          {item.badge && <span className="mobile-nav-badge">{item.badge}</span>}
        </div>
      ))}
    </nav>
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
  '/':          'Dashboard',
  '/ai-tools':  'AI Tools',
  '/analytics': 'Analytics',
  '/survey':    'Weekly Survey',
  '/backlog':   'Feature Backlog',
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
      <MobileNav currentPath={router.pathname} />
    </div>
  )
}
