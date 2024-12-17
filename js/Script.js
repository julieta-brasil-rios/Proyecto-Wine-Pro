let carrito = [];
const carritoItems = document.getElementById("carrito-items");
const totalPrecio = document.getElementById("total-precio");

document.addEventListener("DOMContentLoaded", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      actualizarCarrito();
  }
});

fetch('productos.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Aquí accedes a los productos
    mostrarProductos(data.productos);
  })
  .catch((error) => console.error('Error al cargar el JSON:', error));

// Ejemplo de cómo mostrar los productos
function mostrarProductos(productos) {
    productos.forEach(producto => {
        console.log(`Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
    });
}

const botonesComprar = document.querySelectorAll(".comprar-btn");
botonesComprar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const productoCard = boton.parentElement;
        const id = productoCard.getAttribute("data-id");
        const nombre = productoCard.getAttribute("data-name");
        const precioTexto = productoCard.querySelector(".precio").textContent;
        const precio = parseFloat(precioTexto.replace("$", "").replace(".", ""));

        agregarProductoAlCarrito({ id, nombre, precio });
    });
});



function agregarProductoAlCarrito(producto) {
  const existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
      existe.cantidad++;
  } else {
      producto.cantidad = 1;
      carrito.push(producto);
  }

  actualizarCarrito();
}


function actualizarCarrito() {
  carritoItems.innerHTML = ""; // Limpiar el carrito

  let total = 0;
  carrito.forEach((producto) => {
      const item = document.createElement("div");
      item.classList.add("carrito-item");
      item.innerHTML = `
          <p>${producto.nombre} - $${producto.precio.toLocaleString()} x ${producto.cantidad}</p>
          <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
      `;
      carritoItems.appendChild(item);

      total += producto.precio * producto.cantidad;
  });

  totalPrecio.textContent = total.toLocaleString();


  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  actualizarCarrito();
}


document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});