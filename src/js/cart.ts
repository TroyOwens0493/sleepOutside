import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import type { Product } from "./types.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
  const listEl = document.querySelector(".product-list");

  if (listEl) listEl.innerHTML = htmlItems.join("");

  addRemoveListeners();
  renderCartTotal(cartItems);
}

function renderCartTotal(cartItems: Product[]) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  if (!cartFooter || !cartTotal) return;

  if (cartItems.length === 0) {
    cartFooter.classList.add("hide");
    cartTotal.textContent = "Total: ";
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.finalPrice);
  }, 0);

  cartFooter.classList.remove("hide");
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeCartItem(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const id = button.dataset.id;

  if (!id) return;

  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCartItems = cartItems.filter((item: Product) => item.id !== id);

  setLocalStorage("so-cart", updatedCartItems);
  renderCartContents();
}

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

function cartItemTemplate(item: Product) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.images.primarySmall}" alt="${item.name}" />
      </a>

      <a href="#">
        <h2 class="card__name">${item.name}</h2>
      </a>

      <p class="cart-card__color">${item.colors[0].colorName}</p>
      <p class="cart-card__quantity">qty: 1</p>

      <button
        type="button"
        class="cart-card__remove"
        data-id="${item.id}"
        aria-label="Remove ${item.name} from cart"
      >
        ×
      </button>

      <p class="cart-card__price">$${item.finalPrice}</p>
    </li>
  `;
}

renderCartContents();