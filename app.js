/*const apiUrl = 'http://localhost:3000';

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email, password}),
    });
    const data = await response.json();
    if(response.ok) {
      const token = data.token
      localStorage.setItem('token', token);

      document.getElementById('result').innerHTML = 'login successful';
    } else {
      document.getElementById('result').innerHTML = `login failed: ${data.message}`;
    }
  } catch (error) {
    console.error('error during login:', error);
    document.getElementById('result').innerHTML = 'an error occured during login'
  }
}*/