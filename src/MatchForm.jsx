import { useState } from 'react'

function MatchForm({ editingMatch, onSubmit, onCancel, teams }) {
  const [form, setForm] = useState(() =>
    editingMatch
      ? {
          ...editingMatch,
          goalScorers: {
            home: editingMatch.goalScorers?.home?.join('\n') || '',
            away: editingMatch.goalScorers?.away?.join('\n') || '',
          },
        }
      : {
          home: teams[0],
          away: teams[1],
          date: '',
          homeScore: 0,
          awayScore: 0,
          goalScorers: { home: '', away: '' },
        },
  )

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.home === form.away || !form.date) return
    onSubmit({
      ...form,
      homeScore: Number(form.homeScore),
      awayScore: Number(form.awayScore),
      goalScorers: {
        home: form.goalScorers.home
          .split('\n')
          .map((scorer) => scorer.trim())
          .filter(Boolean),
        away: form.goalScorers.away
          .split('\n')
          .map((scorer) => scorer.trim())
          .filter(Boolean),
      },
    })
  }

  return (
    <form className="match-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="section-kicker">Wedstrijdbeheer</p>
          <h2>{editingMatch ? 'Wedstrijd bewerken' : 'Wedstrijd toevoegen'}</h2>
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
          Thuisteam
          <select
            value={form.home}
            onChange={(event) => updateField('home', event.target.value)}
          >
            {teams.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Uitteam
          <select
            value={form.away}
            onChange={(event) => updateField('away', event.target.value)}
          >
            {teams.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Datum
          <input
            required
            type="date"
            value={form.date}
            onChange={(event) => updateField('date', event.target.value)}
          />
        </label>
        <label>
          Score thuis
          <input
            min="0"
            required
            type="number"
            value={form.homeScore}
            onChange={(event) => updateField('homeScore', event.target.value)}
          />
        </label>
        <label>
          Score uit
          <input
            min="0"
            required
            type="number"
            value={form.awayScore}
            onChange={(event) => updateField('awayScore', event.target.value)}
          />
        </label>
        <label>
          Doelpuntenmakers {form.home}
          <textarea
            rows="3"
            value={form.goalScorers.home}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                goalScorers: {
                  ...current.goalScorers,
                  home: event.target.value,
                },
              }))
            }
            placeholder="Een speler per regel"
          />
        </label>
        <label>
          Doelpuntenmakers {form.away}
          <textarea
            rows="3"
            value={form.goalScorers.away}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                goalScorers: {
                  ...current.goalScorers,
                  away: event.target.value,
                },
              }))
            }
            placeholder="Een speler per regel"
          />
        </label>
      </div>
      {form.home === form.away && (
        <p className="form-error" role="alert">
          Kies twee verschillende teams.
        </p>
      )}
      <div className="form-actions">
        <button className="filter-button" type="button" onClick={onCancel}>
          Annuleren
        </button>
        <button className="primary-button" type="submit">
          {editingMatch ? 'Wijzigingen opslaan' : 'Wedstrijd toevoegen'}
        </button>
      </div>
    </form>
  )
}

export default MatchForm
