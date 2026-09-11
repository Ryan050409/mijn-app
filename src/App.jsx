import { useState } from 'react'
import './App.css'

const teams = ['Ajax', 'PSV', 'Feyenoord']

const matches = [
  {
    id: 1,
    date: '12 mei',
    home: 'Ajax',
    away: 'PSV',
    homeScore: 3,
    awayScore: 1,
  },
  {
    id: 2,
    date: '5 mei',
    home: 'Ajax',
    away: 'Feyenoord',
    homeScore: 2,
    awayScore: 2,
  },
  {
    id: 3,
    date: '28 apr',
    home: 'Feyenoord',
    away: 'PSV',
    homeScore: 4,
    awayScore: 1,
  },
]

const players = [
  { name: 'Brian Brobbey', position: 'Aanvaller', number: 9, goals: 18 },
  { name: 'Kenneth Taylor', position: 'Middenveld', number: 8, goals: 7 },
  { name: 'Jorrel Hato', position: 'Verdediger', number: 4, goals: 2 },
  { name: 'Remko Pasveer', position: 'Doelman', number: 1, goals: 0 },
]

function getStats(team) {
  return matches
    .filter(({ home, away }) => home === team || away === team)
    .reduce(
      (summary, { home, homeScore, awayScore }) => {
        const isHome = home === team
        const teamScore = isHome ? homeScore : awayScore
        const opponentScore = isHome ? awayScore : homeScore

        summary.played += 1
        summary.goals += teamScore
        if (teamScore > opponentScore) {
          summary.wins += 1
          summary.points += 3
        } else if (teamScore === opponentScore) {
          summary.draws += 1
          summary.points += 1
        } else {
          summary.losses += 1
        }
        return summary
      },
      { played: 0, wins: 0, draws: 0, losses: 0, goals: 0, points: 0 },
    )
}

function getResult(match, team) {
  if (match.home !== team && match.away !== team) return 'Neutraal'
  const teamScore = match.home === team ? match.homeScore : match.awayScore
  const opponentScore = match.home === team ? match.awayScore : match.homeScore
  if (teamScore > opponentScore) return 'Winst'
  if (teamScore === opponentScore) return 'Gelijkspel'
  return 'Verlies'
}

function ResultBadge({ result }) {
  return (
    <span
      className={`result-badge result-${result.toLowerCase().replace(' ', '-')}`}
    >
      {result}
    </span>
  )
}

function StatsGrid({ stats, team }) {
  const items = [
    ['Punten', stats.points, `uit ${stats.played} wedstrijden`],
    ['Overwinningen', stats.wins, `van ${stats.played}`],
    ['Doelpunten', stats.goals, `voor ${team}`],
    [
      'Vorm',
      `${stats.wins}-${stats.draws}-${stats.losses}`,
      'winst - gelijk - verlies',
    ],
  ]

  return (
    <section className="stats-grid" aria-label={`Statistieken van ${team}`}>
      {items.map(([label, value, note], index) => (
        <div
          className={index === 0 ? 'stat-card stat-card-featured' : 'stat-card'}
          key={label}
        >
          <span className="stat-label">{label}</span>
          <strong>{value}</strong>
          <span className="stat-note">{note}</span>
        </div>
      ))}
    </section>
  )
}

function MatchTable({ visibleMatches, team }) {
  return (
    <div
      className="table-wrap"
      role="region"
      aria-label="Wedstrijduitslagen, horizontaal scrollbaar"
      tabIndex="0"
    >
      <table>
        <caption className="sr-only">Wedstrijduitslagen</caption>
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Thuis</th>
            <th scope="col">Stand</th>
            <th scope="col">Uit</th>
            <th scope="col">Resultaat</th>
          </tr>
        </thead>
        <tbody>
          {visibleMatches.map((match) => (
            <tr key={match.id}>
              <td className="date-cell">{match.date}</td>
              <td className={match.home === team ? 'team-highlight' : ''}>
                {match.home}
              </td>
              <td className="score">
                {match.homeScore} - {match.awayScore}
              </td>
              <td className={match.away === team ? 'team-highlight' : ''}>
                {match.away}
              </td>
              <td>
                <ResultBadge result={getResult(match, team)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [team, setTeam] = useState('Ajax')
  const [page, setPage] = useState('overzicht')
  const [showTeamMatchesOnly, setShowTeamMatchesOnly] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [compactView, setCompactView] = useState(false)
  const teamMatches = matches.filter(
    ({ home, away }) => home === team || away === team,
  )
  const stats = getStats(team)
  const visibleMatches = showTeamMatchesOnly ? teamMatches : matches

  const navigation = [
    ['overzicht', 'Overzicht', '⌂'],
    ['spelers', 'Spelers', '♙'],
    ['resultaten', 'Resultaten', '◷'],
    ['wedstrijden', 'Wedstrijden', '▤'],
    ['instellingen', 'Instellingen', '⚙'],
  ]

  const pageTitles = {
    overzicht: ['Jouw dashboard', `Alles over ${team} op één plek.`],
    spelers: ['Spelers', 'Bekijk de selectie en hun bijdrage dit seizoen.'],
    resultaten: ['Resultaten', `De recente vorm van ${team}.`],
    wedstrijden: [
      'Wedstrijden',
      'Alle gespeelde wedstrijden in één overzicht.',
    ],
    instellingen: ['Instellingen', 'Pas jouw voetbaltracker aan.'],
  }

  const renderPage = () => {
    if (page === 'spelers') {
      return (
        <section className="page-content" aria-labelledby="page-heading">
          <div className="player-grid">
            {players.map((player) => (
              <article className="player-card" key={player.name}>
                <div className="player-number">{player.number}</div>
                <div>
                  <p className="section-kicker">{player.position}</p>
                  <h2>{player.name}</h2>
                  <p className="player-stat">
                    {player.goals} doelpunten dit seizoen
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )
    }

    if (page === 'resultaten' || page === 'wedstrijden') {
      return (
        <section className="page-content" aria-labelledby="page-heading">
          {page === 'resultaten' && <StatsGrid stats={stats} team={team} />}
          <div className="section-heading section-heading-with-control">
            <div>
              <p className="section-kicker">
                {page === 'resultaten' ? 'Vorm' : 'Historie'}
              </p>
              <h2>
                {page === 'resultaten'
                  ? `Resultaten van ${team}`
                  : 'Wedstrijdschema'}
              </h2>
            </div>
            <button
              className="filter-button"
              type="button"
              aria-pressed={showTeamMatchesOnly}
              onClick={() => setShowTeamMatchesOnly((current) => !current)}
            >
              {showTeamMatchesOnly ? 'Alle wedstrijden' : `Alleen ${team}`}
            </button>
          </div>
          <MatchTable visibleMatches={visibleMatches} team={team} />
        </section>
      )
    }

    if (page === 'instellingen') {
      return (
        <section
          className="page-content settings-list"
          aria-labelledby="page-heading"
        >
          <label className="setting-row">
            <span>
              <strong>Favoriet team</strong>
              <small>Gebruik dit team in je dashboard.</small>
            </span>
            <select
              value={team}
              onChange={(event) => setTeam(event.target.value)}
            >
              {teams.map((teamName) => (
                <option key={teamName}>{teamName}</option>
              ))}
            </select>
          </label>
          <label className="setting-row">
            <span>
              <strong>Wedstrijdmeldingen</strong>
              <small>Ontvang een herinnering voor nieuwe uitslagen.</small>
            </span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) => setNotifications(event.target.checked)}
            />
          </label>
          <label className="setting-row">
            <span>
              <strong>Compacte weergave</strong>
              <small>Toon meer informatie op kleinere schermen.</small>
            </span>
            <input
              type="checkbox"
              checked={compactView}
              onChange={(event) => setCompactView(event.target.checked)}
            />
          </label>
        </section>
      )
    }

    return (
      <section className="page-content" aria-labelledby="page-heading">
        <section className="team-panel" aria-labelledby="team-heading">
          <div>
            <p className="section-kicker">Favoriet team</p>
            <h2 id="team-heading">{team}</h2>
          </div>
          <div
            className="team-picker"
            role="group"
            aria-label="Kies je favoriete team"
          >
            {teams.map((teamName) => (
              <button
                className={
                  teamName === team ? 'team-button is-selected' : 'team-button'
                }
                key={teamName}
                type="button"
                aria-pressed={teamName === team}
                onClick={() => setTeam(teamName)}
              >
                {teamName}
              </button>
            ))}
          </div>
        </section>
        <StatsGrid stats={stats} team={team} />
        <div className="section-heading section-heading-with-control">
          <div>
            <p className="section-kicker">Resultaten</p>
            <h2>Laatste wedstrijden</h2>
          </div>
          <button
            className="filter-button"
            type="button"
            onClick={() => setPage('resultaten')}
          >
            Bekijk alles
          </button>
        </div>
        <MatchTable visibleMatches={teamMatches.slice(0, 2)} team={team} />
      </section>
    )
  }

  return (
    <div className={compactView ? 'app-frame compact-view' : 'app-frame'}>
      <a className="skip-link" href="#main-content">
        Ga naar inhoud
      </a>
      <header className="topbar">
        <button
          className="brand"
          type="button"
          onClick={() => setPage('overzicht')}
        >
          <span aria-hidden="true">⚽</span> Voetbaltracker
        </button>
        <span className="season-label">Eredivisie · 2024/25</span>
      </header>
      <div className="app-layout">
        <nav className="side-nav" aria-label="Hoofdnavigatie">
          {navigation.map(([id, label, icon]) => (
            <button
              className={page === id ? 'nav-button is-active' : 'nav-button'}
              key={id}
              type="button"
              aria-current={page === id ? 'page' : undefined}
              onClick={() => setPage(id)}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
        <main className="app-shell" id="main-content" tabIndex="-1">
          <header className="app-header">
            <p className="eyebrow">
              {page === 'overzicht' ? 'Eredivisie' : 'Voetbaltracker'}
            </p>
            <h1 id="page-heading">{pageTitles[page][0]}</h1>
            <p className="intro">{pageTitles[page][1]}</p>
          </header>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
