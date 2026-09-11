import { useState } from 'react'
import './App.css'

function App() {
  const [team, setTeam] = useState('Ajax')

  return (
    <div>
      <h1>⚽ Voetbaltracker</h1>

      <h2>{team}</h2>

      <button onClick={() => setTeam('PSV')}>Kies PSV</button>

      <button onClick={() => setTeam('Feyenoord')}>Kies Feyenoord</button>
      <button onClick={() => setTeam('Ajax')}>Kies Ajax</button>

      <h2>Wedstrijden</h2>

      <p>Ajax 3 - 1 PSV</p>
      <p>Ajax 2 - 2 Feyenoord</p>
      <p>Feyenoord 4 - 1 Psv</p>
    </div>
  )
}

export default App
