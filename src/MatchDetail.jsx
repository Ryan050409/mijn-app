import ResultBadge from './ResultBadge'
import { getResult } from './stats'

function MatchDetail({ match, team, onBack }) {
  if (!match) return null
  const result = getResult(match, team)
  const homeScorers = match.goalScorers?.home || []
  const awayScorers = match.goalScorers?.away || []

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
          <div className="scorers-columns">
            <div>
              <strong>{match.home}</strong>
              {homeScorers.length ? (
                <ul>
                  {homeScorers.map((scorer, index) => (
                    <li key={`${scorer}-${index}`}>{scorer}</li>
                  ))}
                </ul>
              ) : (
                <p>Geen doelpuntenmakers ingevoerd.</p>
              )}
            </div>
            <div>
              <strong>{match.away}</strong>
              {awayScorers.length ? (
                <ul>
                  {awayScorers.map((scorer, index) => (
                    <li key={`${scorer}-${index}`}>{scorer}</li>
                  ))}
                </ul>
              ) : (
                <p>Geen doelpuntenmakers ingevoerd.</p>
              )}
            </div>
          </div>
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
