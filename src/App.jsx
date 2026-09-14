import { useRef, useState } from 'react'
import './App.css'
import {
  matches as initialMatches,
  players as initialPlayers,
  teams as initialTeams,
  upcomingMatches,
} from './data'
import { getResult, getStats } from './stats'
import StatsGrid from './StatsGrid'
import MatchTable from './MatchTable'
import MatchDetail from './MatchDetail'
import MatchForm from './MatchForm'
import PlayerModal from './PlayerModal'
import PlayerDetail from './PlayerDetail'
import PlayerForm from './PlayerForm'
import PlayerHighlights from './PlayerHighlights'
import StandingsTable from './StandingsTable'
import TeamForm from './TeamForm'
import TeamPage from './TeamPage'
import TeamLogo from './TeamLogo'

function App() {
  const [team, setTeam] = useState('Feyenoord')
  const [matches, setMatches] = useState(initialMatches)
  const [teams, setTeams] = useState(initialTeams)
  const [players, setPlayers] = useState(() =>
    initialPlayers.map((player, index) => ({ ...player, id: index + 1 })),
  )
  const [page, setPage] = useState('overzicht')
  const [showTeamMatchesOnly, setShowTeamMatchesOnly] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [compactView, setCompactView] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [favoritePlayer, setFavoritePlayer] = useState(
    initialPlayers[0]?.name || '',
  )
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [playerSearch, setPlayerSearch] = useState('')
  const [playerPosition, setPlayerPosition] = useState('Alle')
  const [playerTeamFilter, setPlayerTeamFilter] = useState('Alle teams')
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [editingMatch, setEditingMatch] = useState(null)
  const [showMatchForm, setShowMatchForm] = useState(false)
  const [matchTeamFilter, setMatchTeamFilter] = useState('Alle teams')
  const [matchResultFilter, setMatchResultFilter] = useState('Alle resultaten')
  const [matchDateFilter, setMatchDateFilter] = useState('')
  const [selectedPlayerDetail, setSelectedPlayerDetail] = useState(null)
  const [editingPlayer, setEditingPlayer] = useState(null)
  const [showPlayerForm, setShowPlayerForm] = useState(false)
  const [playerSort, setPlayerSort] = useState('name')
  const [showTeamForm, setShowTeamForm] = useState(false)
  const closeButtonRef = useRef(null)
  const teamMatches = matches.filter(
    ({ home, away }) => home === team || away === team,
  )
  const stats = getStats(matches, team)
  const filteredMatches = matches.filter((match) => {
    const result = getResult(match, team)
    const matchesSelectedTeam =
      !showTeamMatchesOnly || match.home === team || match.away === team
    const matchesTeam =
      matchesSelectedTeam &&
      (matchTeamFilter === 'Alle teams' ||
        match.home === matchTeamFilter ||
        match.away === matchTeamFilter)
    const matchesResult =
      matchResultFilter === 'Alle resultaten' || result === matchResultFilter
    const matchesDate =
      !matchDateFilter ||
      match.date.toLowerCase().includes(matchDateFilter.toLowerCase())
    return matchesTeam && matchesResult && matchesDate
  })
  const filteredPlayers = players
    .filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(playerSearch.toLowerCase())
      return (
        matchesSearch &&
        (playerPosition === 'Alle' || player.position === playerPosition) &&
        (playerTeamFilter === 'Alle teams' || player.team === playerTeamFilter)
      )
    })
    .sort((a, b) => {
      if (playerSort === 'goalsPerMatch')
        return (
          (b.appearances ? b.goals / b.appearances : 0) -
          (a.appearances ? a.goals / a.appearances : 0)
        )
      return (b[playerSort] || 0) - (a[playerSort] || 0)
    })
  const favoritePlayerData =
    players.find((player) => player.name === favoritePlayer) || players[0]

  const navigation = [
    ['overzicht', 'Overzicht', '⌂'],
    ['spelers', 'Spelers', '♙'],
    ['teams', 'Teams', '◎'],
    ['wedstrijden', 'Wedstrijden', '▤'],
    ['stand', 'Stand', '◷'],
    ['instellingen', 'Instellingen', '⚙'],
  ]
  const pageTitles = {
    overzicht: ['Jouw dashboard', `Alles over ${team} op één plek.`],
    spelers: ['Spelers', 'Bekijk de selectie en hun bijdrage dit seizoen.'],
    teams: [
      'Teams',
      'Bekijk Ajax, PSV, Feyenoord en andere teams afzonderlijk.',
    ],
    wedstrijden: [
      'Wedstrijden',
      'Uitslagen, filters en wedstrijdbeheer op één plek.',
    ],
    stand: ['Stand', 'Bekijk de actuele ranglijst van alle teams.'],
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
  const savePlayer = (player) => {
    if (player.id)
      setPlayers((current) =>
        current.map((item) => (item.id === player.id ? player : item)),
      )
    else setPlayers((current) => [...current, { ...player, id: Date.now() }])
    setEditingPlayer(null)
    setShowPlayerForm(false)
  }
  const deletePlayer = (player) => {
    if (window.confirm(`Weet je zeker dat je ${player.name} wilt verwijderen?`))
      setPlayers((current) => current.filter((item) => item.id !== player.id))
  }
  const addTeam = (name) => {
    if (!teams.some((item) => item.toLowerCase() === name.toLowerCase()))
      setTeams((current) => [...current, name])
    setShowTeamForm(false)
  }

  const renderPlayers = () => (
    <section className="page-content" aria-labelledby="page-heading">
      {favoritePlayerData && (
        <section
          className="favorite-player-panel"
          aria-labelledby="favorite-player-heading"
        >
          <div>
            <p className="section-kicker">Jouw keuze</p>
            <h2 id="favorite-player-heading">Favoriete speler</h2>
            <p>
              {favoritePlayerData.name} · {favoritePlayerData.team}
            </p>
          </div>
          <label>
            Kies een speler
            <select
              value={favoritePlayerData.name}
              onChange={(event) => setFavoritePlayer(event.target.value)}
            >
              {players.map((player) => (
                <option key={player.name} value={player.name}>
                  {player.name} · {player.team}
                </option>
              ))}
            </select>
          </label>
          <button
            className="filter-button"
            type="button"
            onClick={() => setSelectedPlayerDetail(favoritePlayerData)}
          >
            Bekijk profiel
          </button>
        </section>
      )}
      <PlayerHighlights players={players} />
      <div className="player-section-heading">
        <div>
          <p className="section-kicker">Selectie</p>
          <h2>Alle spelers</h2>
        </div>
        <span>{filteredPlayers.length} spelers</span>
      </div>
      <div className="player-toolbar">
        <label>
          Sorteer op
          <select
            value={playerSort}
            onChange={(event) => setPlayerSort(event.target.value)}
          >
            <option value="name">Naam</option>
            <option value="goals">Meeste goals</option>
            <option value="assists">Meeste assists</option>
            <option value="appearances">Meeste wedstrijden</option>
            <option value="goalsPerMatch">Goals per wedstrijd</option>
          </select>
        </label>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setEditingPlayer(null)
            setShowPlayerForm(true)
          }}
        >
          + Speler toevoegen
        </button>
      </div>
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
        <label>
          <span className="sr-only">Filter op team</span>
          <select
            value={playerTeamFilter}
            onChange={(event) => setPlayerTeamFilter(event.target.value)}
          >
            <option>Alle teams</option>
            {teams.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="player-grid">
        {filteredPlayers.length ? (
          filteredPlayers.map((player) => (
            <article className="player-card" key={player.name}>
              <button
                className="player-card-main"
                type="button"
                aria-label={`Bekijk statistieken van ${player.name}`}
                onClick={() => setSelectedPlayerDetail(player)}
              >
                <div className="player-number">{player.number}</div>
                <div>
                  <div className="player-card-meta">
                    <span className="player-team-label">
                      <TeamLogo team={player.team || 'Ajax'} size="tiny" />
                      {player.team || 'Ajax'}
                    </span>
                    <span>{player.position}</span>
                  </div>
                  <h2>{player.name}</h2>
                  <p className="player-stat">
                    {player.goals} doelpunten dit seizoen
                  </p>
                </div>
              </button>
              <div className="player-card-actions">
                <button
                  type="button"
                  onClick={() => setSelectedPlayerDetail(player)}
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPlayer(player)
                    setShowPlayerForm(true)
                  }}
                >
                  Bewerken
                </button>
                <button type="button" onClick={() => deletePlayer(player)}>
                  Verwijderen
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>Geen spelers gevonden.</p>
        )}
      </div>
    </section>
  )

  const renderTeams = () => (
    <TeamPage
      teams={teams}
      selectedTeam={team}
      matches={matches}
      players={players}
      onSelect={setTeam}
    />
  )

  const renderMatches = () => (
    <section className="page-content" aria-labelledby="page-heading">
      <StatsGrid stats={stats} team={team} />
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
          <p className="section-kicker">Historie</p>
          <h2>Wedstrijden en uitslagen</h2>
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
      <div className="stand-link-panel">
        <div>
          <p className="section-kicker">Ranglijst</p>
          <h2>Stand bekijken</h2>
          <p>Bekijk de punten, doelpunten en posities van elk team.</p>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => setPage('stand')}
        >
          Naar stand
        </button>
      </div>
    </section>
  )

  const renderStandings = () => (
    <section className="page-content" aria-labelledby="page-heading">
      <div className="section-heading standings-page-heading">
        <div>
          <p className="section-kicker">Competitie</p>
          <h2>Actuele stand</h2>
        </div>
        <span className="standings-season">Eredivisie · 2024/25</span>
      </div>
      <div
        className="standings-summary"
        aria-label={`Samenvatting van ${team}`}
      >
        <div>
          <span className="stat-label">Jouw team</span>
          <strong>{team}</strong>
        </div>
        <div>
          <span className="stat-label">Punten</span>
          <strong>{stats.points}</strong>
        </div>
        <div>
          <span className="stat-label">Wedstrijden</span>
          <strong>{stats.played}</strong>
        </div>
      </div>
      <p className="standings-scroll-hint">
        Op een klein scherm kun je de tabel horizontaal verschuiven.
      </p>
      <StandingsTable teams={teams} matches={matches} selectedTeam={team} />
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
      <div className="settings-team-section">
        <div>
          <p className="section-kicker">Competitie</p>
          <h2>Teams</h2>
          <p>Voeg teams toe die je in wedstrijden en spelers kunt gebruiken.</p>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => setShowTeamForm(true)}
        >
          + Team toevoegen
        </button>
      </div>
      <ul className="team-list">
        {teams.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
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
      <div className="dashboard-insights">
        <section className="dashboard-panel" aria-labelledby="form-heading">
          <div className="section-heading">
            <p className="section-kicker">Teamvorm</p>
            <h2 id="form-heading">Laatste resultaten</h2>
          </div>
          <div className="form-strip" aria-label={`Vorm van ${team}`}>
            {teamMatches.slice(0, 5).map((match) => {
              const result = getResult(match, team)
              const shortResult =
                result === 'Winst' ? 'W' : result === 'Gelijkspel' ? 'G' : 'V'
              return (
                <span
                  className={`form-pill form-${shortResult.toLowerCase()}`}
                  key={match.id}
                  title={`${match.home} ${match.homeScore} - ${match.awayScore} ${match.away}`}
                >
                  {shortResult}
                </span>
              )
            })}
          </div>
          <p className="dashboard-note">Winst · gelijkspel · verlies</p>
        </section>
        <section className="dashboard-panel" aria-labelledby="upcoming-heading">
          <div className="section-heading">
            <p className="section-kicker">Programma</p>
            <h2 id="upcoming-heading">Komende wedstrijden</h2>
          </div>
          <ul className="upcoming-list">
            {upcomingMatches
              .filter(({ home, away }) => home === team || away === team)
              .slice(0, 3)
              .map((match) => (
                <li key={match.id}>
                  <span>{match.date}</span>
                  <strong>
                    {match.home} <b>vs</b> {match.away}
                  </strong>
                  <small>{match.venue}</small>
                </li>
              ))}
          </ul>
        </section>
      </div>
      <div className="section-heading section-heading-with-control">
        <div>
          <p className="section-kicker">Resultaten</p>
          <h2>Laatste wedstrijden</h2>
        </div>
        <button
          className="filter-button"
          type="button"
          onClick={() => setPage('wedstrijden')}
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
  if (page === 'teams') content = renderTeams()
  if (page === 'wedstrijden') content = renderMatches()
  if (page === 'stand') content = renderStandings()
  if (page === 'instellingen') content = renderSettings()
  if (page === 'wedstrijd-detail')
    content = (
      <MatchDetail
        match={selectedMatch}
        team={team}
        onBack={() => setPage('wedstrijden')}
      />
    )
  if (selectedPlayerDetail)
    content = (
      <PlayerDetail
        player={selectedPlayerDetail}
        onBack={() => setSelectedPlayerDetail(null)}
      />
    )

  return (
    <div
      className={`${compactView ? 'compact-view ' : ''}${darkMode ? 'dark-mode ' : ''}app-frame`}
    >
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
        <div className="topbar-actions">
          <span className="season-label">Eredivisie · 2024/25</span>
          <button
            className="theme-toggle"
            type="button"
            aria-pressed={darkMode}
            aria-label={
              darkMode
                ? 'Lichte weergave inschakelen'
                : 'Donkere weergave inschakelen'
            }
            title={darkMode ? 'Lichte weergave' : 'Donkere weergave'}
            onClick={() => setDarkMode((current) => !current)}
          >
            <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
          </button>
        </div>
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
            teams={teams}
            onSubmit={saveMatch}
            onCancel={() => {
              setShowMatchForm(false)
              setEditingMatch(null)
            }}
          />
        </div>
      )}
      {showPlayerForm && (
        <div className="modal-backdrop">
          <PlayerForm
            editingPlayer={editingPlayer}
            teams={teams}
            onSubmit={savePlayer}
            onCancel={() => {
              setShowPlayerForm(false)
              setEditingPlayer(null)
            }}
          />
        </div>
      )}
      {showTeamForm && (
        <div className="modal-backdrop">
          <TeamForm
            onSubmit={addTeam}
            onCancel={() => setShowTeamForm(false)}
          />
        </div>
      )}
    </div>
  )
}

export default App
