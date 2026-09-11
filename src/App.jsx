import { useState } from 'react'
import './App.css'

function App() {
  const [team, setTeam] = useState('Ajax')
  const [showTeamMatchesOnly, setShowTeamMatchesOnly] = useState(true)
  const teams = ['Ajax', 'PSV', 'Feyenoord']
  const matches = [
    { id: 1, date: '12 mei', home: 'Ajax', away: 'PSV', homeScore: 3, awayScore: 1 },
    { id: 2, date: '5 mei', home: 'Ajax', away: 'Feyenoord', homeScore: 2, awayScore: 2 },
    { id: 3, date: '28 apr', home: 'Feyenoord', away: 'PSV', homeScore: 4, awayScore: 1 },
  ]
  const teamMatches = matches.filter(({ home, away }) => home === team || away === team)
  const visibleMatches = showTeamMatchesOnly ? teamMatches : matches
  const stats = teamMatches.reduce(
    (summary, { home, homeScore, awayScore }) => {
      const isHome = home === team
      const teamScore = isHome ? homeScore : awayScore
      const opponentScore = isHome ? awayScore : homeScore

      summary.goals += teamScore
      summary.played += 1
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

  const getResult = ({ home, homeScore, awayScore }) => {
    const teamScore = home === team ? homeScore : awayScore
    const opponentScore = home === team ? awayScore : homeScore
    if (teamScore > opponentScore) return 'Winst'
    if (teamScore === opponentScore) return 'Gelijkspel'
    return 'Verlies'
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Eredivisie</p>
        <h1><span aria-hidden="true">⚽</span> Voetbaltracker</h1>
        <p className="intro">Volg uitslagen, vorm en punten van jouw favoriete team.</p>
      </header>

      <section className="team-panel" aria-labelledby="team-heading">
        <div>
          <p className="section-kicker">Favoriet team</p>
          <h2 id="team-heading">{team}</h2>
        </div>

        <div className="team-picker" role="group" aria-label="Kies je favoriete team">
          {teams.map((teamName) => (
            <button
              className={teamName === team ? 'team-button is-selected' : 'team-button'}
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

      <section className="stats-grid" aria-label={`Statistieken van ${team}`}>
        <div className="stat-card stat-card-featured">
          <span className="stat-label">Punten</span>
          <strong>{stats.points}</strong>
          <span className="stat-note">uit {stats.played} wedstrijden</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Overwinningen</span>
          <strong>{stats.wins}</strong>
          <span className="stat-note">van {stats.played}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Doelpunten</span>
          <strong>{stats.goals}</strong>
          <span className="stat-note">voor {team}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Vorm</span>
          <strong>{stats.wins}-{stats.draws}-{stats.losses}</strong>
          <span className="stat-note">winst - gelijk - verlies</span>
        </div>
      </section>

      <section aria-labelledby="matches-heading">
        <div className="section-heading section-heading-with-control">
          <p className="section-kicker">Resultaten</p>
          <h2 id="matches-heading">Wedstrijden</h2>
          <button
            className="filter-button"
            type="button"
            aria-pressed={showTeamMatchesOnly}
            onClick={() => setShowTeamMatchesOnly((current) => !current)}
          >
            {showTeamMatchesOnly ? 'Alle wedstrijden' : `Alleen ${team}`}
          </button>
        </div>

        <div className="table-wrap">
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
                  <td className={match.home === team ? 'team-highlight' : ''}>{match.home}</td>
                  <td className="score">{match.homeScore} - {match.awayScore}</td>
                  <td className={match.away === team ? 'team-highlight' : ''}>{match.away}</td>
                  <td><span className={`result-badge result-${getResult(match).toLowerCase().replace(' ', '-')}`}>{getResult(match)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
