import { useState } from 'react'

function TeamForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    if (name.trim()) onSubmit(name.trim())
  }

  return (
    <form className="match-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="section-kicker">Teambeheer</p>
          <h2>Team toevoegen</h2>
        </div>
        <button
          className="modal-close"
          type="button"
          aria-label="Sluit formulier"
          onClick={onCancel}
        >
          x
        </button>
      </div>
      <label>
        Teamnaam
        <input
          required
          autoFocus
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Bijvoorbeeld FC Utrecht"
        />
      </label>
      <div className="form-actions">
        <button className="filter-button" type="button" onClick={onCancel}>
          Annuleren
        </button>
        <button className="primary-button" type="submit">
          Team toevoegen
        </button>
      </div>
    </form>
  )
}

export default TeamForm
