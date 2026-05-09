import type { Product } from "./types.mts"
function convertToJson(res: Response) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export async function getData(category = "tents") {
    return fetch(`../../public/json/${category}.json`)
        .then(convertToJson)
        .then((data) => data);
}

export async function findProductById(id: string) {
    const products = await getData();
    return products.find((item: Product) => item.id === id);
}
