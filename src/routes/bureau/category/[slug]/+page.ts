import type { Meta, Article } from "$lib/types/sanity.types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import { getCurrentTimeInUTC } from "$lib/modules/utils"
import { BATCH_SIZE } from "$lib/constants"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const sanityParams = {
        subcat: params.slug,
        currentTime: getCurrentTimeInUTC()
    }

    const posts: Article[] = await loadData(queries.bureauCategory, sanityParams)
    const globalConfig: Meta = await loadData(queries.globalConfig, {})
    const activeItem: string = params.slug

    return {
        posts,
        globalConfig,
        activeItem
    };
}