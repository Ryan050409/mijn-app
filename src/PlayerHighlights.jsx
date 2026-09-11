function PlayerHighlights({ players }) {
  if (!players.length) return null
  const topScorer = [...players].sort((a, b) => b.goals - a.goals)[0]
  const topAssistant = [...players].sort((a, b) => b.assists - a.assists)[0]

  return (
    <section className="player-highlights" aria-label="Spelerleiders">
      <article>
        <span className="stat-label">Topscorer</span>
        <strong>{topScorer.name}</strong>
        <small>{topScorer.team || 'Ajax'}</small>
        <b>{topScorer.goals} goals</b>
      </article>
      <article>
        <span className="stat-label">Assistkoning</span>
        <strong>{topAssistant.name}</strong>
        <small>{topAssistant.team || 'Ajax'}</small>
        <b>{topAssistant.assists} assists</b>
      </article>
    </section>
  )
}

export default PlayerHighlights
