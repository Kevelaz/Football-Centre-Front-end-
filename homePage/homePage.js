const getPlayerData = async (playerId) => {
  try {
    const response = await axios.get(`/football-centre/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('error fetching player data', error)
    throw error;
  }
};

const handleSearch = async(event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const currentTeamInput = document.getElementById('currentTeam')
  const nationalityInput = document.getElementById('nationality');
  const playerDataContainer = document.getElementById('playerDatacontainer');

  try {
    const playerDetails = {
      name: nameInput.value.trim(),
      currentTeam: currentTeamInput.value.trim(),
      nationality: nationalityInput.value.trim(),
    };
    if(!playerDetails.name || !playerDetails.currentTeam || !playerDetails.nationality) {
      alert('Please fill all fields');
      return;
    }
    const playerData = await getPlayerData(playerDetails);

    playerDataContainer.innerHTML = `
    <p>Name: ${playerData.name} </p>
    <p>Current Team: ${playerData.currentTeam}</p>
    <p>Nationality:${playerData.nationality}</p>
    `;
  } catch (error) {
    console.error('error in search function', error)
    alert('Error in fetching player data. Please try again.');
  }
};