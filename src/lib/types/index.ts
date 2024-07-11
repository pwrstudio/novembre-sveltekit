import type { Product } from "$lib/types/sanity.types";
import Client from 'shopify-buy';

export type MergedProduct = Product & { shopify?: Client.Product } & { quantity?: number };