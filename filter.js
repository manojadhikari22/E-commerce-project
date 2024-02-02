
// Product data array with details like id, name, category, price, and image
const data = [
    {
        id: 1,
        name: "Seiko watch", 
        category: "Casual", 
        price: 300, image: "assets/Watch.jpg" 
    },
    {
        id: 2,
        name: "Man dress", 
        category: "Casual", 
        price: 250, image: "assets/Dress1.jpg" 
    },
    {
        id: 3,
        name: "Women Casual dress", 
        category: "Casual", 
        price: 350, image: "assets/Dress2.webp" 
    },
    {
        id: 4,
        name: "Luxary car ", 
        category: "Luxury", 
        price: 1000, image: "assets/Car1.webp" 
    },
    {
        id: 5,
        name: "Ferrari", 
        category: "Luxury", 
        price: 5000, image: "assets/Car2.webp" 
    },
    {
        id: 6,
        name: "Tshirt", 
        category: "Dress", 
        price: 30, image: "assets/T-shirt.jpg" 
    },
    {
        id: 7,
        name: "Ladies grown", 
        category: "Dress", 
        price: 200, image: "assets/Yello-Dress.jpg" 
    },
    {
        id: 8,
        name: "Football", 
        category: "Sports", 
        price: 50, image: "assets/football.webp" 
    },
    {
        id: 9,
        name: "Volleyball", 
        category: "Sports", 
        price: 40, image: "assets/Volleyball.jpg" 
    },
    
]

// Container references for various HTML elements
const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoryContainer = document.querySelector('.category');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

// Function to display products based on a filtered product array
const showProducts = (filterProduct) =>{
    productsContainer.innerHTML = filterProduct.map((product) =>
    `
    <div class="product">
        <img src=${product.image} alt=""/>
        <span class="name">${product.name}</span>
        <span class="priceText">$${product.price}</span>
    </div>
    
    `
    ).join("");
}

// Initial display of all products
showProducts(data)

//EventListener for search input to filter products by name
searchInput.addEventListener('keyup', (e)=>{
    const value = e.target.value.toLowerCase();

    if(value){
        showProducts(data.filter(item=> item.name.toLowerCase().indexOf(value) !== -1))
    }else {
        showProducts(data)
    }
});

// Function to set up categories and handle category filtering
const setCategories = () =>{
    // Extract all unique categories
    const allCats = data.map(item=>item.category);
    const categories = ["All", ...allCats.filter((item,i) =>{
        return allCats.indexOf(item) === i;
    })];

    // Render category elements in the HTML
    categoryContainer.innerHTML = categories.map(category=> `<span class="cat">${category}</span>`).join("");

    // Event listener for category clicks to filter products
    categoryContainer.addEventListener('click', (e) =>{
        const selectedCat = e.target.textContent;

        selectedCat === 'All' ? showProducts(data) : showProducts(data.filter((item) => item.category === selectedCat));
    });
};

// Function to set up price range and handle price filtering
const setPrice = () => {
    // Extract all prices and find min and max values
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList)
    const maxPrice = Math.max(...priceList)

    // Set up price range input attributes
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = '$' + maxPrice

    // Event listener for price range input changes to filter products
    priceRange.addEventListener('input', (e)=>{
        priceValue.textContent = '$' + e.target.value;
        showProducts(data.filter((item) => item.price <= e.target.value)) ;
    });
};

// Initial setup for categories and prices
setPrice();
setCategories();

 

