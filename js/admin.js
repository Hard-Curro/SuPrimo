const resultadosContainer = document.getElementById('resultados');

function limpiarResultados() {
  resultadosContainer.innerHTML = '';
}

function mostrarResultadoEnTarjeta(carrito) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Verificar si la id del carrito coincide con algún carrito en carritosDeleted
  const carritosEliminados = JSON.parse(localStorage.getItem('carritosDeleted')) || [];
  if (carritosEliminados.some(el => el.id === carrito.id)) {
    return; // No mostrar carritos eliminados
  }

  card.innerHTML = `
    <p>ID: ${carrito.id}</p>
    <p>Fecha: ${carrito.date}</p>
    <button class="deleteButton" onclick="eliminarCarrito('${carrito.id}')">Eliminar</button>
  `;

  resultadosContainer.appendChild(card);
}

function consultarTodos() {
  limpiarResultados();
  fetch('https://fakestoreapi.com/carts')
    .then(response => response.json())
    .then(data => {
      data.forEach(carrito => {
        mostrarResultadoEnTarjeta(carrito);
      });
    })
    .catch(error => console.error('Error:', error));
}

function consultarPorNumero() {
  const numeroCarrito = document.getElementById('numeroCarrito').value;
  limpiarResultados();
  fetch(`https://fakestoreapi.com/carts/${numeroCarrito}`)
    .then(response => response.json())
    .then(data => {
      mostrarResultadoEnTarjeta(data);
    })
    .catch(error => console.error('Error:', error));
}

function consultarConLimite() {
  const numeroLimit = document.getElementById('numeroLimit').value;
  limpiarResultados();
  fetch(`https://fakestoreapi.com/carts?limit=${numeroLimit}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(carrito => {
        mostrarResultadoEnTarjeta(carrito);
      });
    })
    .catch(error => console.error('Error:', error));
}

function consultarPorRangoFecha() {
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;
  limpiarResultados();
  fetch(`https://fakestoreapi.com/carts?startdate=${fechaInicio}&enddate=${fechaFin}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(carrito => {
        mostrarResultadoEnTarjeta(carrito);
      });
    })
    .catch(error => console.error('Error:', error));
}

function mostrarResultadoEnTarjeta(carrito) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    // Verificar si la id del carrito coincide con algún carrito en carritosDeleted
    const carritosEliminados = JSON.parse(localStorage.getItem('carritosDeleted')) || [];
    const carritoId = parseInt(carrito.id); // Convertir la ID del carrito actual a un número
  
    if (carritosEliminados.some(el => parseInt(el.id) === carritoId)) {
      return; // No mostrar carritos eliminados
    }
  
    card.innerHTML = `
      <p>ID: ${carrito.id}</p>
      <p>Fecha: ${carrito.date}</p>
      <p>Productos: ${carrito.products}</p>
      <button class="deleteButton" onclick="eliminarCarrito('${carrito.id}', this)">Eliminar</button>
    `;
  
    resultadosContainer.appendChild(card);
  }
  
  function eliminarCarrito(id, botonEliminar) {
    // Hacer la solicitud DELETE a la API para obtener información del carrito
    fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el carrito');
        }
        return response.json(); // Obtener información del carrito eliminado
      })
      .then(carritoEliminado => {
        // Obtener la información del carrito desde la respuesta DELETE
        const carritoInfo = {
          id: id,
          data: JSON.stringify(carritoEliminado), // Convertir a JSON o ajustar según la respuesta real
        };
  
        // Agregar carritoInfo a carritosDeleted
        const carritosEliminados = JSON.parse(localStorage.getItem('carritosDeleted')) || [];
        carritosEliminados.push(carritoInfo);
  
        // Actualizar carritosDeleted en localStorage
        localStorage.setItem('carritosDeleted', JSON.stringify(carritosEliminados));
  
        // Eliminar la tarjeta de la vista
        botonEliminar.parentNode.remove();
      })
      .catch(error => console.error('Error:', error));
  }
  
  function consultarUsersConLimite() {
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
      .then(response => response.json())
      .then(data => {
        // Mostrar los resultados en tarjetas
        mostrarTarjetas(data);
      })
      .catch(error => console.error('Error al consultar la API:', error));
  }

  function mostrarTarjetas(users) {
    // Obtener el elemento donde se mostrarán las tarjetas
    var resultadoDiv = document.getElementById("resultado");

    // Limpiar contenido previo
    resultadoDiv.innerHTML = '';

    // Crear una tarjeta por cada usuario en la respuesta
    users.forEach(user => {
      var card = document.createElement("div");
      card.classList.add("user-card");
      card.innerHTML = `
        <h3>${user.username}</h3>
        <p>Email: ${user.email}</p>
        <p>Telef: ${user.phone}</p>
      `;
      resultadoDiv.appendChild(card);
    });
  }