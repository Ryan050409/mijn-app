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

export default StatsGrid
