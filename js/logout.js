// Obtén el botón de logout
const logoutButton = document.querySelector("#logoutButton");

// Agrega el evento click al botón de logout
logoutButton.addEventListener("click", () => {
  // Elimina el usuario almacenado en el sessionStorage
  sessionStorage.removeItem("users");
  // Redirige al login.html (o a la página de inicio de sesión)
  window.location.href = "login.html";
});
