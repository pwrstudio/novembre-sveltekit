import type { Meta, Article } from "$lib/types/sanity.types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import { getCurrentTimeInUTC } from "$lib/modules/utils"
import { BATCH_SIZE } from "$lib/constants"

/** @type {import('./$types').PageLoad} */
export async function load() {

    const params = {
        start: 0,
        end: BATCH_SIZE,
        currentTime: getCurrentTimeInUTC()
    }

    const posts: Article[] = await loadData(queries.magazine, params)
    const globalConfig: Meta = await loadData(queries.globalConfig, {})

    return {
        posts,
        globalConfig
    };
}