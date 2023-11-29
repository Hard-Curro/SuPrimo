const resultadosContainer = document.getElementById("resultados");
const resultadoDiv = document.getElementById("resultado");

function limpiarResultados() {
  resultadosContainer.textContent = "";
  resultadoDiv.textContent = "";
}

function mostrarResultadoEnTarjeta(carrito) {
  const card = document.createElement("div");
  card.classList.add("card");

  const carritosEliminados =
    JSON.parse(localStorage.getItem("carritosDeleted")) || [];

  if (carritosEliminados.some((el) => el.id === carrito.id)) {
    return; // No mostrar carritos eliminados
  }

  const idParagraph = document.createElement("p");
  idParagraph.textContent = `ID: ${carrito.id}`;

  const fechaParagraph = document.createElement("p");
  fechaParagraph.textContent = `Fecha: ${carrito.date}`;

  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = function () {
    eliminarCarrito(carrito.id);
  };

  card.appendChild(idParagraph);
  card.appendChild(fechaParagraph);
  card.appendChild(deleteButton);

  resultadosContainer.appendChild(card);
}


function consultarTodos() {
  limpiarResultados();
  fetch("https://fakestoreapi.com/carts")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((carrito) => {
        mostrarResultadoEnTarjeta(carrito);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function consultarPorNumero() {
  const numeroCarrito = document.getElementById("numeroCarrito").value;
  limpiarResultados();
  fetch(`https://fakestoreapi.com/carts/${numeroCarrito}`)
    .then((response) => response.json())
    .then((data) => {
      mostrarResultadoEnTarjeta(data);
    })
    .catch((error) => console.error("Error:", error));
}

function consultarConLimite() {
  const numeroLimit = document.getElementById("numeroLimit").value;
  limpiarResultados();
  fetch(`https://fakestoreapi.com/carts?limit=${numeroLimit}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((carrito) => {
        mostrarResultadoEnTarjeta(carrito);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function consultarPorRangoFecha() {
  const fechaInicio = document.getElementById("fechaInicio").value;
  const fechaFin = document.getElementById("fechaFin").value;
  limpiarResultados();
  fetch(
    `https://fakestoreapi.com/carts?startdate=${fechaInicio}&enddate=${fechaFin}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((carrito) => {
        mostrarResultadoEnTarjeta(carrito);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function mostrarResultadoEnTarjeta(carrito) {
  const card = document.createElement("div");
  card.classList.add("card");

  const carritosEliminados =
    JSON.parse(localStorage.getItem("carritosDeleted")) || [];
  const carritoId = parseInt(carrito.id);

  if (carritosEliminados.some((el) => parseInt(el.id) === carritoId)) {
    return;
  }

  const idParagraph = document.createElement("p");
  idParagraph.textContent = `ID: ${carrito.id}`;

  const fechaParagraph = document.createElement("p");
  fechaParagraph.textContent = `Fecha: ${carrito.date}`;

  const productosParagraph = document.createElement("p");
  productosParagraph.textContent = `Productos: ${JSON.stringify(carrito.products)}`;

  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = function () {
    eliminarCarrito(carrito.id, this);
  };

  card.appendChild(idParagraph);
  card.appendChild(fechaParagraph);
  card.appendChild(productosParagraph);
  card.appendChild(deleteButton);

  resultadosContainer.appendChild(card);
}


function eliminarCarrito(id, botonEliminar) {
  // Hacer la solicitud DELETE a la API para obtener información del carrito
  fetch(`https://fakestoreapi.com/carts/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el carrito");
      }
      return response.json(); // Obtener información del carrito eliminado
    })
    .then((carritoEliminado) => {
      // Obtener la información del carrito desde la respuesta DELETE
      const carritoInfo = {
        id: id,
        data: JSON.stringify(carritoEliminado), // Convertir a JSON o ajustar según la respuesta real
      };

      // Agregar carritoInfo a carritosDeleted
      const carritosEliminados =
        JSON.parse(localStorage.getItem("carritosDeleted")) || [];
      carritosEliminados.push(carritoInfo);

      // Actualizar carritosDeleted en localStorage
      localStorage.setItem(
        "carritosDeleted",
        JSON.stringify(carritosEliminados)
      );

      // Eliminar la tarjeta de la vista
      botonEliminar.parentNode.remove();
    })
    .catch((error) => console.error("Error:", error));
}

function consultarUsersConLimite() {
  limpiarResultados();
  // Obtener el valor del input
  var num = document.getElementById("numeroLimite").value;

  // Llamar a la función con el número como argumento
  obtenerUsuarios(num);
}

function obtenerUsuarios(num) {
  // Construir la URL con el número ingresado
  var url = `https://fakestoreapi.com/users?limit=${num}`;

  // Realizar la solicitud a la API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Mostrar los resultados en tarjetas
      mostrarTarjetas(data);
    })
    .catch((error) => console.error("Error al consultar la API:", error));
}

function mostrarTarjetas(users) {
  // Obtener el elemento donde se mostrarán las tarjetas
  var resultadoDiv = document.getElementById("resultado");

  // Limpiar contenido previo
  while (resultadoDiv.firstChild) {
    resultadoDiv.removeChild(resultadoDiv.firstChild);
  }

  // Crear una tarjeta por cada usuario en la respuesta
  users.forEach((user) => {
    var card = document.createElement("div");
    card.classList.add("user-card");

    var usernameHeading = document.createElement("h3");
    usernameHeading.textContent = user.username;

    var emailParagraph = document.createElement("p");
    emailParagraph.textContent = `Email: ${user.email}`;

    var phoneParagraph = document.createElement("p");
    phoneParagraph.textContent = `Telef: ${user.phone}`;

    card.appendChild(usernameHeading);
    card.appendChild(emailParagraph);
    card.appendChild(phoneParagraph);

    resultadoDiv.appendChild(card);
  });
}


function AñadirProducto() {
  // Obtener los valores del formulario
  const userId = document.getElementById("userId").value;
  const date = document.getElementById("date").value;
  const productId = document.getElementById("productId").value;
  const quantity = document.getElementById("quantity").value;

  // Crear el objeto de datos
  const data = {
    userId: userId,
    date: date,
    products: [{ productId: productId, quantity: quantity }],
  };

  // Realizar la solicitud fetch
  fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("cardMod", JSON.stringify(data));
      eliminarCarrito(userId);
    })
    .catch((error) => {
      console.error("Error al enviar la solicitud:", error);
    });
}

function EditarProducto() {
  // Obtener los valores del formulario
  const userId = document.getElementById("userId").value;
  const date = document.getElementById("date").value;
  const productId = document.getElementById("productId").value;
  const quantity = document.getElementById("quantity").value;

  // Crear el objeto de datos
  const data = {
    userId: userId,
    date: date,
    products: [{ productId: productId, quantity: quantity }],
  };

  // Realizar la solicitud fetch
  fetch(`https://fakestoreapi.com/carts/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("cardMod", JSON.stringify(data));
      eliminarCarrito(userId);
    })
    .catch((error) => {
      console.error("Error al enviar la solicitud:", error);
    });
}
