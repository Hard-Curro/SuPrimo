// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Obtener el producto de la API
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(response => response.json())
  .then(product => {
    const productDetails = document.getElementById('product-details');
    // Crear elementos HTML para mostrar los detalles del producto
    const title = document.createElement('h2');
    title.textContent = product.title;
    productDetails.appendChild(title);
    
    const image = document.createElement('img');
    image.src = product.image;
    productDetails.appendChild(image);

    const description = document.createElement('p');
    description.textContent = product.description;
    productDetails.appendChild(description);

    const price = document.createElement('p');
    price.textContent = `Precio: $${product.price}`;
    productDetails.appendChild(price);
  })
  .catch(error => console.log(error));