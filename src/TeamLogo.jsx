const teamStyles = {
  Ajax: ['#d71920', '#ffffff', 'AJA'],
  AZ: ['#c8102e', '#ffffff', 'AZ'],
  'Almere City FC': ['#111827', '#f4c542', 'ALM'],
  Feyenoord: ['#e30613', '#ffffff', 'FEY'],
  'FC Groningen': ['#008c45', '#ffffff', 'GRO'],
  'FC Twente': ['#e30613', '#ffffff', 'TWE'],
  'FC Utrecht': ['#e30613', '#ffffff', 'UTR'],
  'Fortuna Sittard': ['#f4c542', '#008c45', 'FOR'],
  'Go Ahead Eagles': ['#d71920', '#f4c542', 'GAE'],
  'Heracles Almelo': ['#111827', '#ffffff', 'HER'],
  'N.E.C.': ['#e30613', '#111827', 'NEC'],
  'NAC Breda': ['#f4c542', '#111827', 'NAC'],
  'PEC Zwolle': ['#1688c9', '#ffffff', 'PEC'],
  PSV: ['#e30613', '#ffffff', 'PSV'],
  'RKC Waalwijk': ['#f4c542', '#111827', 'RKC'],
  'sc Heerenveen': ['#1688c9', '#ffffff', 'HEE'],
  'Sparta Rotterdam': ['#e30613', '#ffffff', 'SPA'],
  'Willem II': ['#e30613', '#1688c9', 'WII'],
}

const teamLogoPaths = {
  Ajax: '/team-logos/ajax.svg',
  AZ: '/team-logos/az.png',
  'Almere City FC': '/team-logos/almere.png',
  Feyenoord: '/team-logos/feyenoord.svg',
  'FC Groningen': '/team-logos/groningen.png',
  'FC Twente': '/team-logos/twente.png',
  'FC Utrecht': '/team-logos/utrecht.png',
  'Fortuna Sittard': '/team-logos/fortuna.png',
  'Go Ahead Eagles': '/team-logos/goahead.png',
  'Heracles Almelo': '/team-logos/heracles.png',
  'N.E.C.': '/team-logos/nec.png',
  'NAC Breda': '/team-logos/nac.png',
  'PEC Zwolle': '/team-logos/pec.png',
  PSV: '/team-logos/psv.svg',
  'RKC Waalwijk': '/team-logos/rkc.png',
  'sc Heerenveen': '/team-logos/heerenveen.png',
  'Sparta Rotterdam': '/team-logos/sparta.png',
  'Willem II': '/team-logos/willem.png',
}

function TeamLogo({ team, size = 'medium' }) {
  const [primary, secondary, abbreviation] = teamStyles[team] || [
    '#087f5b',
    '#ffffff',
    team.slice(0, 3).toUpperCase(),
  ]

  return (
    <span
      className={`team-logo team-logo-${size}`}
      style={{ '--logo-primary': primary, '--logo-secondary': secondary }}
      aria-label={`Logo van ${team}`}
      role="img"
    >
      {teamLogoPaths[team] ? (
        <img className="team-logo-image" src={teamLogoPaths[team]} alt="" />
      ) : (
        <svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">
          <path
            className="team-logo-shield"
            d="M32 2 59 11v24c0 17-11 29-27 35C16 64 5 52 5 35V11L32 2Z"
          />
          <path
            className="team-logo-stripe"
            d="M18 7v42c4 5 9 8 14 10V3L18 7Zm28 0v42c-4 5-9 8-14 10V3l14 4Z"
          />
          <circle className="team-logo-ball" cx="32" cy="28" r="13" />
          <text x="32" y="32" textAnchor="middle">
            {abbreviation}
          </text>
        </svg>
      )}
    </span>
  )
}

export default TeamLogo
