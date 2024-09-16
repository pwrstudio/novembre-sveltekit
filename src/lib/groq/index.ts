/** 
 *  GROQ queries for Sanity CMS
 *  https://www.sanity.io/docs/groq
 */
export const queries = {
    globalConfig: '*[_id == "global-config"][0]',
    menuBanners: '*[_type == "banner" && editorialState == "live" && placeInMenu]',
    feedBanners: '*[_type == "banner" && editorialState == "live" && placeInFeed]',
    overlayBanners: '*[_type == "banner" && editorialState == "live" && placeAsOverlay]',
    landing: '*[_type == "article" && editorialState == "live" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    magazine: '*[_type == "article" && editorialState == "live" && taxonomy.category == "magazine" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    bureau: '*[_type == "article" && editorialState == "live" && taxonomy.category == "bureau" && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    tag: '*[_type == "article" && editorialState == "live" && $tag in taxonomy.tags && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    search: '*[_type == "article" && editorialState == "live" && (title match $term || $term in taxonomy.tags) && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    magazineCategory: '*[_type == "article" && editorialState == "live" && taxonomy.category == "magazine" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    bureauCategory: '*[_type == "article" && editorialState == "live" && taxonomy.category == "bureau" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){_id, publicationDate, title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}',
    article: "*[slug.current == $slug]{..., 'preview': preview[0], 'previewVideoUrl': preview[0].video.asset->url, related[]->{title, 'slug': slug.current, mainImage, relatedSlideshow, 'category': taxonomy.category}}[0]",
    shopSingle: "*[_type == 'product' && slug.current == $slug][0]",
    productList: '*[_id == "product-list"][0] {..., products[]{..., product->{...}}}',
    satelliteSite: "*[_type == 'satelliteSite' && slug.current == $slug]{...}[0]"
}