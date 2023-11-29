const registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const firstname = document.querySelector('#firstname').value;
  const lastname = document.querySelector('#lastname').value;
  const city = document.querySelector('#city').value;
  const street = document.querySelector('#street').value;
  const number = document.querySelector('#number').value;
  const zipcode = document.querySelector('#zipcode').value;
  const lat = document.querySelector('#lat').value;
  const long = document.querySelector('#long').value;
  const phone = document.querySelector('#phone').value;

  const newUser = {
    email: email,
    username: username,
    password: password,
    name: {
      firstname: firstname,
      lastname: lastname
    },
    address: {
      city: city,
      street: street,
      number: parseInt(number),
      zipcode: zipcode,
      geolocation: {
        lat: lat,
        long: long
      }
    },
    phone: phone
  };

  try {
    let response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    if (response.ok) {
      let Users = JSON.parse(localStorage.getItem('users')) || [];
      let UsersDeleted = JSON.parse(localStorage.getItem('usersDeleted')) || [];
      const isUserRegistered = Users.some((user) => user.email === email);
      if (isUserRegistered) {
        return alert('El usuario ya está registrado');
      }
      const deletedUserIndex = UsersDeleted.findIndex((user) => user.email === email);
      if (deletedUserIndex !== -1) {
        UsersDeleted.splice(deletedUserIndex, 1);
        localStorage.setItem('usersDeleted', JSON.stringify(UsersDeleted));
      }
      Users.push(newUser);
      localStorage.setItem('users', JSON.stringify(Users));
      alert('Usuario creado exitosamente');
      window.location.href = 'login.html';
    } else {
      console.log('Error en la solicitud:', response.status);
      alert('Error en la solicitud');
    }
  } catch (error) {
    console.log('Error en la solicitud:', error);
    alert('Error en la solicitud');
  }
});
