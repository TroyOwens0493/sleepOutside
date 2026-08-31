import type { Product } from "./types.mts";
const baseURL = import.meta.env.PUBLIC_SERVER_URL;
function convertToJson(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

interface ProductFilters {
  category?: string;
  query?: string;
}

export async function getProducts(filters: ProductFilters | string = { category: "tents" }) {
  const normalizedFilters = typeof filters === "string" ? { category: filters } : filters;
  const params = new URLSearchParams();
  if (normalizedFilters.category) params.set("category", normalizedFilters.category);
  if (normalizedFilters.query) params.set("q", normalizedFilters.query);

  const response = await fetch(`${baseURL}products/?${params}`);
  return (await convertToJson(response)) as ProductResults;
}

export async function findProductById(id: string) {
  const response = await fetch(baseURL + `products/${id}`);
  const product = (await convertToJson(response)) as Product;
  return product;
}

interface ProductResults {
  count: number;
  prev: string | null;
  next: string | null;
  results: Product[];
}
