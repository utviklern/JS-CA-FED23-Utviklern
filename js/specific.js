function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Henter id fra url
}


async function displayProduct() {//funskjon for å vise jakke basert på id
    const productId = getProductIdFromUrl(); // Kaller på funksjonen for å hente jakke id.
    if (!productId) {
        console.log('product id not found.'); // hvis feil
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

        container.innerHTML = `
            <div class="product-details">
                <img src="${imageUrl}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>color: ${product.baseColor}</p>
                <p>gender: ${product.gender}</p>
                <p>price: ${product.price} kr</p>
                <p>tags: ${product.tags}</p>
            </div>`;
    } catch (error) {
        // Logger eventuelle feil i konsollen og viser en feilmelding til brukeren.
        console.error(error);
    }
}

// Kjører displayProduct-funksjonen når dokumentet er ferdig lastet.
document.addEventListener('DOMContentLoaded', displayProduct);
