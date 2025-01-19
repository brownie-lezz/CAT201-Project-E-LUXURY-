var menuItems=document.getElementById("MenuItems");
            
            MenuItems.style.maxHeight="0px";
            function menutoggle(){
                if(MenuItems.style.maxHeight == "0px"){
                    MenuItems.style.maxHeight="200px";
                }
                else{
                    MenuItems.style.maxHeight="0px";
                }
            }

// Product data
const products = {
    'e-books': [
        {
            id: 1,
            title: 'Crime and Punishment',
            price: 50.00,
            rating: 3.5,
            image: 'assets/books/Crime and Punishment.jpeg',
            type: 'book'
        },
        {
            id: 2,
            title: "Harry Potter and the Sorcerer's Stone",
            price: 35.00,
            rating: 4.5,
            image: "assets/books/Harry Potter and the Sorcerer's Stone.jpeg",
            type: 'book'
        },
        {
            id: 3,
            title: 'Pride and Prejudice',
            price: 15.00,
            rating: 4.0,
            image: 'assets/books/Pride and Prejudice.jpeg',
            type: 'book'
        },
        {
            id: 4,
            title: 'The Catcher in the Rye',
            price: 48.00,
            rating: 3.0,
            image: 'assets/books/The Catcher in the Rye.jpeg',
            type: 'book'
        }
    ],
    'music': [
        {
            id: 1,
            title: 'A Little Braver - New Empire',
            price: 50.00,
            rating: 3.5,
            image: 'assets/musics/A Little Braver.jpg',
            type: 'music'
        },
        {
            id: 2,
            title: 'California - Ethan Dufault',
            price: 21.00,
            rating: 4.5,
            image: 'assets/musics/California.jpeg',
            type: 'music'
        },
        {
            id: 3,
            title: 'Cardigan - Taylor Swift',
            price: 9.00,
            rating: 4.0,
            image: 'assets/musics/Cardigan.jpg',
            type: 'music'
        },
        {
            id: 4,
            title: 'Forever Love - Leehom Wang',
            price: 35.00,
            rating: 3.0,
            image: 'assets/musics/Forever Love.jpg',
            type: 'music'
        },
        {
            id: 5,
            title: 'Yellow - Coldplay',
            price: 50.00,
            rating: 3.5,
            image: 'assets/musics/Yellow.jpg',
            type: 'music'
        },
        {
            id: 6,
            title: 'Photograph - Ed Sheeran',
            price: 21.00,
            rating: 4.5,
            image: 'assets/musics/Photograph.jpeg',
            type: 'music'
        },
        {
            id: 7,
            title: '24/7, 365 - Elijah Woods',
            price: 9.00,
            rating: 4.0,
            image: 'assets/musics/24-7-365.jpg',
            type: 'music'
        },
        {
            id: 8,
            title: 'Sayonara, Mata Itsuka! - Kenshi Yonezu',
            price: 35.00,
            rating: 3.0,
            image: 'assets/musics/Kenshi_Yonezu_-_Sayonara_Mata_Itsuka.png',
            type: 'music'
        }
    ],
    'games': [
        {
            id: 1,
            title: 'I Wanna Be the Guy',
            price: 50.00,
            rating: 3.5,
            image: 'assets/Game/iwbtg.jpg',
            type: 'game'
        },
        {
            id: 2,
            title: 'Minecraft',
            price: 35.00,
            rating: 4.5,
            image: 'assets/Game/minecraft.avif',
            type: 'game'
        },
        {
            id: 3,
            title: 'Plants vs Zombies',
            price: 15.00,
            rating: 4.0,
            image: 'assets/Game/plants-vs-zombies.jpg',
            type: 'game'
        },
        {
            id: 4,
            title: 'Zuma',
            price: 48.00,
            rating: 3.0,
            image: 'assets/Game/zuma.jpg',
            type: 'game'
        }
    ]
};

// Function to generate star rating HTML
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

// Function to create product card
function createProductCard(product) {
    const columnClass = product.type === 'book' ? 'col-4-book' : 'col-4-music-game';
    return `
        <div class="${columnClass}">
            <a href="product-details.html?id=${product.id}&category=${product.type}" target="_blank">
                <img src="${product.image}" alt="${product.title}">
            </a>
            <div class="card-content">
                <a href="product-details.html?id=${product.id}&category=${product.type}" target="_blank">
                    <h4>${product.title}</h4>
                </a>
                <div class="rating">
                    ${generateRatingStars(product.rating)}
                </div>
                <p>MYR${product.price.toFixed(2)}</p>
            </div>
        </div>
    `;
}

// Function to render products
function renderProducts() {
    Object.keys(products).forEach(category => {
        const container = document.querySelector(`#${category}`).closest('.small-container');
        const rows = container.querySelectorAll('.row');
        
        products[category].forEach((product, index) => {
            const rowIndex = Math.floor(index / 4);
            if (rows[rowIndex]) {
                const productCard = createProductCard(product);
                rows[rowIndex].innerHTML += productCard;
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    // Your existing filter code
    document.getElementById('filterForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const priceOrder = document.getElementById('price').value;
        
        Object.keys(products).forEach(category => {
            let sortedProducts = [...products[category]];
            if (priceOrder !== 'default') {
                sortedProducts.sort((a, b) => {
                    return priceOrder === 'high-to-low' ? b.price - a.price : a.price - b.price;
                });
            }
            
            const container = document.querySelector(`#${category}`).closest('.small-container');
            const rows = container.querySelectorAll('.row');
            rows.forEach(row => row.innerHTML = '');
            
            sortedProducts.forEach((product, index) => {
                const rowIndex = Math.floor(index / 4);
                if (rows[rowIndex]) {
                    const productCard = createProductCard(product);
                    rows[rowIndex].innerHTML += productCard;
                }
            });
        });
    });
});