function getPlayerInfo  () {
  const input = document.getElementById('name').value.trim()

  const isPlayerId = /^\d+$/.test(input)

  const apiUrl  = isPlayerId
    ?`http://localhost:3000/main/players/${encodeURIComponent(input)}`
    :`http://localhost:3000/main/players/?name=${encodeURIComponent(input)}`
      
    console.log('Constructed URL:', apiUrl);
  axios.get(apiUrl)
  .then(response => {
    const playerData = response.data

    if(playerData) {
      displayPlayerInfo(playerData)
    } else {
      displayPlayerError()
    }
  })
  .catch(error => {
    console.error(error)
    displayPlayerError()
  })
}


function displayPlayerInfo(playerData) {
  const playerInfoContainer = document.getElementById('player-info-container');
  playerInfoContainer.innerHTML = '';


  const playerNameElement = document.createElement('div');
  playerNameElement.textContent = `Name: ${playerData.name}`;
  playerInfoContainer.appendChild(playerNameElement);

  const nationalityElement = document.createElement('div');
  nationalityElement.textContent = `Nationality: ${playerData.nationality}`;
  playerInfoContainer.appendChild(nationalityElement);

  const currentTeamElement = document.createElement('div');
  currentTeamElement.textContent = `Current Team: ${playerData.currentTeam.name} (${playerData.currentTeam.shortName})`;
  playerInfoContainer.appendChild(currentTeamElement);


  const teamDetailsElement = document.createElement('div');
  teamDetailsElement.innerHTML = `
      <div>Team Name: ${playerData.currentTeam.name}</div>
      <div>Short Name: ${playerData.currentTeam.shortName}</div>
      <div>Founded: ${playerData.currentTeam.founded}</div>
      <div>Club Colors: ${playerData.currentTeam.clubColors}</div>

  `;
  playerInfoContainer.appendChild(teamDetailsElement);


  const favoriteButton = document.createElement('button');
  favoriteButton.textContent = 'Favorite';
  favoriteButton.addEventListener('click', () => markPlayerAsFavorite(playerData.playerId, favoriteButton));
  playerInfoContainer.appendChild(favoriteButton);
}


function markPlayerAsFavorite(playerId, buttonElement) {
  axios.post(`http://localhost:3000/main/players/${playerId}/favorite`)
  .then(response => {
    if(response && response.data) {
      buttonElement.textContent = 'Favorited!'
      buttonElement.disabled = true
    } else {
      console.error('invalid response received', response)
    }

  })
  .catch(error => {
    console.error('error marking player as favorite', error)
  })
}
function displayPlayerError() {
  const playerInfoContainer = document.getElementById('player-info-container');
  playerInfoContainer.innerHTML = '<div>Error: Player not found</div>';
}

document.getElementById('search-btn').addEventListener('click', getPlayerInfo);

///////////////////////////////////////////////////////////////////////////////

document.getElementById('favorites-btn').addEventListener('click', function () {

  axios.get('http://localhost:3000/favorite-list')
    .then(response => {

      const playerList = response.data;

      const favoritesPage = document.createElement('div')
      favoritesPage.innerHTML = '<h2>Favorites</h2>'


      playerList.forEach(player => {
        const playerColumn = document.createElement('div')
        playerColumn.classList.add('player-column')
        playerColumn.innerHTML = `
        <p>Name: ${player.name}</p>
        <p>Nationality: ${player.nationality}</p>
        <p>Current Team:${player.currentTeam.name}</p>
        <div class="player-buttons">
                <button onclick="editPlayer('${player._id}')">Edit</button>
                <button onclick="deletePlayer('${player._id}')">Delete</button>
        </div>
        `

        favoritesPage.appendChild(playerColumn);
      })


      const playerInfoContainer = document.getElementById('player-info-container')
      playerInfoContainer.innerHTML = ''
      playerInfoContainer.appendChild(favoritesPage)
    })
    .catch(error => console.error('Error fetching favorite player list:', error));
});

function deletePlayer(playerId) {
  axios.delete(`http://localhost:3000/favorite-list/${playerId}`)
  .then(response => {
    document.getElementById('favorites-btn').click()
  })
  .catch(error => console.error('error deleting player from list', error))
}




function editPlayer(playerId) {
  const newName = prompt("Enter the new name (leave blank to keep current):")
  const newCurrentTeam = prompt("Enter the new current team (leave blank to keep current):")

  if (!newName && !newCurrentTeam) {
    alert("No changes made.")
    return
  }

  const data = {}
  if (newName) data.name = newName
  if (newCurrentTeam) data.currentTeam = newCurrentTeam

  axios.put(`http://localhost:3000/favorite-list/${playerId}`, data)
    .then(response => {
      document.getElementById('favorites-btn').click()
      alert('Player updated successfully.')
    })
    .catch(error => {
      console.error('Error updating player:', error)
      alert('Error updating player. Please try again.')
    });
}





