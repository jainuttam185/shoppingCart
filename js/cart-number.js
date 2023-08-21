const DOMCartNumber = document.querySelector(".cart-items");
cartItems = JSON.parse(localStorage.getItem("cart")) || [];

DOMCartNumber.textContent = cartItems.length > 0 ? `${cartItems.length} items` : `0 items`;