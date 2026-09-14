function StandingsTable({ teams, matches, selectedTeam }) {
  const standings = teams
    .map((team) => {
      const summary = matches.reduce(
        (result, match) => {
          if (match.home !== team && match.away !== team) return result
          const isHome = match.home === team
          const goalsFor = isHome ? match.homeScore : match.awayScore
          const goalsAgainst = isHome ? match.awayScore : match.homeScore
          result.played += 1
          result.goalsFor += goalsFor
          result.goalsAgainst += goalsAgainst
          if (goalsFor > goalsAgainst) {
            result.wins += 1
            result.points += 3
          } else if (goalsFor === goalsAgainst) {
            result.draws += 1
            result.points += 1
          } else result.losses += 1
          return result
        },
        {
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        },
      )
      return {
        team,
        ...summary,
        difference: summary.goalsFor - summary.goalsAgainst,
      }
    })
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.difference - a.difference ||
        b.goalsFor - a.goalsFor,
    )

  return (
    <div
      className="table-wrap standings-wrap"
      role="region"
      aria-label="Stand van de teams"
      tabIndex="0"
    >
      <table className="standings-table">
        <caption className="sr-only">Stand van alle teams</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">GS</th>
            <th scope="col">W</th>
            <th scope="col">G</th>
            <th scope="col">V</th>
            <th scope="col">DV</th>
            <th scope="col">DS</th>
            <th scope="col">P</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((item, index) => (
            <tr
              className={item.team === selectedTeam ? 'is-selected-team' : ''}
              key={item.team}
              aria-current={item.team === selectedTeam ? 'true' : undefined}
            >
              <td data-label="#">{index + 1}</td>
              <th scope="row" data-label="Team">
                <span>{item.team}</span>
                {item.team === selectedTeam && (
                  <small className="standings-team-label">Jouw team</small>
                )}
              </th>
              <td data-label="GS">{item.played}</td>
              <td data-label="W">{item.wins}</td>
              <td data-label="G">{item.draws}</td>
              <td data-label="V">{item.losses}</td>
              <td data-label="DV">{item.goalsFor}</td>
              <td data-label="DS">
                {item.difference > 0 ? `+${item.difference}` : item.difference}
              </td>
              <td className="standings-points" data-label="P">
                {item.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StandingsTable
