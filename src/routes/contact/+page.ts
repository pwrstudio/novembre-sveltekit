import type { Meta } from "$lib/types/sanity.types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const globalConfig: Meta = await loadData(queries.globalConfig, {})

    return {
        globalConfig
    };
}