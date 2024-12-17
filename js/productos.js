// let cart =[];

// const cartCount = document.getElementById("cart-count");
// const cartItems = document.getElementById("carrito");
// const cartModal = document.getElementById("cart-modal");
// const finalizarCarrito = document.getElementById("finalizar-carrito");
// const finalizarButton = document.getElementById("finalizar");
// const totalElement = document.getElementById("total");
// const gracias = document.getElementById("gracias");
// const graciasCerrar =document.getElementById("cerrar");
// const buyButtons = document.querySelectorAll(".comprar-btn");

// function saveCart () {
//     localStorage.setItem("cart", JSON.stringify(cart))
// }
// document.querySelectorAll(".comprar-btn").forEach((button) => {
//     button.addEventListener("click" , function(event)
// {
//   event.preventDefault();
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


// function updateCartCount() {
//     cartCount.textContent =cart.length;
// }



// function displayCart() {
//    cartItems.innerHTML = "";
//    cart.forEach((item) => {
//     const li =document.createElement("li");
//     li.textContent= "${item.name} - $${item.precio}";
//     cartItems.appendChild(li);
//    });
// }

// function updateTotal() {
//     const total = cart.reduce((acc,item) => acc + item.precio, 0);
//     totalElement.textContent= "total: $${total}"
// }

// document.getElementById("cart-icon").addEventListener("click",function() {
//   cartModal.style.display = "flex";
//   displayCart();
//   uppdateTotal();  
// }
// )

// finalizarCarrito.addEventListener("click" , function() {
//     cartModal.style.display = "none";
// });

// finalizarButton.addEventListener("click",function(){
//    gracias.style.display = "flex";
//     cart =[];
//     updateCartCount();
//     saveCart();
//     updateTotal();
//     cartModal.style.display= "none"
// });

// graciasCerrar.addEventListener("click" ,function(){
//     gracias.style.display= "none";
// });

// function loadCart() {
//     const saveCart = localStorage.getItem("cart");
//     if(saveCart) {
//         cart = JSON.parse(saveCart);
//        updateCartCount();
//        updateTotal();
     
//     }
// }

// loadCart();