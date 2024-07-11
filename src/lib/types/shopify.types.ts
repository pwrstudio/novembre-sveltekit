export type ShopifyProduct = {
    id: string;
    title: string;
    handle: string;
    description: string;
    images: {
        edges: Array<{
            node: {
                url: string;
                altText: string | null;
            };
        }>;
    };
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
}