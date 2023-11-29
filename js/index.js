// Obtener los productos de la API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    const productCards = document.getElementById('product-cards');
    // Crear una tarjeta para cada producto
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Agregar el evento onclick a la tarjeta
      card.onclick = function() {
        redirectToAnotherPage(product.id);// Pasar el ID del producto a la función redirectToAnotherPage
      };

      const image = document.createElement('img');
      image.src = product.image;
      card.appendChild(image);

      const name = document.createElement('h3');
      name.textContent = product.title;
      card.appendChild(name);

      const price = document.createElement('p');
      price.classList.add('price');
      price.textContent = `Precio: $${product.price}`;
      card.appendChild(price);

      productCards.appendChild(card);
    });
  })
  .catch(error => console.log(error));

  function redirectToAnotherPage(productId) {
    // Redirigir a otra página utilizando el ID del producto
    const IDobjeto = productId; // Asignar el ID del producto a la variable IDobjeto
    window.location.href = `produc.html?id=${IDobjeto}`;
  }