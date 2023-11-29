document.addEventListener("DOMContentLoaded", function() {
  // Obtener la información del sessionStorage
  var usersData = JSON.parse(sessionStorage.getItem("users"));

  // Crear un elemento de lista no ordenada (ul)
  var userInfoList = document.createElement("ul");

  // Crear nodos de texto para cada campo y agregarlos a la lista
  addListItem(userInfoList, "Username", usersData.username);
  addListItem(userInfoList, "Firstname", usersData.name.firstname);
  addListItem(userInfoList, "Lastname", usersData.name.lastname);
  addListItem(userInfoList, "Email", usersData.email);
  addListItem(userInfoList, "Phone", usersData.phone);
  addListItem(userInfoList, "City", usersData.address.city);
  addListItem(userInfoList, "Street", usersData.address.street);
  addListItem(userInfoList, "Number", usersData.address.number);
  addListItem(userInfoList, "Zipcode", usersData.address.zipcode);
  addListItem(userInfoList, "Latitude", usersData.address.geolocation.lat);
  addListItem(userInfoList, "Longitude", usersData.address.geolocation.long);

  // Obtener el elemento con id "user-info"
  var userInfoElement = document.getElementById("user-info");

  // Limpiar el contenido existente del elemento
  userInfoElement.textContent = '';

  // Agregar la lista al elemento "user-info"
  userInfoElement.appendChild(userInfoList);
});

// Función para agregar un elemento de lista a la lista
function addListItem(list, label, value) {
  // Crear un elemento de lista (li)
  var listItem = document.createElement("li");

  // Crear un nodo de texto con la etiqueta y el valor
  var textNode = document.createTextNode(`${label}: ${value}`);

  // Agregar el nodo de texto al elemento de lista
  listItem.appendChild(textNode);

  // Agregar el elemento de lista a la lista principal
  list.appendChild(listItem);
}

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

          // Itera sobre los resultados y crea una tarjeta para cada uno
          json.forEach(result => {
  // Crear la tarjeta carritoCard
  const carritoCard = document.createElement("div");
  carritoCard.classList.add("carritoCard");

  // Crear nodos de texto para cada campo
  const idNode = document.createElement("p");
  idNode.textContent = `ID: ${result.id}`;
  const fechaNode = document.createElement("p");
  fechaNode.textContent = `Fecha: ${result.date}`;

  // Crear el contenedor para productos
  const productosContainer = document.createElement("div");
  productosContainer.classList.add("card-content");
  const productosNode = document.createElement("p");
  productosNode.textContent = `Productos: ${JSON.stringify(result.products)}`;
  productosContainer.appendChild(productosNode);

  // Añadir nodos al contenedor de la tarjeta
  carritoCard.appendChild(idNode);
  carritoCard.appendChild(fechaNode);
  carritoCard.appendChild(productosContainer);

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


// Obtener el contenedor donde se mostrarán las tarjetas
const container = document.getElementById('resultados-container2');

var lastProductId = localStorage.getItem("lastProductId");
// Supongamos que tienes los carritos almacenados en el localStorage con nombres como "Carrito1", "Carrito2", etc.

const lastIdCard = parseInt(localStorage.getItem("lastIdCard")) || 0;
for (let i = 50; i <= lastIdCard; i++) {
  const carritoKey = "Carrito " + i;

  // Obtener el elemento de localStorage
  const Carrito = JSON.parse(localStorage.getItem(carritoKey));

  // Acceder a la propiedad userId
  const userId = Carrito.userId;

  if (userId === usersData.id) {
  // Crear la tarjeta carritoCard2
  const carritoCard2 = document.createElement("div");
  carritoCard2.classList.add("carritoCard2");

  // Crear nodos de texto para cada campo
  const idNode = document.createElement("p");
  idNode.textContent = `ID: ${Carrito.id}`;
  const fechaNode = document.createElement("p");
  fechaNode.textContent = `Fecha: ${Carrito.date}`;

  // Crear el contenedor para productos
  const productosContainer = document.createElement("div");
  productosContainer.classList.add("card-content");
  const productosNode = document.createElement("p");
  productosNode.textContent = `Productos: ${JSON.stringify(Carrito.products)}`;
  productosContainer.appendChild(productosNode);

  // Añadir nodos al contenedor de la tarjeta
  carritoCard2.appendChild(idNode);
  carritoCard2.appendChild(fechaNode);
  carritoCard2.appendChild(productosContainer);

      // Agrega la tarjeta al contenedor
      container.appendChild(carritoCard2);

      // Agrega el evento clic para expandir la tarjeta
      carritoCard2.addEventListener('click', () => {
          carritoCard2.classList.toggle('expanded');
      });
  }
}

  


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

  
  


