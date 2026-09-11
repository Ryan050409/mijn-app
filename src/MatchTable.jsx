import ResultBadge from './ResultBadge'
import { getResult } from './stats'

function MatchTable({ visibleMatches, team, onView, onEdit, onDelete }) {
  return (
    <div
      className="table-wrap"
      role="region"
      aria-label="Wedstrijduitslagen"
      tabIndex="0"
    >
      <table>
        <caption className="sr-only">Wedstrijduitslagen</caption>
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Thuis</th>
            <th scope="col">Stand</th>
            <th scope="col">Uit</th>
            <th scope="col">Resultaat</th>
            <th scope="col">Acties</th>
          </tr>
        </thead>
        <tbody>
          {visibleMatches.map((match) => (
            <tr key={match.id}>
              <td className="date-cell" data-label="Datum">
                {match.date}
              </td>
              <td
                className={match.home === team ? 'team-highlight' : ''}
                data-label="Thuis"
              >
                {match.home}
              </td>
              <td className="score" data-label="Stand">
                {match.homeScore} - {match.awayScore}
              </td>
              <td
                className={match.away === team ? 'team-highlight' : ''}
                data-label="Uit"
              >
                {match.away}
              </td>
              <td data-label="Resultaat">
                <ResultBadge result={getResult(match, team)} />
              </td>
              <td className="match-actions" data-label="Acties">
                <button type="button" onClick={() => onView(match)}>
                  Details
                </button>
                <button type="button" onClick={() => onEdit(match)}>
                  Bewerken
                </button>
                <button type="button" onClick={() => onDelete(match)}>
                  Verwijderen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default MatchTable
