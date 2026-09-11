function PlayerDetail({ player, onBack }) {
  if (!player) return null
  const goalsPerMatch = player.appearances
    ? (player.goals / player.appearances).toFixed(2)
    : '0.00'
  const assistsPerMatch = player.appearances
    ? (player.assists / player.appearances).toFixed(2)
    : '0.00'
  const goalWidth = Math.min(100, Math.max(4, player.goals * 5))
  const assistWidth = Math.min(100, Math.max(4, player.assists * 8))

  return (
    <section
      className="player-detail page-content"
      aria-labelledby="player-detail-title"
    >
      <button className="back-button" type="button" onClick={onBack}>
        ← Terug naar spelers
      </button>
      <div className="player-detail-heading">
        <div className="player-number">{player.number}</div>
        <div>
          <p className="section-kicker">
            {player.team || 'Ajax'} · {player.position} #{player.number}
          </p>
          <h2 id="player-detail-title">{player.name}</h2>
        </div>
      </div>
      <div className="player-stat-grid">
        <div>
          <span>Wedstrijden</span>
          <strong>{player.appearances}</strong>
        </div>
        <div>
          <span>Goals</span>
          <strong>{player.goals}</strong>
        </div>
        <div>
          <span>Assists</span>
          <strong>{player.assists}</strong>
        </div>
        <div>
          <span>Minuten</span>
          <strong>{player.minutes}</strong>
        </div>
      </div>
      <div className="player-charts">
        <div className="progress-card">
          <div>
            <strong>Goals per wedstrijd</strong>
            <span>{goalsPerMatch}</span>
          </div>
          <div className="progress-track">
            <span style={{ width: `${goalWidth}%` }} />
          </div>
        </div>
        <div className="progress-card">
          <div>
            <strong>Assists per wedstrijd</strong>
            <span>{assistsPerMatch}</span>
          </div>
          <div className="progress-track">
            <span style={{ width: `${assistWidth}%` }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlayerDetail
