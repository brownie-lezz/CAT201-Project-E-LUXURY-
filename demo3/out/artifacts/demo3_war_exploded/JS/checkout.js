const buttons = document.querySelectorAll('.payment-btns button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'clicked' class from all buttons
    buttons.forEach(btn => btn.classList.remove('clicked'));

    // Add 'clicked' class to the clicked button
    button.classList.add('clicked');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the pay button element
  const payButton = document.getElementById('pay-btn');

  // Add an event listener to the pay button
  if (payButton) {
    payButton.addEventListener('click', async function() {
      const email = document.querySelector('input[placeholder="john.doe@gmail.com"]').value;

      if (email) {
          try {
              // Clear the cart on the server
              await fetch('/api/cart/clear', { method: 'POST' });
              
              // Redirect to success page
              window.location.href = 'payment-successful.html';
          } catch (error) {
              console.error('Error processing payment:', error);
              alert('Payment processing failed. Please try again.');
          }
      } else {
          alert('Please enter a valid email address!');
      }
    });
  }

  displayOrderItems();
});

document.addEventListener('DOMContentLoaded', function() {
  // Call function to display order items and calculate total price
  displayOrderItems();
});

async function displayOrderItems() {
  try {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const orderList = document.getElementById('order-products-list');
    let subtotal = 0;

    // Clear existing content
    orderList.innerHTML = '';

    // Add each product to the order list and calculate subtotal
    cartItems.forEach(item => {
      const productElement = document.createElement('div');
      productElement.className = 'order-product-item';
      
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      productElement.innerHTML = `
        <div class="product-details">
          <img src="${item.imageMain}" alt="${item.name}" class="product-image">
          <div class="product-info">
            <span class="product-name">${item.name}</span>
            <span class="product-quantity">Quantity: ${item.quantity}</span>
          </div>
        </div>
        <div class="product-price">MYR ${itemTotal.toFixed(2)}</div>
      `;

      orderList.appendChild(productElement);
    });

    // Update the totals section
    document.getElementById('subtotal-amount').textContent = `MYR ${subtotal.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `MYR ${subtotal.toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    alert('Failed to load cart items. Please try again.');
  }
}
