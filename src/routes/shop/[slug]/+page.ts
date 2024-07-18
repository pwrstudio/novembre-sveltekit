import type { Product } from "$lib/types/sanity.types";
import type { MergedProduct } from "$lib/types";
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import { SHOPIFY_DOMAIN, SHOPIFY_API_VERSION } from "$lib/constants";
import { PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "$env/static/public"
import Client from 'shopify-buy';

/** @type {import('./$types').PageLoad} */
export async function load({ params }): Promise<{ post: MergedProduct }> {
  // Fetch Sanity data
  const sanityProduct: Product = await loadData(queries.shopSingle, { slug: params.slug })

  try {
    const shopifyClient = Client.buildClient({
      domain: SHOPIFY_DOMAIN,
      apiVersion: SHOPIFY_API_VERSION,
      storefrontAccessToken: PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    });

    // Fetch corresponding Shopify product
    const shopifyProduct: Client.Product = await shopifyClient.product.fetch(`gid://shopify/Product/${sanityProduct.shopifyId}`)

    // Convert Shopify products to serializable format
    const serializedShopifyProduct = JSON.parse(JSON.stringify(shopifyProduct));

    // Merge Sanity and Shopify data
    const mergedProduct: MergedProduct = {
      ...sanityProduct,
      shopify: serializedShopifyProduct || undefined
    }

    return {
      post: mergedProduct
    };
  } catch (error) {
    console.error('Failed to fetch Shopify product', error);
    return {
      post: sanityProduct
    };
  }
}