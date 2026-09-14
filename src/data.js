export const teams = [
  'Ajax',
  'AZ',
  'Almere City FC',
  'Feyenoord',
  'FC Groningen',
  'FC Twente',
  'FC Utrecht',
  'Fortuna Sittard',
  'Go Ahead Eagles',
  'Heracles Almelo',
  'N.E.C.',
  'NAC Breda',
  'PEC Zwolle',
  'PSV',
  'RKC Waalwijk',
  'sc Heerenveen',
  'Sparta Rotterdam',
  'Willem II',
]

export const matches = [
  ...teams.map((home, index) => ({
    id: index + 1,
    date: `${12 - (index % 6)} mei`,
    home,
    away: teams[(index + 1) % teams.length],
    homeScore: 1 + (index % 4),
    awayScore: index % 3,
  })),
  ...teams.map((home, index) => ({
    id: teams.length + index + 1,
    date: `${6 - (index % 6)} mei`,
    home,
    away: teams[(index + 2) % teams.length],
    homeScore: index % 3,
    awayScore: 1 + ((index + 1) % 4),
  })),
]

export const upcomingMatches = teams.map((home, index) => ({
  id: `upcoming-${index + 1}`,
  date: `${18 + index} mei`,
  home,
  away: teams[(index + 3) % teams.length],
  venue: index % 2 === 0 ? 'Thuiswedstrijd' : 'Uitwedstrijd',
}))

const playerNames = [
  ['Brian Brobbey', 'Kenneth Taylor', 'Jorrel Hato', 'Remko Pasveer'],
  [
    'Mexx Meerdink',
    'Jordy Clasie',
    'David Møller Wolfe',
    'Rome-Jayden Owusu-Oduro',
  ],
  ['Kornelius Hansen', 'Thom Haye', 'Ruben Kluivert', 'Nordin Bakker'],
  ['Ayase Ueda', 'Antoni Milambo', 'Gernot Trauner', 'Justin Bijlow'],
  ['Romano Postema', 'Luciano Valente', 'Thijmen Blokzijl', 'Etienne Vaessen'],
  ['Sem Steijn', 'Michel Vlap', 'Mees Hilgers', 'Lars Unnerstall'],
  ['David Min', 'Paxton Pomykal', 'Mike van der Hoorn', 'Vasilis Barkas'],
  ['Kaj Sierhuis', 'Alen Halilovic', 'Jasper Dahlhaus', 'Mattijs Branderhorst'],
  ['Victor Edvardsen', 'Finn Stokkers', 'Joris Kramer', 'Jeffrey de Lange'],
  ['Mario Engels', 'Shiloh t Zand', 'Ivan Mesik', 'Fabian de Keijzer'],
  ['Koki Ogawa', 'Dirk Proper', 'Mees de Wit', 'Robin Roefs'],
  ['Leo Sauer', 'Clint Leemans', 'Jan van den Bergh', 'Daniel Bielica'],
  ['Dylan Vente', 'Filip Krastev', 'Thomas Lam', 'Jasper Schendelaar'],
  ['Luuk de Jong', 'Malik Tillman', 'Olivier Boscagli', 'Walter Benitez'],
  ['Richonell Margaret', 'Yassin Oukili', 'Julian Lelieveld', 'Jeroen Houwen'],
  ['Milan de Haan', 'Luuk Brouwers', 'Pawel Bochniewicz', 'Andries Noppert'],
  ['Tobias Lauritsen', 'Arno Verschueren', 'Bart Vriends', 'Nick Olij'],
  ['Ringo Meerveld', 'Jesse Bosch', 'Erik Schouten', 'Thomas Didillon'],
]

const positions = ['Aanvaller', 'Middenveld', 'Verdediger', 'Doelman']

export const players = teams.flatMap((team, teamIndex) =>
  playerNames[teamIndex].map((name, playerIndex) => ({
    name,
    team,
    position: positions[playerIndex],
    number: [9, 8, 4, 1][playerIndex],
    goals:
      playerIndex === 0
        ? 8 + (teamIndex % 8)
        : playerIndex === 1
          ? 3 + (teamIndex % 5)
          : playerIndex === 2
            ? teamIndex % 3
            : 0,
    assists:
      playerIndex === 0
        ? 3 + (teamIndex % 4)
        : playerIndex === 1
          ? 5 + (teamIndex % 5)
          : playerIndex === 2
            ? 1 + (teamIndex % 3)
            : 0,
    appearances: 20 + ((teamIndex + playerIndex * 3) % 12),
    minutes: 1500 + ((teamIndex * 97 + playerIndex * 260) % 1100),
  })),
)
