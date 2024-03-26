import {UrlMatchResult, UrlMatcher, UrlSegment} from '@angular/router';

const allProductsSegmentsLength = 0;
const subcategoryProductsSegmentsLength = 1;
const subcategoryProductsSegmentsIndex = 0;

export const productsListMatcher: UrlMatcher = (segments: UrlSegment[]): UrlMatchResult | null => {
    const isAllProductsSegments = segments.length === allProductsSegmentsLength;
    const isSubcategoryProductsSegments = segments.length === subcategoryProductsSegmentsLength;

    if (!isAllProductsSegments && !isSubcategoryProductsSegments) {
        return null;
    }

    const urlMatchResult: UrlMatchResult = {
        consumed: segments,
    };

    if (isSubcategoryProductsSegments) {
        const subcategorySegment = segments[subcategoryProductsSegmentsIndex];

        urlMatchResult.posParams = {
            subCategoryId: subcategorySegment,
        };
    }

    return urlMatchResult;
};
