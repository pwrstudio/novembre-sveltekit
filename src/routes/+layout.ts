import type { Meta, Banner } from "$lib/types/sanity.types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const globalConfig: Meta = await loadData(queries.globalConfig, {})
    const menuBanners: Banner[] = await loadData(queries.menuBanners, {})
    const overlayBanners: Banner[] = await loadData(queries.overlayBanners, {})

    return {
        globalConfig,
        menuBanners,
        overlayBanners
    };
}