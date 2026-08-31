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

export async function getProducts(filters: ProductFilters = { category: "tents" }) {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.query) params.set("q", filters.query);

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
