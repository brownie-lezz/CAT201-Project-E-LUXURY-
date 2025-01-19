document.addEventListener("DOMContentLoaded", function () {
  const readMoreBtn = document.querySelector(".read-more-button");
  const sellerDescription = document.querySelector(".product-description");

  readMoreBtn.addEventListener("click", function () {
    if (sellerDescription.style.height === "auto") {
      sellerDescription.style.height = "3em"; // Collapse back to preview
      readMoreBtn.textContent = "Read More";
    } else {
      sellerDescription.style.height = "auto"; // Expand to show full text
      readMoreBtn.textContent = "Show Less";
    }
  });
});



  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        category: params.get('category')
    };
}

// Select all the background images and the spotlight image
const backgroundImages = document.querySelectorAll('.background-img img');
const spotlightImage = document.querySelector('.spotlight-img img');


let products = {};  // Initialize the global products object

async function loadProductData(csvFile) {
  const response = await fetch(csvFile);
  const csvText = await response.text();
  const rows = csvText.split("\n").map(row => row.split(","));

  // Parse CSV rows and create the products object
  products = rows.slice(1).reduce((acc, [id, type, name, price, description, rating, imageMain, imageSecondary]) => {
    if (!acc[type]) acc[type] = [];  // Initialize category if not exists
    acc[type].push({
      id,
      type,
      name,
      price: parseFloat(price),
      description,
      rating: parseFloat(rating),
      imageMain,
      imageSecondary,
    });
    return acc;
  }, {});  // Initialize with an empty object
}



// Ensure product data is loaded first
loadProductData('products.csv').then(() => {
  console.log(products);
  const { id, category } = getQueryParams();
  console.log("Query Parameters - id:", id, "category:", category);

  if (id && category) {
     const product = products[category]?.find(p => p.id == id);
     console.log("Product found:", product);  // Log product found in the array
     console.log("Available Categories:", Object.keys(products));  // Log the available categories in products


     if (product) {
       displayProductDetails(product);
     } else {
       document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
     }
  } else {
     document.getElementById('product-details').innerHTML = '<p>Invalid product parameters.</p>';
  }
  
});

function generateRatingStars(rating) {
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
          starsHTML += '<i class="fa fa-star"></i>';
      } else if (i - 0.5 <= rating) {
          starsHTML += '<i class="fa fa-star-half-o"></i>';
      } else {
          starsHTML += '<i class="fa fa-star-o"></i>';
      }
  }
  return starsHTML;
}


    function displayProductDetails(product) {
      const productType = product.type.toLowerCase();
      document.getElementById("product-name").textContent = product.name;
      document.getElementById("product-description").textContent = product.description;
      document.getElementById("product-price").textContent = `MYR${product.price.toFixed(2)}`;

      // Display rating stars
      const ratingContainer = document.getElementById("product-rating");
      ratingContainer.innerHTML = '<div class="rating-label">Rating</div>'  + generateRatingStars(product.rating); // Call the function here
    
      const previewContainer = document.getElementById("preview-container");
      previewContainer.innerHTML = ""; // Clear previous content
    
   // For game products
   if (productType === "game") {
    // Create background and spotlight containers for games
    const backgroundDiv = document.createElement("div");
    backgroundDiv.classList.add("background-img");

    const spotlightDiv = document.createElement("div");
    spotlightDiv.classList.add("spotlight-img");
    const spotlightImg = document.createElement("img");
    spotlightImg.src = product.imageMain; // Use the main image as the spotlight image
    spotlightDiv.appendChild(spotlightImg);

        // Dynamically add background images (you can add more background images here)
        const backgroundImages = [product.imageSecondary];  // Use imageSecondary from the CSV file
        
        backgroundImages.forEach((imgSrc) => {
            const bgImg = document.createElement("img");
            bgImg.src = imgSrc;
            backgroundDiv.appendChild(bgImg);
        });

    // Append the background and spotlight divs to the preview container
    previewContainer.appendChild(backgroundDiv);
    previewContainer.appendChild(spotlightDiv);

       // Add swapping functionality for background images
       const bgImages = backgroundDiv.querySelectorAll("img");
       bgImages.forEach((bgImg) => {
           bgImg.addEventListener("click", () => {
               // Get the source of the clicked background image
               const bgImgSrc = bgImg.src;

               // Swap the sources between the clicked image and the spotlight image
               bgImg.src = spotlightImg.src;
               spotlightImg.src = bgImgSrc;

               // Optionally, update active styles for background images
               bgImages.forEach((img) => img.classList.remove("active"));
               bgImg.classList.add("active");
           });
       });
  } 
  // For book products
  else if (productType === "book") {
    // Apply the 'single-layout' class for book
    previewContainer.classList.add("single-layout");

    // Create a container with a book cover
    const coverDiv = document.createElement("div");
    coverDiv.classList.add("cover");
    const bookCoverImg = document.createElement("img");
    bookCoverImg.src = product.imageMain; // Book cover image
    coverDiv.appendChild(bookCoverImg);

    previewContainer.appendChild(coverDiv); // Add book cover to the preview container
  } 
  // For music products
  else if (productType === "music") {
    // Apply the 'spotlight-img' class for music
    previewContainer.classList.remove("single-layout");

    // Create a spotlight image container
    const spotlightDiv = document.createElement("div");
    spotlightDiv.classList.add("spotlight-img");
    const musicImg = document.createElement("img");
    musicImg.src = product.imageMain; // Music album image
    spotlightDiv.appendChild(musicImg);

    previewContainer.appendChild(spotlightDiv); // Add music image to the preview container
  }
}
    
document.addEventListener('DOMContentLoaded', () => {
  // Select background images and spotlight image
  const backgroundImages = document.querySelectorAll('.background-img img');
  const spotlightImage = document.querySelector('.spotlight-img img');

  // Ensure both background images and spotlight image exist
  if (!spotlightImage) {
      console.error('Spotlight image not found!');
      return;
  }

  // Add a click event listener to each background image
  backgroundImages.forEach((bgImg) => {
      bgImg.addEventListener('click', () => {
          // Get the source of the clicked background image
          const bgImgSrc = bgImg.src;

          // Swap the sources between the clicked image and the spotlight image
          bgImg.src = spotlightImage.src;
          spotlightImage.src = bgImgSrc;

          // Optionally, update styles for active background image
          backgroundImages.forEach((img) => img.classList.remove('active'));
          bgImg.classList.add('active');
      });
  });
});

  // Attach event listener to the "Add to Cart" button
  const addToCartBtn = document.getElementById("add-to-cart");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const { id, category } = getQueryParams(); // Get product id and category from URL
      const product = products[category]?.find(p => p.id == id);

      console.log("Product added to cart:", product);


      if (product) {
        addToCart(product);
        alert("Product added to cart!");
      } else {
        console.error("Product not found!");
      }
    });
  }


// Synchronizing cart with localStorage
function getCart() {
  const cart = localStorage.getItem("cart");
  console.log("Retrieved cart from localStorage:", cart ? JSON.parse(cart) : []);
  return cart ? JSON.parse(cart) : [];
}

function setCart(cart) {
  console.log("Saving cart to localStorage:", cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  console.log("Attempting to add product to cart:", product);

  const cart = getCart(); // Retrieve current cart
  console.log("Current cart length:", cart.length); //
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    // Increase quantity if product already in cart
    cart[existingProductIndex].quantity += 1;
    console.log("Product exists in cart, updated quantity:", cart[existingProductIndex]);
  } else {
    // Add new product with quantity 1
    const newProduct = { 
      ...product, 
      quantity: 1, 
      meta: product.meta || [] // Ensure meta is defined
    };
    cart.push(newProduct);
    console.log("Product added to cart:", newProduct);
  }

  setCart(cart); // Save the updated cart to localStorage
}


// function updateCartUI(cart = getCart()) {
//   const cartCount = document.querySelector("#cart-count");
//   if (cartCount) {
//     cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
//   }
// }

// Example function to simulate fetching query parameters (you can adjust it as needed)
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    category: params.get("category"),
  };
}


