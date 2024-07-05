import type { SatelliteSite } from "$lib/types/sanity.types";
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const post: SatelliteSite = await loadData(queries.satelliteSite, { slug: params.slug })

    return {
        post
    };
}