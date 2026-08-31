<script lang="ts">
    import { onMount } from "svelte";
    import { getProducts } from "../js/productData.mts";
    import type { Product } from "../js/types.mts";
    import { getParam } from "../js/utils.mjs";
    import ProductSummary from "./ProductSummary.svelte";

    // declare these out here as state so we can us it in our template below
    let category = $state("");
    let query = $state("");
    let products: Product[] = $state([]);
    let productCount = $state(0);
    let loading = $state(true);
    let error = $state("");

    async function init() {
        category = getParam("category") || "";
        query = getParam("q") || "";

        try {
            const data = await getProducts({ category, query });
            products = data.results;
            productCount = data.count;
        } catch {
            error = "We couldn't load products right now. Please try again.";
        } finally {
            loading = false;
        }
    }

    onMount(init);
</script>

<main class="products product-results">
    <h1>{query ? `Search results for “${query}”` : `Top products${category ? `: ${category}` : ""}`}</h1>

    {#if loading}
        <p role="status">Loading products…</p>
    {:else if error}
        <p class="product-results__message" role="alert">{error}</p>
    {:else if products.length === 0}
        <p class="product-results__message" role="status">No products matched your search.</p>
    {:else}
        <p class="product-results__count">{productCount} {productCount === 1 ? "product" : "products"}</p>
        <ul class="product-list">
            {#each products as product}
                <ProductSummary {product} />
            {/each}
        </ul>
    {/if}
</main>
