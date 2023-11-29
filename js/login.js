// Primero cogemos los datos del formulario
const loginForm = document.querySelector("#loginForm");
// Agregamos el evento submit
loginForm.addEventListener("submit", async (e) => {
  // Llamamos a la funcion preventDefault para que no se nos recargue la página
  e.preventDefault();
  // Obtenemos los datos del formulario
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  // No permite a los usuario de la api eliminados entrar
  const UsersDeletd = JSON.parse(localStorage.getItem("usersDeleted")) || [];
  const validUserDeleted = UsersDeletd.find(
    (user) => user.username === username && user.password === password
  );

  if (validUserDeleted) {
    alert("Usuario no encontrado");
    window.location.href = "login.html";
  }

  // Nos traemos la base de datos del localStorage
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  // Vamos a hacer un find a la base de datos para buscar el correo y la contraseña
  const validUser = Users.find(
    (user) => user.username === username && user.password === password
  );
  // Validamos si está registrado ya
  if (!validUser) {
    // Si el usuario no existe en el localStorage, intentamos iniciar sesión con la API
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        /*              const data = await response.json();
                // Guardar el token de autenticación en el localStorage o en una cookie
                sessionStorage.setItem('users', data.token);  */
        buscarUsuario(username);
      } else {
        alert("Datos incorrectos");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    // alert(`Bienvenido ${validUser.username}`);
    // Añadimos el usuario a sessionStorage
    sessionStorage.setItem("users", JSON.stringify(validUser));
    // Redirigimos al index
    window.location.href = "../index.html";
  }
});

function buscarUsuario(nombre) {
  fetch("https://fakestoreapi.com/users")
    .then((response) => response.json())
    .then((data) => {
      const usuarioEncontrado = data.find(
        (usuario) => usuario.username === nombre
      );
      if (usuarioEncontrado) {
        const idUsuario = usuarioEncontrado.id;
        fetch(`https://fakestoreapi.com/users/${idUsuario}`)
          .then((response) => response.json())
          .then((usuarioData) => {
            sessionStorage.setItem("users", JSON.stringify(usuarioData));
            console.log("Datos del usuario almacenados en sessionStorage");
            // Redirigir a la página de inicio después de almacenar los datos del usuario
            window.location.href = "../index.html";
          })
          .catch((error) =>
            console.log("Error al obtener los datos del usuario:", error)
          );
      } else {
        console.log("No se encontró ningún usuario con ese nombre.");
      }
    })
    .catch((error) => console.log("Error al buscar el usuario:", error));
}
