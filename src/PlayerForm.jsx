import { useState } from 'react'
import { teams } from './data'

const emptyPlayer = {
  name: '',
  team: teams[0],
  position: 'Aanvaller',
  number: 1,
  goals: 0,
  assists: 0,
  appearances: 0,
  minutes: 0,
}

function PlayerForm({ editingPlayer, onSubmit, onCancel }) {
  const [form, setForm] = useState(() =>
    editingPlayer
      ? { ...editingPlayer, team: editingPlayer.team || teams[0] }
      : emptyPlayer,
  )
  const updateField = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }))
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return
    onSubmit({
      ...form,
      name: form.name.trim(),
      number: Number(form.number),
      goals: Number(form.goals),
      assists: Number(form.assists),
      appearances: Number(form.appearances),
      minutes: Number(form.minutes),
    })
  }

  return (
    <form className="match-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="section-kicker">Spelerbeheer</p>
          <h2>{editingPlayer ? 'Speler bewerken' : 'Speler toevoegen'}</h2>
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
      <div className="form-grid">
        <label>
          Naam
          <input
            required
            type="text"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label>
          Positie
          <select
            value={form.position}
            onChange={(event) => updateField('position', event.target.value)}
          >
            {['Aanvaller', 'Middenveld', 'Verdediger', 'Doelman'].map(
              (item) => (
                <option key={item}>{item}</option>
              ),
            )}
          </select>
        </label>
        <label>
          Team
          <select
            value={form.team || teams[0]}
            onChange={(event) => updateField('team', event.target.value)}
          >
            {teams.map((team) => (
              <option key={team}>{team}</option>
            ))}
          </select>
        </label>
        <label>
          Rugnummer
          <input
            min="1"
            required
            type="number"
            value={form.number}
            onChange={(event) => updateField('number', event.target.value)}
          />
        </label>
        <label>
          Goals
          <input
            min="0"
            required
            type="number"
            value={form.goals}
            onChange={(event) => updateField('goals', event.target.value)}
          />
        </label>
        <label>
          Assists
          <input
            min="0"
            required
            type="number"
            value={form.assists}
            onChange={(event) => updateField('assists', event.target.value)}
          />
        </label>
        <label>
          Wedstrijden
          <input
            min="0"
            required
            type="number"
            value={form.appearances}
            onChange={(event) => updateField('appearances', event.target.value)}
          />
        </label>
        <label>
          Minuten
          <input
            min="0"
            required
            type="number"
            value={form.minutes}
            onChange={(event) => updateField('minutes', event.target.value)}
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="filter-button" type="button" onClick={onCancel}>
          Annuleren
        </button>
        <button className="primary-button" type="submit">
          {editingPlayer ? 'Wijzigingen opslaan' : 'Speler toevoegen'}
        </button>
      </div>
    </form>
  )
}

export default PlayerForm
