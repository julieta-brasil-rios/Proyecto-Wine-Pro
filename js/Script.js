const header = document.querySelector('.header');

// Evento de scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) { // Si el scroll es mayor a 100px
    header.classList.add('transparent'); // Añade la clase transparente
  } else {
    header.classList.remove('transparent'); // Remueve la clase transparente
  }
});

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart =document.querySelector("#close-cart");


cartIcon.onclick =() => {
  cart.classList.add("active");
};

closeCart.onclick =() => {
  cart.classList.remove("active");
};



if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready(){
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button= removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
   var input =quantityInputs[i];
   input.addEventListener("change", quantityChanged);
  }
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document.getElementsByClassName("btn-buy")[0].addEventListener("click" , buyButtonClicked);
}


function buyButtonClicked(){
  alert("tu orden esta hecha");
  var cartContent = document.getElementsByClassName("cart-content");
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.fristChild);
  }
  updatetotal();
}


function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("precio")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}


function addProductToCart(title, price, productImg){
  var cartShopBox = document.createElement("div");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++){
    alert("ya has añadido este artículo al carrito");
  return;
  }

}

var cartBoxContent = `
                  <img src=${productImg} alt="" class="cart-img">
                    <div class="detalle-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>

                    <i class='bx bxs-trash-alt cart-remove'></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
.getElementsByClassName("cart-remove")[0]
.addEventListener("click", removeCartItem);
cartShopBox
.getElementsByClassName("cart-quantity")[0]
.addEventListener("change", quantityChanged);

function updatetotal(){
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;

      
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
  
}

// let cart =[];
// const cartCount = document.getElementById("cart-count");
// const cartItems = document.getElementById("carrito");
// const cartModal = document.getElementById("cart-modal");
// const finalizarCarrito = document.getElementById("finalizar-carrito");
// const finalizarButton = document.getElementById("finalizar");
// const totalElement = document.getElementById("total");
// const gracias = document.getElementById("gracias");
// const graciasCerrar =document.getElementById("cerrar");

// document.querySelectorAll(".comprar-btn").forEach((button) => {
//   button.addEventListener("click" , function(event)
// {
// event.preventDefault();
//    const productoCard= button.closest("producto-card");
//    const productName = productoCard.querySelector("h3").texContent;
//    const productPrecio = parseFloat(productoCard.querySelector(".precio").textContent.replace("$", ""));
//    const product ={ name:productName, precio: productPrecio};
//    cart.push(product);
//    updateCartCount ();
//    saveCart();
//    updateTotal();
// })
// })

//  let carrito = [];
// const carritoItems = document.getElementById("carrito-items");
// const totalPrecio = document.getElementById("total-precio");

// document.addEventListener("DOMContentLoaded", () => {
//   const carritoGuardado = localStorage.getItem("carrito");
//   if (carritoGuardado) {
//       carrito = JSON.parse(carritoGuardado);
//       actualizarCarrito();
//   }
// });

// fetch('productos.json')
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data); // Aquí accedes a los productos
//     mostrarProductos(data.productos);
//   })
//   .catch((error) => console.error('Error al cargar el JSON:', error));

// // Ejemplo de cómo mostrar los productos
// function mostrarProductos(productos) {
//     productos.forEach(producto => {
//         console.log(`Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
//     });
// }

// const botonesComprar = document.querySelectorAll(".comprar-btn");
// botonesComprar.forEach((boton) => {
//     boton.addEventListener("click", () => {
//         const productoCard = boton.parentElement;
//         const id = productoCard.getAttribute("data-id");
//         const nombre = productoCard.getAttribute("data-name");
//         const precioTexto = productoCard.querySelector(".precio").textContent;
//         const precio = parseFloat(precioTexto.replace("$", "").replace(".", ""));

//         agregarProductoAlCarrito({ id, nombre, precio });
//     });
// });



// function agregarProductoAlCarrito(producto) {
//   const existe = carrito.find((item) => item.id === producto.id);

//   if (existe) {
//       existe.cantidad++;
//   } else {
//       producto.cantidad = 1;
//       carrito.push(producto);
//   }

//   actualizarCarrito();
// }


// function actualizarCarrito() {
//   carritoItems.innerHTML = ""; // Limpiar el carrito

//   let total = 0;
//   carrito.forEach((producto) => {
//       const item = document.createElement("div");
//       item.classList.add("carrito-item");
//       item.innerHTML = `
//           <p>${producto.nombre} - $${producto.precio.toLocaleString()} x ${producto.cantidad}</p>
//           <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
//       `;
//       carritoItems.appendChild(item);

//       total += producto.precio * producto.cantidad;
//   });

//   totalPrecio.textContent = total.toLocaleString();


//   localStorage.setItem("carrito", JSON.stringify(carrito));
// }

// function eliminarProducto(id) {
//   carrito = carrito.filter((producto) => producto.id !== id);
//   actualizarCarrito();
// }


// document.getElementById("vaciar-carrito").addEventListener("click", () => {
//   carrito = [];
//   actualizarCarrito();
// });




// document.addEventListener('DOMContentLoaded', () => {
//   const productosContainer = document.getElementById('productos-container');
//   const cartItemsList = document.getElementById('cart-items');
//   const totalElement = document.getElementById('total');
//   const finalizarCompraBtn = document.getElementById('finalizar');
//   const graciasModal = document.getElementById('gracias');
//   const cerrarGraciasBtn = document.getElementById('cerrar');
  
//   let carrito = [];
//   let productos = [];

//   // 1. Cargar productos desde el archivo JSON
//   async function cargarProductos() {
//     try {
//       const response = await fetch('productos.json');
//       productos = await response.json();
//       mostrarProductos(productos);
//     } catch (error) {
//       console.error('Error al cargar productos:', error);
//     }
//   }

//   // 2. Mostrar productos en el DOM
//   function mostrarProductos(productos) {
//     productosContainer.innerHTML = '';
//     productos.forEach(producto => {
//       const productoHTML = `
//         <div class="producto-card" data-id="${producto.id}" data-name="${producto.nombre}" data-precio="${producto.precio}">
//           <img src="${producto.imagen}" alt="${producto.nombre}">
//           <h3>${producto.nombre}</h3>
//           <p>${producto.descripcion}</p>
//           <samp class="precio">$${producto.precio.toLocaleString()}</samp>
//           <button class="comprar-btn">Comprar</button>
//         </div>
//       `;
//       productosContainer.innerHTML += productoHTML;
//     });
//   }

//   // 3. Agregar producto al carrito
//   function agregarProductoAlCarrito(id) {
//     const producto = productos.find(p => p.id === parseInt(id));
//     const productoExistente = carrito.find(p => p.id === producto.id);

//     if (productoExistente) {
//       productoExistente.cantidad += 1;
//     } else {
//       carrito.push({ ...producto, cantidad: 1 });
//     }

//     actualizarCarrito();
//   }

//   // 4. Actualizar carrito en el DOM
//   function actualizarCarrito() {
//     cartItemsList.innerHTML = '';
//     let total = 0;

//     carrito.forEach(item => {
//       const li = document.createElement('li');
//       li.innerHTML = `
//         ${item.nombre} - $${item.precio.toLocaleString()} x ${item.cantidad}
//         <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
//       `;
//       cartItemsList.appendChild(li);
//       total += item.precio * item.cantidad;
//     });

//     totalElement.textContent = `Total: $${total.toLocaleString()}`;

//     // Event listener para botones "Eliminar"
//     document.querySelectorAll('.btn-eliminar').forEach(boton => {
//       boton.addEventListener('click', () => {
//         eliminarProductoDelCarrito(boton.dataset.id);
//       });
//     });
//   }

//   // 5. Eliminar producto del carrito
//   function eliminarProductoDelCarrito(id) {
//     carrito = carrito.filter(item => item.id !== parseInt(id));
//     actualizarCarrito();
//   }

//   // 6. Finalizar compra
//   finalizarCompraBtn.addEventListener('click', () => {
//     if (carrito.length > 0) {
//       alert('¡Gracias por tu compra!');
//       carrito = [];
//       actualizarCarrito();
//       graciasModal.style.display = 'block';
//     } else {
//       alert('El carrito está vacío.');
//     }
//   });

//   // 7. Cerrar modal de gracias
//   cerrarGraciasBtn.addEventListener('click', () => {
//     graciasModal.style.display = 'none';
//   });

//   // 8. Event delegation para botones "Comprar"
//   productosContainer.addEventListener('click', (e) => {
//     if (e.target.classList.contains('comprar-btn')) {
//       const card = e.target.closest('.producto-card');
//       const id = card.dataset.id;
//       agregarProductoAlCarrito(id);
//     }
//   });

//   // Cargar productos al inicio
//   cargarProductos();
// });