<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../productData.mts";
  import type { Product } from "../types.mts";
  import { getParam } from "../js/utils.mjs";

// declare these out here as state so we can us it in our template below
  let category = $state(""); 
  let products:Product[] = $state([]);

  async function init() {
    category = getParam("category") || ""
    const data = await getProducts(category);
    products = data.results;
  }

  onMount(init);
</script>

<h2>Top products: {category}</h2>
