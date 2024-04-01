export interface ProductsFilter {
    name: string;
    brands: string[];
    priceRange: {
        min: number;
        max: number;
    };
}
