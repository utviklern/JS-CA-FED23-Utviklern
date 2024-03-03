document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let htmlContent = '';
    let totalPrice = 0; //lager en variabel for totalpris

    if (cart.length > 0) { //looper gjennom elementene i locale storage og henter ut nødvendig info
        for (let i = 0; i < cart.length; i++) {
            let itemTotal = cart[i].price * cart[i].quantity; //ser totalprisen på hver jakke baseert på antall og pris
            totalPrice += itemTotal; // legger verdien inn i total variabelen og går videre til neste index
            htmlContent += `
                <div class="cart-jacket">
                    <h3>${cart[i].title}</h3>
                    <p>price: ${cart[i].price} nok</p>
                    <p>quantity: ${cart[i].quantity}</p>
                </div>
            `;
        }
        htmlContent += `<p>sub total: ${totalPrice} nok</p>`; 
    } else {
        htmlContent = '<p>cart is empty</p>';

    }

    cartProducts.innerHTML = htmlContent; //legger dem til i html

    const confirmBtn = document.getElementById('confirm-purchase-btn');
    if (cart.length === 0) { // Sjekker om handlekurven er tom og skjuler den hvis så
        confirmBtn.style.display = 'none'; 
    } else {
        confirmBtn.style.display = 'block'; //hvis den har innhold, vil man kunne gå videre til confirmation
    }

    confirmBtn.addEventListener('click', () => {
        localStorage.removeItem('cart'); 
        window.location.href = '/checkout/confirmation/'; 
    }); //event listener på knapp som sletter alt fra locale storage og redirekter til confirmation siden
});
