import{g as e}from"./utils.DNfNFt1C.js";function s(){const c=e("so-cart").map(t=>n(t)),r=document.querySelector(".product-list");r&&(r.innerHTML=c.join(""))}function n(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.image}"
      alt="${a.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.name}</h2>
  </a>
  <p class="cart-card__color">${a.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.finalPrice}</p>
</li>`}s();
