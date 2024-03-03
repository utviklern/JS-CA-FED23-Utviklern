import { fetchProducts } from './utils.js';
import { addToCartListener } from './utils.js';
import { addToCart } from './cart.js';

async function homeJackets() {
    const allJackets = await fetchProducts(); //henter api fetch fra utils
    const container = document.getElementById('home-jackets-container'); //henter container fra html for å sette inn resultatet av følgende funksjon

    if (!allJackets || allJackets.length === 0) {
        container.innerHTML = '<p>nothing found.</p>';
        return;
    }

    let htmlContent = '';//tømmer container for å unngå duplkiasjoner
    
    for (let i = 0; i < allJackets.length && i < 3; i++) { //looper gjennom jakkene og printer jakke 1-3 fra api ut på siden
            const jacket = allJackets[i];
            const imageUrl = jacket.image.url;
            const sizes = jacket.sizes.join(', ');

            htmlContent += `<div class="singleJacket">
                    <img src="${imageUrl}" class="jacket-image" alt="picture of ${jacket.title}">
                    <h3>${jacket.title}</h3>
                    <p>Description: ${jacket.description}</p>
                    <p>Gender: ${jacket.gender}</p>
                    <p>Sizes: ${sizes}</p>
                    <p>Color: ${jacket.baseColor}</p>
                    <p>Price: ${jacket.price}</p>
                    <button id="add-to-cart-${jacket.id}" data-id="${jacket.id}">add to cart</button>
                    <a href="/product/index.html?id=${jacket.id}" class="read-more-btn">read more</a>
                </div>`;
        }
        container.innerHTML = htmlContent;
        addToCartListener(allJackets, addToCart);// legger til event listener for alle add to cart knappene
    }


homeJackets()
