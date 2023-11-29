document.addEventListener("DOMContentLoaded", function() {
    // Obtener la información del sessionStorage
    var usersData = JSON.parse(sessionStorage.getItem("users"));
  
    // Crear un string con la información a mostrar
    var userInfo = "<ul>";

    userInfo += "<li>Username: " + usersData.username + "</li>";
    userInfo += "<li>Firstname: " + usersData.firstname + "</li>";
    userInfo += "<li>Lastname: " + usersData.lastname + "</li>";
    userInfo += "<li>Email: " + usersData.email + "</li>";
    userInfo += "<li>Phone: " + usersData.phone + "</li>";
    userInfo += "<li>City: " + usersData.city + "</li>";
    userInfo += "<li>Street: " + usersData.street + "</li>";
    userInfo += "<li>Number: " + usersData.number + "</li>";
    userInfo += "<li>Zipcode: " + usersData.zipcode + "</li>";
    userInfo += "<li>Latitude: " + usersData.lat + "</li>";
    userInfo += "<li>Longitude: " + usersData.long + "</li>";

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