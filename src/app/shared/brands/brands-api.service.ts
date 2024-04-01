import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {getParamsFromObject} from '../params/get-params-from-object';

@Injectable({
    providedIn: 'root',
})
export class BrandsApiService {
    constructor(private readonly http: HttpClient) {}

    getBrands$(subCategoryId?: string | null): Observable<string[]> {
        return this.http
            .get<{data: string[]}>('/brands', {
                params: getParamsFromObject({subCat: subCategoryId}),
            })
            .pipe(map(({data}) => data));
    }
}
