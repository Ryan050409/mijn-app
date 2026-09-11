function ResultBadge({ result }) {
  return (
    <span
      className={`result-badge result-${result.toLowerCase().replace(' ', '-')}`}
    >
      {result}
    </span>
  )
}

export default ResultBadge
