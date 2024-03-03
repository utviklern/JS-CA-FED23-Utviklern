import { fetchProducts } from './utils.js';
import { addToCart } from './cart.js';

async function showFilteredJackets(genderFilter = null) {
    const allJackets = await fetchProducts(); 
    const container = document.getElementById('featured-jackets-container');
    
    container.innerHTML = '';// tømmer containeren for tidligere innhold for å unngå duplikater

    for (let i = 0; i < allJackets.length; i++) {// looper gjennom alle jakkene og ser om filter stemmer overens med valg
        const product = allJackets[i];
        if (genderFilter && product.gender !== genderFilter) {
            continue; // hopper over alle jakkene med andre verdier/gender enn valgt filter
        }
        const imageUrl = product.image.url;//lager html content for å plassere på siden
        const productHTML = `<div class="product">
            <img src="${imageUrl}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>price: ${product.price} nok</p>
            <button id="add-to-cart-${product.id}" data-id="${product.id}">add to cart</button>
            <a href="/product/index.html?id=${product.id}" class="read-more-btn">read more</a>
            </div>`;

        container.innerHTML += productHTML; //spesifiserer hvor å plassere
    }

    
    addToCartEvent(allJackets);// kaller på addToCartEvent med alle jakkene som parameter. 
}


function addToCartEvent(allJackets) {// add to cart eventlistner for alle jakkene
    const buttons = document.querySelectorAll('button[id^="add-to-cart-"]'); //finner alle knappene på siden
   
    for (let i = 0; i < buttons.length; i++) { // looper gjennom alle kanppene og setter opp click event på hver knapp.
        buttons[i].onclick = function() {
            const productId = this.getAttribute('data-id'); //bruker ID som atributt
            let product = null;
            
            for (let j = 0; j < allJackets.length; j++) {// looper gjennom jakkene for å finne jakke med id'en og lagrer det i "product"
                if (allJackets[j].id === productId) {
                    product = allJackets[j];
                    break; //når den blir funnet slutter loopen
                }
            }

            if (product) { //hvis det ble funnet, llegger den til i handlevogn
                addToCart(product);
            } else {
                console.error('error, not found', productId); //hvis ikke, feilmelding
            }
        };
    }
}

function handleGenderFilter() {
    const genderRadios = document.querySelectorAll("input[name='gender-filter-btn']"); //finner alle radioknappene i html med gitt navn

    for (let i = 0; i < genderRadios.length; i++) {// looper gjennom alle radioknappene og viser jakker etter valgt kjønn
        // Sjekker hvilken av filterknappene som er valgt
        if (genderRadios[i].checked) {
            showFilteredJackets(genderRadios[i].value);
            break; //avbryter løkken når siden 1 knapp er valgt
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showFilteredJackets();
    const genderRadios = document.querySelectorAll("input[name='gender-filter-btn']");// Setter opp click event for filter knappene
    for (let i = 0; i < genderRadios.length; i++) {
        genderRadios[i].onclick = handleGenderFilter;
    }
});
