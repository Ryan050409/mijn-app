import ResultBadge from './ResultBadge'
import { getResult } from './stats'

function MatchDetail({ match, team, onBack }) {
  if (!match) return null
  const result = getResult(match, team)

  return (
    <section
      className="match-detail page-content"
      aria-labelledby="match-detail-title"
    >
      <button className="back-button" type="button" onClick={onBack}>
        ← Terug naar wedstrijden
      </button>
      <div className="detail-scoreboard">
        <p className="section-kicker">{match.date}</p>
        <h2 id="match-detail-title">
          {match.home}{' '}
          <strong>
            {match.homeScore} - {match.awayScore}
          </strong>{' '}
          {match.away}
        </h2>
        <ResultBadge result={result} />
      </div>
      <div className="detail-grid">
        <section className="detail-panel">
          <h3>Doelpuntenmakers</h3>
          <ul>
            <li>
              {match.home} ·{' '}
              {match.homeScore ? 'Brian Brobbey' : 'Geen doelpunten'}
            </li>
            <li>
              {match.away} ·{' '}
              {match.awayScore ? 'Luuk de Jong' : 'Geen doelpunten'}
            </li>
          </ul>
        </section>
        <section className="detail-panel">
          <h3>Assists</h3>
          <ul>
            <li>Brian Brobbey · 1 assist</li>
            <li>Kenneth Taylor · 1 assist</li>
          </ul>
        </section>
        <section className="detail-panel">
          <h3>Kaarten</h3>
          <ul>
            <li>Jorrel Hato · Gele kaart</li>
            <li>Geen rode kaarten</li>
          </ul>
        </section>
        <section className="detail-panel">
          <h3>Opstelling</h3>
          <p>Pasveer · Hato · Taylor · Brobbey</p>
          <p>{match.away}: basisopstelling beschikbaar</p>
        </section>
      </div>
    </section>
  )
}

export default MatchDetail
