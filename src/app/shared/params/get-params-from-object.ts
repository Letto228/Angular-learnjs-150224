import {HttpParams} from '@angular/common/http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getParamsFromObject(source: Record<string, any>): HttpParams {
    if (!source) {
        return new HttpParams();
    }

    return Object.entries(source).reduce((params, [key, value]) => {
        const isNullOrUndefined = value === null || value === undefined;

        if (isNullOrUndefined) {
            return params;
        }

        return params.set(key, value);
    }, new HttpParams());
}
