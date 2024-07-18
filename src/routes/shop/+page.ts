import type { Product, Meta } from "$lib/types/sanity.types";
import type { MergedProduct } from "$lib/types";
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import { SHOPIFY_DOMAIN, SHOPIFY_API_VERSION } from "$lib/constants";
import { PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "$env/static/public"
import Client from 'shopify-buy';

/** @type {import('./$types').PageLoad} */
export async function load() {
  // Fetch Sanity data
  const sanityPosts: Product[] = await loadData(queries.shopListing, {})
  const globalConfig: Meta = await loadData(queries.globalConfig, {})

  try {
    const shopifyClient = Client.buildClient({
      domain: SHOPIFY_DOMAIN,
      apiVersion: SHOPIFY_API_VERSION,
      storefrontAccessToken: PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    });

    // Fetch Shopify data
    const shopifyProducts: Client.Product[] = await shopifyClient.product.fetchAll()

    // Convert Shopify products to serializable format
    const serializedShopifyProducts = shopifyProducts.map(product => JSON.parse(JSON.stringify(product)));

    // Merge Sanity and Shopify data
    const mergedPosts = mergePosts(sanityPosts, serializedShopifyProducts);

    return {
      posts: mergedPosts,
      globalConfig
    };
  } catch (error) {
    console.error('Failed to fetch Shopify products', error);
    return {
      posts: sanityPosts,
      globalConfig
    };
  }
}

function mergePosts(sanityPosts: Product[], shopifyProducts: Client.Product[]): MergedProduct[] {
  return sanityPosts.map(sanityPost => {
    const shopifyProduct = shopifyProducts.find(shopifyProduct => {
      const shopifyId = shopifyProduct.id.split('/').pop();
      return shopifyId === sanityPost.shopifyId;
    });

    if (shopifyProduct) {
      return {
        ...sanityPost,
        shopify: shopifyProduct
      };
    }

    return sanityPost;
  });
}