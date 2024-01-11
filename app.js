function getRegistrationData(){
  const username = document.getElementById('username').value;
  return { username }

}

function registerUser(event) {
  event.preventDefault();
  const registrationData = getRegistrationData();

  axios.post('https://football-centre-4c09b58d53b0.herokuapp.com//users/register', registrationData)
      .then(response => {
        console.log(response.data)

        window.location.href = `homePage/homePage.html`;
      })
      .catch(error => {
        console.error(error)
      })
}

document.getElementById('submit-btn').addEventListener('click', registerUser)