import { fetchProducts } from './utils.js';
import { addToCartListener } from './utils.js';

async function showAllJackets() {
    var products = await fetchProducts(); // Henter produktene fra funkjson i utils.js.
    var container = document.getElementById('featured-jackets-container'); //spesifiserer hvor å skrive resultat

    if (!products || products.length === 0) { //hvis ingen svar eller at svaret er strict equal til 0 
        container.innerHTML = '<p>nothing found.</p>';
        return;
    }

    container.innerHTML = ''; // Tømmer containeren for å unngå duplikasjon
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var imageUrl = product.image.url; //spesifiserer at img er i gitt "path"

        container.innerHTML += '<div class="product">' +
                               `<img src="${imageUrl}" alt="${product.title}">` +
                               `<h3>${product.title}</h3>` +
                               `<p>${product.description}</p>` +
                               `<p>Pris: ${product.price} kr</p>` +
                               `<button id="add-to-cart-${product.id}" data-id="${product.id}">add to cart</button>` +
                               '</div>';
    }

    
    addToCartListener(products);// legger til event listener som
}




document.addEventListener('DOMContentLoaded', showAllJackets);
