const promoBtn = document.getElementById("promoBtn");
const promoBox = document.getElementById("promoBox");
const closePromoBtn = document.getElementById("closePromoBtn");

if (promoBtn && promoBox) {
    promoBtn.addEventListener("click", function () {
        promoBox.classList.toggle("sembunyi");
    });
}

if (closePromoBtn && promoBox) {
    closePromoBtn.addEventListener("click", function () {
        promoBox.classList.add("sembunyi");
    });
}