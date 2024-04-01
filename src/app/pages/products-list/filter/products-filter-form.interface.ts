export interface ProductsFilterForm {
    name: string | null;
    brands: Array<boolean | null>;
    priceRange: {
        min: number | null;
        max: number | null;
    };
}
