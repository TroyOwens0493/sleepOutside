import type { Product } from "./types.mts"
import { getLocalStorage, setLocalStorage } from "./utils.mts";
import { findProductById } from "./productData.mts";

function addProductToCart(product: Product) {
    let currentCartProducts = getLocalStorage("so-cart");
    if (!currentCartProducts) currentCartProducts = [];

    const next = [product, ...currentCartProducts];
    setLocalStorage("so-cart", next);
}
// add to cart button event handler
async function addToCartHandler(e: Event) {
    const target = e.target as HTMLButtonElement
    if (target.dataset.id) {
        const product = await findProductById(target.dataset.id);
        addProductToCart(product);
    }
}

// add listener to Add to Cart button
document
    .getElementById("addToCart")
    ?.addEventListener("click", addToCartHandler);
