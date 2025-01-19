// cart.js

// document.addEventListener('DOMContentLoaded', function() {
//     const minusButtons = document.querySelectorAll('.minus');
//     const plusButtons = document.querySelectorAll('.plus');
//     const removeButtons = document.querySelectorAll('.remove-btn');
//     const quantities = document.querySelectorAll('.quantity');
//     const totalPrice = document.getElementById('total-price');


//     function updateTotal() {
//         let total = 0;
//         document.querySelectorAll('.cart-item').forEach(item => {
//             const priceText = item.querySelector('.item-price').textContent;
//             const price = parseFloat(priceText.replace('MYR', ''));

//             const quantity = parseInt(item.querySelector('.quantity').value);
//             total += price * quantity;
//         });
//         totalPrice.textContent = `MYR${total.toFixed(2)}`;
//     }


//     minusButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const input = this.parentElement.querySelector('.quantity');
//             if (input.value > 1) {
//                 input.value = parseInt(input.value) - 1;
//                 updateTotal();
//             }
//         });
//     });


//     plusButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const input = this.parentElement.querySelector('.quantity');
//             input.value = parseInt(input.value) + 1;
//             updateTotal();
//         });
//     });


//     removeButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             this.closest('.cart-item').remove();
//             updateTotal();
//         });
//     });


//     quantities.forEach(input => {
//         input.addEventListener('change', function() {
//             if (this.value < 1) this.value = 1;
//             updateTotal();
//         });
//     });
// });

function loadCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    console.log("Total Price Element:", totalPriceElement); // Ensure this is being selected correctly

    let total = 0;
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Cart Items:", cartItems); // Check if the cart items are correctly loaded

    cartContainer.innerHTML = ''; // Clear existing items

    if (cartItems.length === 0) {
        totalPriceElement.textContent = 'MYR0.00'; // No items in cart
        return; // Exit function early if no items
    }

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity; // Calculate the total price for each item
        total += itemTotal; // Add to the overall total

        // Create item HTML
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.imageMain}" alt="${item.name}" style="width: 100px; height: auto;">
                <div class="item-info">
                    <div class="item-details">
                        <h3 class="item-title">${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                    </div>
                    <div class="item-price-section">
                        <div class="item-price">MYR${(item.price * item.quantity).toFixed(2)}</div>
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="number" class="quantity" value="${item.quantity}" min="1" data-index="${index}">
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                            <button class="remove-btn" data-index="${index}">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Update the total price for the entire cart
    console.log("Total Price Calculated:", total); // Check if the total is being calculated
    if (total > 0) {
        totalPriceElement.textContent = `MYR${total.toFixed(2)}`;
    } else {
        totalPriceElement.textContent = 'MYR0.00'; // If no items, show 0
    }
}



    // Update item quantity
    function updateQuantity(index, quantity) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems[index]) {
            cartItems[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            loadCart();
        }
    }

    // Remove item
    function removeItem(index) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        loadCart();
    }

// Event listeners
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('quantity-btn')) {
        const index = event.target.getAttribute('data-index');
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cartItems[index];
        if (!item) return;

        if (event.target.classList.contains('minus')) {
            item.quantity = Math.max(1, item.quantity - 1); // Ensure quantity doesn't go below 1
        } else if (event.target.classList.contains('plus')) {
            item.quantity++; // Increase quantity by 1
        }
        
        // Update the price in localStorage and reload the cart
        localStorage.setItem('cart', JSON.stringify(cartItems));
        loadCart(); // Re-render the cart to reflect updated quantities and prices
    } else if (event.target.classList.contains('remove-btn')) {
        const index = event.target.getAttribute('data-index');
        removeItem(index);
    }
});


    document.addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity')) {
            const index = event.target.getAttribute('data-index');
            const quantity = parseInt(event.target.value, 10);
            if (!isNaN(quantity) && quantity > 0) {
                updateQuantity(index, quantity);
            }
        }
    });

    // Load cart on page load
    document.addEventListener('DOMContentLoaded', loadCart);

    document.getElementById('checkout-btn').addEventListener('click', function() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Store cart items in localStorage to transfer to the checkout page
        localStorage.setItem('checkout-items', JSON.stringify(cartItems));
        
        // Redirect to the checkout page
        window.location.href = 'checkout.html'; // Adjust the URL to your checkout page
    });
    