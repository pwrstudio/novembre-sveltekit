import type { Product } from "$lib/types/sanity.types";
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const post: Product = await loadData(queries.shopSingle, { slug: params.slug })

    return {
        post
    };
}