// Last inn eksisterende handlekurv fra lokal lagring, eller opprett en ny tom liste hvis ingen eksisterer.
var cart = JSON.parse(localStorage.getItem("cart")) || [];

// legg til produkt i handlekurven.
export function addToCart(product) {
    var found = false; // Brukes til å spore om produktet allerede finnes i handlekurven
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            cart[i].quantity += 1; // Hvis allerede i handlevogn, øk mengden og sett found til true
            found = true;
            break; // Avslutter løkken tidlig siden produktet allerede er funnet og oppdatert
        }
    }
    if (!found) {   // Hvis produktet ikke ble funnet, legg det til
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1 
        });
    }
    updateCart(); 
}


export function removeFromCart(productId) {// Funksjon for å fjerne et produkt
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            if (cart[i].quantity > 1) {
                cart[i].quantity -= 1; // reduser med 1 hvis flere
            } else {
                cart.splice(i, 1); // Hvis det bare er ett, fjern produktet 
            }
            break; // Avslutt loop
        }
    }
    updateCart();
}


function updateCart() {// funksjon for å oppdatere handlevogen
    localStorage.setItem("cart", JSON.stringify(cart)); 
    displayCart(); 
    calculateTotal(); 
}

// Viser handlekurvens innhold.
function displayCart() {
    var container = document.getElementById('cart-container'); 
    if (container) {
        var htmlContent = ''; // for å unngå duplikasjon
        
        for (var i = 0; i < cart.length; i++) {// setter inn html for hvert produkt i handlevognen
            var cartJacket = cart[i];
            htmlContent += `
                <div class="cart-item">
                    <h3>${cartJacket.title}</h3>
                    <p>Price: ${cartJacket.price} nok</p>
                    <p>quantity: ${cartJacket.quantity}</p>
                    <button class="remove-item-btn" data-id="${cartJacket.id}">remove 1 from cart</button>
                </div>
            `;
        }
        container.innerHTML = htmlContent; 
        attachEventListeners(); // Legger til event listeners for alle remove knappene pr jakke
    }
}


function calculateTotal() {// Beregner den totale prisen i kassen og viser den
    var total = 0; 
    
    for (var i = 0; i < cart.length; i++) {// Legger til prisen for hvert produkt i handlevognen og ganger med mengden
        total += cart[i].price * cart[i].quantity;
    }
    var totalElement = document.getElementById('total-price'); 
    if (totalElement) {
        totalElement.textContent = ` ${total} nok`; //viser på siden
    }
}


function attachEventListeners() {
    var buttons = document.getElementsByClassName('remove-item-btn'); // Henter alle remove kanppene
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() { // Bruker addEventListener for å registrere klikk
            var productId = this.getAttribute('data-id'); // henter id fra data spesifisert i displayCart funskjon
            removeFromCart(productId); // Kaller funksjonen for å fjerne fra handlegon med id som parameter
        });
    }
}


// dobbelsikring ved at handlevognen vises når siden er ferdig lastet inn
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCart();
});
