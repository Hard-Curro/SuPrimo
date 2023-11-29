const registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  const city = document.querySelector("#city").value;
  const street = document.querySelector("#street").value;
  const number = document.querySelector("#number").value;
  const zipcode = document.querySelector("#zipcode").value;
  const lat = document.querySelector("#lat").value;
  const long = document.querySelector("#long").value;
  const phone = document.querySelector("#phone").value;
  let nextUserId = 50;

  try {
    // Obtener todos los usuarios
    let response = await fetch("https://fakestoreapi.com/users");
    let allUsers = await response.json();
  
    // Verificar si el correo electrónico ya está registrado
    let isUserRegistered = false;
    const lowerCaseEmail = email.toLowerCase();

    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      if (user.email === lowerCaseEmail) {
        isUserRegistered = true;
        break; // Termina el bucle si el correo electrónico ya está registrado
      }
    }
  
    if (isUserRegistered) {
      alert("El correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.");
      return; // Termina la función si el correo electrónico ya está registrado
    }

  const newUser = {
    email: email,
    username: username,
    password: password,
    name: {
      firstname: firstname,
      lastname: lastname,
    },
    address: {
      city: city,
      street: street,
      number: parseInt(number),
      zipcode: zipcode,
      geolocation: {
        lat: lat,
        long: long,
      },
    },
    phone: phone,
  };
  // Asigna el ID y luego incrementa el valor para el próximo usuario
  newUser.id = nextUserId++;

  try {
    let response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      let Users = JSON.parse(localStorage.getItem("users")) || [];
      let UsersDeleted = JSON.parse(localStorage.getItem("usersDeleted")) || [];
      const isUserRegistered = Users.some((user) => user.email === email);
      if (isUserRegistered) {
        return alert("El correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.");
      }
      
      const deletedUserIndex = UsersDeleted.findIndex(
        (user) => user.email === email
      );
      if (deletedUserIndex !== -1) {
        UsersDeleted.splice(deletedUserIndex, 1);
        localStorage.setItem("usersDeleted", JSON.stringify(UsersDeleted));
      }
      Users.push(newUser);
      localStorage.setItem("users", JSON.stringify(Users));

      alert("Usuario creado exitosamente");
      window.location.href = "login.html";
    } else {
      console.log("Error en la solicitud:", response.status);
      alert("Error en la solicitud");
    }
  } catch (error) {
    console.log("Error en la solicitud:", error);
    alert("Error en la solicitud");
  }
} catch (error) {
  console.log("Error al obtener los usuarios:", error);
  alert("Error al obtener los usuarios. Por favor, inténtalo de nuevo.");
}
});