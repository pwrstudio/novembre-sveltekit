import type { Product } from "$lib/types/sanity.types";
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load() {

    const posts: Product[] = await loadData(queries.shopListing, {})

    return {
        posts
    };
}