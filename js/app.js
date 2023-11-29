let IDCarrito = 49;
(function () {
  const carritoContainer = document.querySelector("#carrito");
  const listaCarrito = document.querySelector("#lista-carrito tbody");
  const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
  const listaCursos = document.querySelector("#lista-cursos");
  const precioTotal = document.querySelector("#precio-total");
  const confirmarCompraBtn = document.querySelector("#confirmar-compra");

  let carritoItems = [];

  listaCursos.addEventListener("click", agregarCurso);
  carritoContainer.addEventListener("click", gestionarCantidad);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  confirmarCompraBtn.addEventListener("click", confirmarCompra);

  function agregarCurso(event) {
    event.preventDefault();
    const elementoClickeado = event.target;

    if (elementoClickeado.classList.contains("agregar-carrito")) {
      const cursoSeleccionado = obtenerDatosCurso(elementoClickeado.parentElement);
      agregarCursoAlCarrito(cursoSeleccionado);
    }
  }

  function obtenerDatosCurso(cursoElemento) {
    const imagenCurso = cursoElemento.querySelector("img").src;
    const nombreCurso = cursoElemento.querySelector("h3").textContent;
    const precioCurso = cursoElemento.querySelector(".price").textContent;
    const idCurso = cursoElemento.querySelector("a").dataset.id;

    return {
      imagen: imagenCurso,
      nombre: nombreCurso,
      precio: precioCurso,
      id: idCurso,
      cantidad: 1,
    };
  }

  function confirmarCompra() {
    IDCarrito++;

    // Obtén la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split("T")[0];

      // Obtener el usuario actual de sessionStorage
  const usuarioActualStr = sessionStorage.getItem("users");
  const usuarioActual = JSON.parse(usuarioActualStr);

  // Extraer la ID del usuario
  const userId = usuarioActual.id;

    // Construye la estructura del objeto carrito
    const carritoUsuario = {
      id: IDCarrito,
      userId: userId,
      date: fechaActual,
      products: carritoItems.map((producto) => ({
        productId: producto.id,
        quantity: producto.cantidad,
      })),
    };

    // Almacena el carrito en localStorage con una clave "CarritoID"
    localStorage.setItem("Carrito " + IDCarrito, JSON.stringify(carritoUsuario));

    // Limpia el carrito actual
    vaciarCarrito();
  }

  function agregarCursoAlCarrito(curso) {
    const cursoExistente = carritoItems.find((item) => item.id === curso.id);

    if (cursoExistente) {
      cursoExistente.cantidad++;
    } else {
      carritoItems.push(curso);
    }

    actualizarCarrito();
  }

  function gestionarCantidad(event) {
    if (event.target.classList.contains("borrar-curso")) {
      const cursoId = event.target.dataset.id;
      carritoItems = carritoItems.filter((item) => item.id !== cursoId);
    } else if (event.target.classList.contains("restar-curso")) {
      const cursoId = event.target.dataset.id;
      const cursoExistente = carritoItems.find((item) => item.id === cursoId);

      if (cursoExistente && cursoExistente.cantidad > 1) {
        cursoExistente.cantidad--;
      }
    } else if (event.target.classList.contains("sumar-curso")) {
      const cursoId = event.target.dataset.id;
      const cursoExistente = carritoItems.find((item) => item.id === cursoId);

      if (cursoExistente) {
        cursoExistente.cantidad++;
      }
    }

    actualizarCarrito();
  }

  function vaciarCarrito() {
    carritoItems = [];
    actualizarCarrito();
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    let totalPrecio = 0;

    carritoItems.forEach((curso) => {
      const filaCarrito = document.createElement("tr");
      const precioPorUnidad = parseFloat(curso.precio);
      const subtotal = precioPorUnidad * curso.cantidad;
      totalPrecio += subtotal;

      filaCarrito.innerHTML = `
        <td>
          <img src="${curso.imagen}" width="100" alt="${curso.nombre}" />
        </td>
        <td>${curso.nombre}</td>
        <td>${precioPorUnidad.toFixed(2)}$</td>
        <td>
          <button class="restar-curso" data-id="${curso.id}">-</button>
          ${curso.cantidad}
          <button class="sumar-curso" data-id="${curso.id}">+</button>
        </td>
        <td>${subtotal.toFixed(2)}$</td>
        <td>
          <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
      `;

      listaCarrito.appendChild(filaCarrito);
    });

    precioTotal.textContent = `${totalPrecio.toFixed(2)}$`;
  }
})();
