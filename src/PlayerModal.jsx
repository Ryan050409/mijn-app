import { useEffect } from 'react'

function PlayerModal({ player, onClose, closeButtonRef }) {
  useEffect(() => {
    if (!player) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [player, onClose, closeButtonRef])

  if (!player) return null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="player-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-modal-title"
      >
        <div className="modal-header">
          <div className="player-number" aria-hidden="true">
            {player.number}
          </div>
          <div>
            <p className="section-kicker">{player.position}</p>
            <h2 id="player-modal-title">{player.name}</h2>
          </div>
          <button
            className="modal-close"
            type="button"
            aria-label="Sluit spelersstatistieken"
            ref={closeButtonRef}
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="player-stat-grid">
          <div>
            <span>Wedstrijden</span>
            <strong>{player.appearances}</strong>
          </div>
          <div>
            <span>Doelpunten</span>
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
        <p className="modal-note">Statistieken van het seizoen 2024/25.</p>
      </section>
    </div>
  )
}

export default PlayerModal
