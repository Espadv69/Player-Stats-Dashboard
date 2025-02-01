// DOM elements
// Input playerName
const $playerName = document.querySelector('.playerName')
// Input player points
const $points = document.querySelector('.points')
// Input player assists
const $assists = document.querySelector('.assists')
// Input player rebounds
const $rebounds = document.querySelector('.rebounds')
// Add Player button
const $addPlayerButton = document.querySelector('.addPlayer')
// Got body-table where we will list players
const $playerList = document.querySelector('.playerList')
// Got paragraph where we will show the summary
const $summary = document.querySelector('.summary')

// Store players
let players = {}

// Function to update the table with the player list
function renderPlayers() {
  // Clean body table
  $playerList.innerHTML = ''

  // Run each entrance of players using Object.entries
  Object.entries(players).forEach(([id, player]) => {
    const $tr = document.createElement('tr')

    $tr.innerHTML = `
      <td>${player.name}</td>
      <td>${player.points}</td>
      <td>${player.assists}</td>
      <td>${player.rebounds}</td>
      <td><button onclick="removePlayer('${id}')">❌</button></td>
    `

    $playerList.appendChild(tr)
  })

  updateSummary()
}

// Function that calculates and shows a general summary of the all players stats
function updateSummary() {
  const allStats = Object.values(players)

  if (allStats.length === 0) {
    $summary.textContent = 'No players added.'
    return
  }

  const totalPoints = allStats.reduce((sum, p) => sum + p.points, 0)
  const totalAssists = allStats.reduce((sum, p) => sum + p.assists, 0)
  const totalRebounds = allStats.reduce((sum, p) => sum + p.rebounds, 0)

  const avgPoints = (totalPoints / allStats.length).toFixed(1)
  const avgAssists = (totalAssists / allStats.length).toFixed(1)
  const avgRebounds = (totalRebounds / allStats.length).toFixed(1)

  $summary.textContent = `
    Total Players: ${allStats.length}
    | Total Pts: ${totalPoints} (Avg: ${avgPoints})
    | Assists: ${totalAssists} (Avg: ${avgAssists})
    | Rebounds: ${totalRebounds} (Avg: ${avgRebounds})
  `
}

// Function to add a new player
$addPlayerButton.addEventListener('click', () => {
  const name = $playerName.value.trim()
  const pts = parseInt($points.value) || 0
  const ast = parseInt($assists.value) || 0
  const reb = parseInt($rebounds.value) || 0

  if (name) {
    const id = Date.now().toLocaleString()

    players[id] = { name, points: pts, assits: ast, rebounds: reb }

    $playerName.value = ''
    $points.value = ''
    $assists.value = ''
    $rebounds.value = ''

    renderPlayers()
  }
})

// Function to remove a player
function removePlayer(id) {
  delete players[id]

  renderPlayers()
}
