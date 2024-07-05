import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import { getCurrentTimeInUTC } from "$lib/modules/utils"
import { BATCH_SIZE } from "$lib/constants"
import type { Article, Meta, Banner } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load() {

    const params = {
        start: 0,
        end: BATCH_SIZE,
        currentTime: getCurrentTimeInUTC()
    }

    const posts: Article[] = await loadData(queries.landing, params)
    const globalConfig: Meta = await loadData(queries.globalConfig, {})
    const feedBanners: Banner[] = await loadData(queries.feedBanners, {})

    return {
        posts,
        globalConfig,
        feedBanners
    };
}