import { useRef, useState } from 'react'
import './App.css'
import { matches as initialMatches, players, teams } from './data'
import { getResult, getStats } from './stats'
import StatsGrid from './StatsGrid'
import MatchTable from './MatchTable'
import MatchDetail from './MatchDetail'
import MatchForm from './MatchForm'
import PlayerModal from './PlayerModal'

function App() {
  const [team, setTeam] = useState('Ajax')
  const [matches, setMatches] = useState(initialMatches)
  const [page, setPage] = useState('overzicht')
  const [showTeamMatchesOnly, setShowTeamMatchesOnly] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [compactView, setCompactView] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [playerSearch, setPlayerSearch] = useState('')
  const [playerPosition, setPlayerPosition] = useState('Alle')
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [editingMatch, setEditingMatch] = useState(null)
  const [showMatchForm, setShowMatchForm] = useState(false)
  const [matchTeamFilter, setMatchTeamFilter] = useState('Alle teams')
  const [matchResultFilter, setMatchResultFilter] = useState('Alle resultaten')
  const [matchDateFilter, setMatchDateFilter] = useState('')
  const closeButtonRef = useRef(null)
  const teamMatches = matches.filter(
    ({ home, away }) => home === team || away === team,
  )
  const stats = getStats(matches, team)
  const filteredMatches = matches.filter((match) => {
    const result = getResult(match, team)
    const matchesSelectedTeam = !showTeamMatchesOnly || match.home === team || match.away === team
    const matchesTeam = matchesSelectedTeam && (matchTeamFilter === 'Alle teams' || match.home === matchTeamFilter || match.away === matchTeamFilter)
    const matchesResult =
      matchResultFilter === 'Alle resultaten' || result === matchResultFilter
    const matchesDate =
      !matchDateFilter ||
      match.date.toLowerCase().includes(matchDateFilter.toLowerCase())
    return matchesTeam && matchesResult && matchesDate
  })
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(playerSearch.toLowerCase())
    return (
      matchesSearch &&
      (playerPosition === 'Alle' || player.position === playerPosition)
    )
  })

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
  const toggleMatches = () => setShowTeamMatchesOnly((current) => !current)
  const saveMatch = (match) => {
    if (match.id) {
      setMatches((current) =>
        current.map((item) => (item.id === match.id ? match : item)),
      )
    } else {
      setMatches((current) => [...current, { ...match, id: Date.now() }])
    }
    setEditingMatch(null)
    setShowMatchForm(false)
  }
  const deleteMatch = (match) => {
    if (
      window.confirm(
        `Weet je zeker dat je ${match.home} - ${match.away} wilt verwijderen?`,
      )
    ) {
      setMatches((current) => current.filter((item) => item.id !== match.id))
    }
  }

  const renderPlayers = () => (
    <section className="page-content" aria-labelledby="page-heading">
      <div className="player-controls">
        <label>
          <span className="sr-only">Zoek een speler</span>
          <input
            type="search"
            placeholder="Zoek een speler..."
            value={playerSearch}
            onChange={(event) => setPlayerSearch(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Filter op positie</span>
          <select
            value={playerPosition}
            onChange={(event) => setPlayerPosition(event.target.value)}
          >
            <option>Alle</option>
            <option>Aanvaller</option>
            <option>Middenveld</option>
            <option>Verdediger</option>
            <option>Doelman</option>
          </select>
        </label>
      </div>
      <div className="player-grid">
        {filteredPlayers.length ? (
          filteredPlayers.map((player) => (
            <button
              className="player-card"
              key={player.name}
              type="button"
              aria-label={`Bekijk statistieken van ${player.name}`}
              onClick={() => setSelectedPlayer(player)}
            >
              <div className="player-number">{player.number}</div>
              <div>
                <p className="section-kicker">{player.position}</p>
                <h2>{player.name}</h2>
                <p className="player-stat">
                  {player.goals} doelpunten dit seizoen
                </p>
              </div>
            </button>
          ))
        ) : (
          <p>Geen spelers gevonden.</p>
        )}
      </div>
    </section>
  )

  const renderMatches = () => (
    <section className="page-content" aria-labelledby="page-heading">
      {page === 'resultaten' && <StatsGrid stats={stats} team={team} />}
      <div className="match-toolbar">
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setEditingMatch(null)
            setShowMatchForm(true)
          }}
        >
          + Wedstrijd toevoegen
        </button>
        <label>
          Team
          <select
            value={matchTeamFilter}
            onChange={(event) => setMatchTeamFilter(event.target.value)}
          >
            <option>Alle teams</option>
            {teams.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Resultaat
          <select
            value={matchResultFilter}
            onChange={(event) => setMatchResultFilter(event.target.value)}
          >
            <option>Alle resultaten</option>
            <option>Winst</option>
            <option>Gelijkspel</option>
            <option>Verlies</option>
            <option>Neutraal</option>
          </select>
        </label>
        <label>
          Datum
          <input
            type="search"
            placeholder="bijv. mei"
            value={matchDateFilter}
            onChange={(event) => setMatchDateFilter(event.target.value)}
          />
        </label>
      </div>
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
          onClick={toggleMatches}
        >
          {showTeamMatchesOnly ? 'Alle wedstrijden' : `Alleen ${team}`}
        </button>
      </div>
      <MatchTable
        visibleMatches={filteredMatches}
        team={team}
        onView={(match) => {
          setSelectedMatch(match)
          setPage('wedstrijd-detail')
        }}
        onEdit={(match) => {
          setEditingMatch(match)
          setShowMatchForm(true)
        }}
        onDelete={deleteMatch}
      />
    </section>
  )

  const renderSettings = () => (
    <section
      className="page-content settings-list"
      aria-labelledby="page-heading"
    >
      <label className="setting-row">
        <span>
          <strong>Favoriet team</strong>
          <small>Gebruik dit team in je dashboard.</small>
        </span>
        <select value={team} onChange={(event) => setTeam(event.target.value)}>
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

  const renderOverview = () => (
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
      <MatchTable
        visibleMatches={teamMatches.slice(0, 2)}
        team={team}
        onView={(match) => {
          setSelectedMatch(match)
          setPage('wedstrijd-detail')
        }}
        onEdit={(match) => {
          setEditingMatch(match)
          setShowMatchForm(true)
        }}
        onDelete={deleteMatch}
      />
    </section>
  )

  let content = renderOverview()
  if (page === 'spelers') content = renderPlayers()
  if (page === 'resultaten' || page === 'wedstrijden') content = renderMatches()
  if (page === 'instellingen') content = renderSettings()
  if (page === 'wedstrijd-detail')
    content = (
      <MatchDetail
        match={selectedMatch}
        team={team}
        onBack={() => setPage('wedstrijden')}
      />
    )

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
            <h1 id="page-heading">
              {page === 'wedstrijd-detail'
                ? 'Wedstrijd details'
                : pageTitles[page][0]}
            </h1>
            <p className="intro">
              {page === 'wedstrijd-detail'
                ? 'Bekijk alle gebeurtenissen van deze wedstrijd.'
                : pageTitles[page][1]}
            </p>
          </header>
          {content}
        </main>
      </div>
      <PlayerModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        closeButtonRef={closeButtonRef}
      />
      {showMatchForm && (
        <div className="modal-backdrop">
          <MatchForm
            editingMatch={editingMatch}
            onSubmit={saveMatch}
            onCancel={() => {
              setShowMatchForm(false)
              setEditingMatch(null)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default App
