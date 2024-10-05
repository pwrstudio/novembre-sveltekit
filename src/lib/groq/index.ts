/** 
 *  GROQ queries for Sanity CMS
 *  https://www.sanity.io/docs/groq
 */

import { PUBLIC_ENVIRONMENT } from "$env/static/public"

const editorialStateFilter = PUBLIC_ENVIRONMENT === "preview" ? '' : '&& editorialState == "live"'

export const queries = {
    globalConfig: `*[_id == "global-config"][0]`,
    menuBanners: `*[_type == "banner" ${editorialStateFilter} && placeInMenu]`,
    feedBanners: `*[_type == "banner" ${editorialStateFilter} && placeInFeed]`,
    overlayBanners: `*[_type == "banner" ${editorialStateFilter} && placeAsOverlay]`,
    landing: `*[_type == "article" ${editorialStateFilter} && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}`,
    magazine: `*[_type == "article" ${editorialStateFilter} && taxonomy.category == "magazine" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}`,
    bureau: `*[_type == "article" ${editorialStateFilter} && taxonomy.category == "bureau" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}`,
    tag: `*[_type == "article" ${editorialStateFilter} && $tag in taxonomy.tags && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}`,
    search: `*[_type == "article" ${editorialStateFilter} && (title match $term || $term in taxonomy.tags) && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}`,
    magazineCategory: `*[_type == "article" ${editorialStateFilter} && taxonomy.category == "magazine" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}`,
    bureauCategory: `*[_type == "article" ${editorialStateFilter} && taxonomy.category == "bureau" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}`,
    article: `*[slug.current == $slug ${editorialStateFilter}]{..., 'preview': preview[0], 'previewVideoUrl': preview[0].video.asset->url, related[]->{title, 'slug': slug.current, mainImage, relatedSlideshow, 'category': taxonomy.category}}[0]`,
    shopSingle: `*[_type == 'product' ${editorialStateFilter} && slug.current == $slug][0]`,
    productList: `*[_id == "product-list"][0] {..., products[]{..., product->{...}}}`,
    satelliteSite: `*[_type == 'satelliteSite' && slug.current == $slug]{...}[0]`
}