import type { Article } from "$lib/types/sanity.types";
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let post: Article

    console.log(JSON.stringify(params.slug))

    try {
        post = await loadData(queries.article, { slug: params.slug })
        console.log(post)
        return {
            post
        };
    } catch (error) {
        console.warn(error)
    }
}