import type { Product } from "$lib/types/sanity.types";

export type MergedProduct = Product & { quantity?: number };