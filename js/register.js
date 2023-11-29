// Primero cogemos los datos del formulario
const registerForm = document.querySelector('#registerForm');
// Agregamos el evento submit
registerForm.addEventListener('submit', async (e) => {
  // Recibimos el evento y llamamos a la función preventDefault para que no se recargue la página
  e.preventDefault();
  // Obtenemos los datos del formulario
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
  // Vamos a crear el localStorage donde se van a almacenar los usuarios
  let Users = JSON.parse(localStorage.getItem('users')) || [];
  // Verificamos si el usuario ya existe en el localStorage
  const isUserRegistered = Users.some((user) => user.email === email);
  if (isUserRegistered) {
    return alert('El usuario ya está registrado');
  }
  // Agregamos el usuario creado manualmente al localStorage
  const newUser = {
    email: email,
    username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
    city: city,
    street: street,
    number: number,
    zipcode: zipcode,
    lat: lat,
    long: long,
    phone: phone,
  };
  Users.push(newUser);
  // Obtenemos los usuarios de la API
  try {
    const response = await fetch('https://fakestoreapi.com/users');
    const apiUsers = await response.json();
    // Agregamos los usuarios de la API al localStorage sin duplicados
    apiUsers.forEach((apiUser) => {
      const isApiUserRegistered = Users.some(
        (user) => user.email === apiUser.email
      );
      if (!isApiUserRegistered) {
        Users.push(apiUser);
      }
    });
    localStorage.setItem('users', JSON.stringify(Users));
    alert('Registro completado');
    // Redirigimos al login
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Error al obtener los usuarios de la API:', error);
  }
});