import { addToCart } from './cart.js';

export async function fetchProducts() { //funskjon for å hente all data fra api og kunne bruke det flere steder (dry)
    
    const loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'block'; //viser loading indicator

    try {
        const response = await fetch('https://v2.api.noroff.dev/rainy-days/');
        if (!response.ok) {
            throw new Error('couldnt connect');
        }
        const data = await response.json();
        // console.log(data, "is recived"); 
        return data.data || []; 
    } catch (error) {
        console.error("Could not get products:", error);
        return [];
    }
    finally {
        loadingIndicator.style.display = 'none'; //fjerner loading indiscator når asynk funkjsonen er ferdig
    }
}


export function addToCartListener(products) {
    for (var i = 0; i < products.length; i++) {//looper gjennom
        let product = products[i]; 

        
        let button = document.getElementById('add-to-cart-' + product.id);// henter knapper via id som er unik

        if (button) {
            button.addEventListener('click', function() {//sjekker om knappen blir trykket, hvis så sender den all info under til addToCart
                addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image.url,
                    description: product.description, 
                });
            });
        }
    }
}