import { getLocalStorage } from "./utils.mts";

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];

  const count = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  const badge = document.querySelector(".cart-count");

  if (!badge) return;

  badge.textContent = String(count);

  if (count === 0) {
    badge.classList.add("hide");
  } else {
    badge.classList.remove("hide");
  }
}