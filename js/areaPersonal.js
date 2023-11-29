document.addEventListener("DOMContentLoaded", function() {
    // Obtener la información del sessionStorage
    var usersData = JSON.parse(sessionStorage.getItem("users"));
  
    // Crear un string con la información a mostrar
    var userInfo = "<ul>";

    userInfo += "<li>Username: " + usersData.username + "</li>";
    userInfo += "<li>Firstname: " + usersData.name.firstname + "</li>";
    userInfo += "<li>Lastname: " + usersData.name.lastname + "</li>";
    userInfo += "<li>Email: " + usersData.email + "</li>";
    userInfo += "<li>Phone: " + usersData.phone + "</li>";
    userInfo += "<li>City: " + usersData.address.city + "</li>";
    userInfo += "<li>Street: " + usersData.address.street + "</li>";
    userInfo += "<li>Number: " + usersData.address.number + "</li>";
    userInfo += "<li>Zipcode: " + usersData.address.zipcode + "</li>";
    userInfo += "<li>Latitude: " + usersData.address.geolocation.lat + "</li>";
    userInfo += "<li>Longitude: " + usersData.address.geolocation.long + "</li>";

    userInfo += "</ul>";
  
    // Mostrar la información en el elemento con id "user-info"
    var userInfoElement = document.getElementById("user-info");
    userInfoElement.innerHTML = userInfo;

    
  });

// Eliminar usuario
// Obtener el botón
const deleteButton = document.querySelector('#deleteButton');
// Agregar evento de clic al botón
deleteButton.addEventListener('click', async () => {
  // Obtener el id y el email del sessionStorage "users"
  const userData = JSON.parse(sessionStorage.getItem('users'));
  const id = userData.id;
  const email = userData.email;
  try {
    // Buscar el usuario por email en el localStorage "users"
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === email);
    
    if (userIndex !== -1) {
      // Usuario existe en el localStorage "users", eliminar y agregar al localStorage "usersDeleted"
      const deletedUser = users.splice(userIndex, 1)[0];
      localStorage.setItem('users', JSON.stringify(users));
      
      const usersDeleted = JSON.parse(localStorage.getItem('usersDeleted')) || [];
      usersDeleted.push(deletedUser);
      localStorage.setItem('usersDeleted', JSON.stringify(usersDeleted));
      
      console.log('Usuario eliminado del localStorage "users" y agregado al localStorage "usersDeleted"');
    } else {
      // Usuario no existe en el localStorage "users", eliminar usando la API y agregar al localStorage "usersDeleted"
      await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE"
      });

      const response = await fetch(`https://fakestoreapi.com/users/${id}`);
      const deletedUser = await response.json();

      const usersDeleted = JSON.parse(localStorage.getItem('usersDeleted')) || [];
      usersDeleted.push(deletedUser);
      localStorage.setItem('usersDeleted', JSON.stringify(usersDeleted));

      console.log('Usuario eliminado usando la API y agregado al localStorage "usersDeleted"');
    }
  } catch (error) {
    console.log(error);
  }
  
  // Eliminar el usuario almacenado en el sessionStorage
  sessionStorage.removeItem('users');
  window.location.href = 'login.html';

});
var usersData = JSON.parse(sessionStorage.getItem("users"));
var id = usersData.id;

console.log("ID de Usuario:", id);

fetch(`https://fakestoreapi.com/carts/user/${id}`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status}`);
        }
        return res.json();
    })
    .then(json => {
        console.log('Respuesta de la API de carritos:', json);

        // Verificar si la respuesta contiene datos y es un array
        if (json && Array.isArray(json)) {
            // Obtén el contenedor donde se mostrarán las tarjetas
            const container = document.getElementById('resultados-container');

            // Limpiar el contenedor antes de agregar tarjetas
            container.innerHTML = '';

            // Itera sobre los resultados y crea una tarjeta para cada uno
            json.forEach(result => {
                const carritoCard = document.createElement('div');
                carritoCard.classList.add('carritoCard');

                // Añade contenido a la tarjeta (puedes personalizar esto según tus datos)
                carritoCard.innerHTML = `
                    <p>ID: ${result.id}</p>
                    <p>Fecha: ${result.date}</p>
                    <div class="card-content">
                        <p>Productos: ${result.products}</p>
                    </div>
                `;

                // Agrega la tarjeta al contenedor
                container.appendChild(carritoCard);

                // Agrega el evento clic para expandir la tarjeta
                carritoCard.addEventListener('click', () => {
                    carritoCard.classList.toggle('expanded');
                });
            });
        } else {
            console.error('La respuesta de la API de carritos no contiene datos válidos.');
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));

    // Obtener el usuario actual de sessionStorage
const currentUser = JSON.parse(sessionStorage.getItem('users'));

function modifyUser() {
    // Obtener valores del formulario
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const zipcode = document.getElementById('zipcode').value;
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;

    // Realizar la solicitud de modificación al servidor
    fetch(`https://fakestoreapi.com/users/${currentUser.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          name: {
              firstname: document.getElementById('firstname').value,
              lastname: document.getElementById('lastname').value
          },
            address: {
                city: city,
                street: street,
                number: number,
                zipcode: zipcode,
                geolocation: {
                    lat: lat,
                    long: long
                }
            },
            phone: currentUser.phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(updatedUser => {
        // Almacenar el usuario modificado en localStorage
        localStorage.setItem('users', JSON.stringify(updatedUser));

        // Almacenar el usuario actual de sessionStorage en localStorage "usersDeleted"
        const usersDeleted = JSON.parse(localStorage.getItem('usersDeleted')) || [];
        usersDeleted.push(currentUser);
        localStorage.setItem('usersDeleted', JSON.stringify(usersDeleted));

        // Limpiar sessionStorage y redirigir a la página de logout
        sessionStorage.clear();
        window.location.href = 'login.html';
    })
    .catch(error => console.error('Error:', error));
}


    


