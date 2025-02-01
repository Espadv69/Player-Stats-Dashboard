// DOM elements
// Input playerName
const $playerName = document.querySelector('.playerName') // Selects the input element for player name
// Input player points
const $points = document.querySelector('.points') // Selects the input element for player points
// Input player assists
const $assists = document.querySelector('.assists') // Selects the input element for player assists
// Input player rebounds
const $rebounds = document.querySelector('.rebounds') // Selects the input element for player rebounds
// Add Player button
const $addPlayerButton = document.querySelector('.addPlayer') // Selects the button to add a player
// Got body-table where we will list players
const $playerList = document.querySelector('.playerList') // Selects the table body where players will be listed
// Got paragraph where we will show the summary
const $summary = document.querySelector('.summary') // Selects the paragraph element for the player stats summary

// Store players
let players = {} // Initializes an empty object to store player data

// Function to update the table with the player list
function renderPlayers() {
  // Clean body table
  $playerList.innerHTML = '' // Clears the table before rendering new player data

  // Loop through each entry of players using Object.entries
  Object.entries(players).forEach(([id, player]) => {
    // Iterates over the players object
    const $tr = document.createElement('tr') // Creates a new table row for each player

    $tr.innerHTML = `
      <td>${player.name}</td> <!-- Adds player name to the table -->
      <td>${player.points}</td> <!-- Adds player points to the table -->
      <td>${player.assists}</td> <!-- Adds player assists to the table -->
      <td>${player.rebounds}</td> <!-- Adds player rebounds to the table -->
      <td><button onclick="removePlayer('${id}')">❌</button></td> <!-- Adds a remove button for the player -->
    `

    $playerList.appendChild($tr) // Appends the newly created row to the table
  })

  updateSummary() // Calls the function to update the player stats summary
}

// Function that calculates and shows a general summary of all players' stats
function updateSummary() {
  const allStats = Object.values(players) // Extracts the values (players) from the players object

  if (allStats.length === 0) {
    // Checks if there are no players
    $summary.textContent = 'No players added.' // Displays a message if no players are added
    return
  }

  const totalPoints = allStats.reduce((sum, p) => sum + p.points, 0) // Sums up total points of all players
  const totalAssists = allStats.reduce((sum, p) => sum + p.assists, 0) // Sums up total assists of all players
  const totalRebounds = allStats.reduce((sum, p) => sum + p.rebounds, 0) // Sums up total rebounds of all players

  const avgPoints = (totalPoints / allStats.length).toFixed(1) // Calculates and rounds average points per player
  const avgAssists = (totalAssists / allStats.length).toFixed(1) // Calculates and rounds average assists per player
  const avgRebounds = (totalRebounds / allStats.length).toFixed(1) // Calculates and rounds average rebounds per player

  $summary.textContent = `
    Total Players: ${allStats.length} <!-- Displays the total number of players -->
    | Total Pts: ${totalPoints} (Avg: ${avgPoints}) <!-- Displays total and average points -->
    | Assists: ${totalAssists} (Avg: ${avgAssists}) <!-- Displays total and average assists -->
    | Rebounds: ${totalRebounds} (Avg: ${avgRebounds}) <!-- Displays total and average rebounds -->
  `
}

// Function to add a new player
$addPlayerButton.addEventListener('click', () => {
  // Adds an event listener for the Add Player button
  const name = $playerName.value.trim() // Gets the player name from input and trims whitespace
  const pts = parseInt($points.value) || 0 // Gets player points from input, defaults to 0 if not a number
  const ast = parseInt($assists.value) || 0 // Gets player assists from input, defaults to 0 if not a number
  const reb = parseInt($rebounds.value) || 0 // Gets player rebounds from input, defaults to 0 if not a number

  if (name) {
    // Checks if player name is provided
    const id = Date.now().toLocaleString() // Generates a unique ID based on current timestamp

    players[id] = { name, points: pts, assists: ast, rebounds: reb } // Adds the new player to the players object

    $playerName.value = '' // Clears the player name input
    $points.value = '' // Clears the player points input
    $assists.value = '' // Clears the player assists input
    $rebounds.value = '' // Clears the player rebounds input

    renderPlayers() // Re-renders the player list after adding a new player
  }
})

// Function to remove a player
function removePlayer(id) {
  // Removes a player by their unique ID
  delete players[id] // Deletes the player from the players object

  renderPlayers() // Re-renders the player list after removal
}

renderPlayers() // Initial rendering of players
