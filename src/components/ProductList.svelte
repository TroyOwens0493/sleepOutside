<script lang="ts">
    import { onMount } from "svelte";
    import { getProducts } from "../js/productData.mts";
    import type { Product } from "../js/types.mts";
    import { getParam } from "../js/utils.mjs";

    // declare these out here as state so we can us it in our template below
    let category = $state("");
    let products: Product[] = $state([]);

    async function init() {
        category = getParam("category") || "";
        console.log("category", category);
        const data = await getProducts(category);
        console.log("data", data);
        products = data.results;
    }

    onMount(init);
</script>

<h2>Top products: {category}</h2>

<ul class="product-list">
    {#each products as product}
        <li class="product-card">
            <a href={`/products/${product.id}/`}>
                <img
                    src={product.images.primaryMedium}
                    alt={product.name}
                />
                <h3 class="card__brand">{product.brand.name}</h3>
                <h2 class="card__name">{product.nameWithoutBrand}</h2>
                <p class="product-card__price">${product.finalPrice}</p>
            </a>
        </li>
    {/each}
</ul>
