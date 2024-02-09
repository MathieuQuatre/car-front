async function loginUser(credentials) {
    return fetch('http://localhost:4001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json());
  }
  
  export { loginUser };
  