import StatsGrid from './StatsGrid'
import { getStats } from './stats'

function TeamPage({ teams, selectedTeam, matches, players, onSelect }) {
  const stats = getStats(matches, selectedTeam)
  const teamMatches = matches.filter(
    ({ home, away }) => home === selectedTeam || away === selectedTeam,
  )
  const teamPlayers = players.filter(
    (player) => (player.team || 'Ajax') === selectedTeam,
  )

  return (
    <section className="page-content team-page" aria-labelledby="page-heading">
      <div className="team-directory" aria-label="Kies een team">
        {teams.map((team) => (
          <button
            className={
              team === selectedTeam
                ? 'team-directory-card is-selected'
                : 'team-directory-card'
            }
            key={team}
            type="button"
            aria-pressed={team === selectedTeam}
            onClick={() => onSelect(team)}
          >
            <span className="team-crest" aria-hidden="true">
              {team.slice(0, 1)}
            </span>
            <span>
              <strong>{team}</strong>
              <small>
                {
                  matches.filter(
                    ({ home, away }) => home === team || away === team,
                  ).length
                }{' '}
                wedstrijden
              </small>
            </span>
          </button>
        ))}
      </div>
      <div className="team-page-heading">
        <div>
          <p className="section-kicker">Teamprofiel</p>
          <h2>{selectedTeam}</h2>
        </div>
        <span className="team-status">Favoriet team</span>
      </div>
      <StatsGrid stats={stats} team={selectedTeam} />
      <div className="team-page-columns">
        <section className="team-page-panel">
          <div className="section-heading">
            <p className="section-kicker">Selectie</p>
            <h2>Spelers</h2>
          </div>
          {teamPlayers.length ? (
            <ul className="team-player-list">
              {teamPlayers.map((player) => (
                <li key={player.id || player.name}>
                  <span className="player-number-small">{player.number}</span>
                  <span>
                    <strong>{player.name}</strong>
                    <small>{player.position}</small>
                  </span>
                  <b>{player.goals} goals</b>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">
              Nog geen spelers toegevoegd aan dit team.
            </p>
          )}
        </section>
        <section className="team-page-panel">
          <div className="section-heading">
            <p className="section-kicker">Historie</p>
            <h2>Wedstrijden</h2>
          </div>
          {teamMatches.length ? (
            <ul className="team-match-list">
              {teamMatches.map((match) => (
                <li key={match.id}>
                  <span>{match.date}</span>
                  <strong>
                    {match.home} {match.homeScore} - {match.awayScore}{' '}
                    {match.away}
                  </strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Nog geen wedstrijden voor dit team.</p>
          )}
        </section>
      </div>
    </section>
  )
}

export default TeamPage
