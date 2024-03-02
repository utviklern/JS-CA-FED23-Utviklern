import { addToCart } from './cart.js';

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Henter id fra url
}


async function displayProduct() {//funskjon for å vise jakke basert på id
    const productId = getProductIdFromUrl(); // Kaller på funksjonen for å hente jakke id.
    if (!productId) {
        console.log('product id not found.'); // hvis feil gi feilmelding
        return;
    }

    try {// henter informasjon fra api med id.
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
        if (!response.ok) {
            throw new Error('product not found'); 
        }
        const result = await response.json(); 
        const product = result.data; 
        const container = document.getElementById('spesific-container');
        const imageUrl = product.image.url;
        //setter inn html med diverse info
        container.innerHTML = `
            <div class="product-details">
                <img src="${imageUrl}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>color: ${product.baseColor}</p>
                <p>gender: ${product.gender}</p>
                <p>price: ${product.price} nok</p>
                <p>tags: ${product.tags}</p>
                <button id="add-to-cart-button" data-id="${product.id}">add to cart</button>
            </div>`;
            const addToCartBtn = document.getElementById('add-to-cart-button');
            addToCartBtn.addEventListener('click', () => addToCart(product));
    } catch (error) {
        // Logger eventuelle feil i konsollen og viser en feilmelding hvis så
        console.error(error);
    }
}

// når siden er klar, lastes funskjonen som lister jakkene 
document.addEventListener('DOMContentLoaded', displayProduct);
