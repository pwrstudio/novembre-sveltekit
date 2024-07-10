
import type { Article, Meta } from "$lib/types/sanity.types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import { getCurrentTimeInUTC } from "$lib/modules/utils"
import { BATCH_SIZE } from "$lib/constants"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const sanityParams = {
        tag: params.slug,
        start: 0,
        end: BATCH_SIZE,
        currentTime: getCurrentTimeInUTC()
    }

    const posts: Article[] = await loadData(queries.tag, sanityParams)
    const globalConfig: Meta = await loadData(queries.globalConfig, {})
    const text: string = params.slug

    return {
        posts,
        globalConfig,
        text
    };
}