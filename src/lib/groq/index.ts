/** 
 *  GROQ queries for Sanity CMS
 *  https://www.sanity.io/docs/groq
 */
export const queries = {
    globalConfig: '*[_id == "global-config"][0]',
    menuBanners: '*[_type == "banner" && placeInMenu]',
    feedBanners: '*[_type == "banner" && placeInFeed]',
    overlayBanners: '*[_type == "banner" && placeAsOverlay]',
    landing: '*[_type == "article" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    magazine: '*[_type == "article" && taxonomy.category == "magazine" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    bureau: '*[_type == "article" && taxonomy.category == "bureau" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    tag: '*[_type == "article" && $tag in taxonomy.tags && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    search: '*[_type == "article" && (title match $term || $term in taxonomy.tags) && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    magazineCategory: '*[_type == "article" && taxonomy.category == "magazine" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    bureauCategory: '*[_type == "article" && taxonomy.category == "bureau" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    article: "*[slug.current == $slug]{..., 'preview': preview[0], 'previewVideoUrl': preview[0].video.asset->url, related[]->{title, 'slug': slug.current, mainImage, relatedSlideshow, 'category': taxonomy.category}}[0]",
    shopSingle: "*[_type == 'product' && slug.current == $slug][0]",
    productList: '*[_id == "product-list"][0] {..., products[]{..., product->{...}}}',
    satelliteSite: "*[_type == 'satelliteSite' && slug.current == $slug]{...}[0]"
}