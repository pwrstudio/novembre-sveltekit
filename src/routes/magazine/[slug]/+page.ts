import type { Article } from "$lib/types/sanity.types";
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let post: Article

    try {
        post = await loadData(queries.article, { slug: params.slug })
        return {
            post
        };
    } catch (error) {
        console.warn(error)
    }
}