export function getStats(matches, team) {
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
      {
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: 0,
        points: 0,
      },
    )
}

export function getResult(match, team) {
  if (match.home !== team && match.away !== team) {
    return 'Neutraal'
  }

  const teamScore = match.home === team ? match.homeScore : match.awayScore

  const opponentScore = match.home === team ? match.awayScore : match.homeScore

  if (teamScore > opponentScore) {
    return 'Winst'
  }

  if (teamScore === opponentScore) {
    return 'Gelijkspel'
  }

  return 'Verlies'
}
