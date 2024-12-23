// Elementos principales
const header = document.querySelector('.header');
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const cartCounter = document.querySelector("#cart-counter"); // Contador dinámico

// Variables para manejar el carrito en localStorage
let cartData = JSON.parse(localStorage.getItem('cart')) || [];

// Evento de scroll para cambiar transparencia del header
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('transparent');
  } else {
    header.classList.remove('transparent');
  }
});

// Abrir y cerrar el carrito
cartIcon.onclick = () => cart.classList.add("active");
closeCart.onclick = () => cart.classList.remove("active");

// Carga inicial del DOM y datos del carrito
document.addEventListener("DOMContentLoaded", () => {
  renderCart(); // Renderiza los productos guardados en localStorage
  updateCartCounter(); // Actualiza el contador dinámico
  updateTotal(); // Calcula el total inicial
  setupAddToCartButtons(); // Configura los botones "Añadir al carrito"
});

// Configurar botones de "Añadir al carrito"
function setupAddToCartButtons() {
  const addCartButtons = document.querySelectorAll(".add-cart");
  addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
      const shopProduct = event.target.parentElement;
      const title = shopProduct.querySelector(".product-title").innerText;
      const price = parseFloat(shopProduct.querySelector(".precio").innerText.replace("$", ""));
      const productImg = shopProduct.querySelector(".product-img").src;

      addProductToCart(title, price, productImg);
    });
  });
}

// Añadir producto al carrito
function addProductToCart(title, price, productImg) {
  const existingProduct = cartData.find(product => product.title === title);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cartData.push({ title, price, productImg, quantity: 1 });
  }

  saveCart();
  renderCart();
  updateCartCounter();
  updateTotal();
}

// Guardar carrito en localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartData));
}

// Renderizar los productos en el carrito
function renderCart() {
  const cartContent = document.querySelector(".cart-content");
  cartContent.innerHTML = ""; // Limpia el contenido previo

  cartData.forEach(product => {
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    cartShopBox.innerHTML = `
      <img src="${product.productImg}" alt="" class="cart-img">
      <div class="detalle-box">
        <div class="cart-product-title">${product.title}</div>
        <div class="cart-price">$${product.price.toFixed(2)}</div>
        <input type="number" value="${product.quantity}" min="1" class="cart-quantity">
      </div>
      <i class='bx bxs-trash-alt cart-remove'></i>
    `;

    // Eventos para actualizar cantidad o eliminar producto
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", event => {
      updateProductQuantity(product.title, parseInt(event.target.value));
    });
    cartShopBox.querySelector(".cart-remove").addEventListener("click", () => {
      removeProductFromCart(product.title);
    });

    cartContent.appendChild(cartShopBox);
  });
}

// Actualizar la cantidad de un producto
function updateProductQuantity(title, quantity) {
  const product = cartData.find(product => product.title === title);
  if (product) {
    product.quantity = Math.max(quantity, 1); // Evitar cantidades menores a 1
    saveCart();
    renderCart();
    updateCartCounter();
    updateTotal();
  }
}

// Eliminar producto del carrito
function removeProductFromCart(title) {
  cartData = cartData.filter(product => product.title !== title);
  saveCart();
  renderCart();
  updateCartCounter();
  updateTotal();
}

// Actualizar el contador dinámico
function updateCartCounter() {
  const totalQuantity = cartData.reduce((sum, product) => sum + product.quantity, 0);
  cartCounter.innerText = totalQuantity;
}

// Calcular y actualizar el total del carrito
function updateTotal() {
  const total = cartData.reduce((sum, product) => sum + product.price * product.quantity, 0);
  document.querySelector(".total-price").innerText = `$${total.toFixed(2)}`;
}

