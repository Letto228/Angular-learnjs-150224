import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {BrandsApiService} from './brands-api.service';

@Injectable({
    providedIn: 'root',
})
export class BrandsService {
    private readonly brandsStore$ = new BehaviorSubject<string[] | null>(null);

    private loadBrandsSubscription: Subscription | null = null;

    readonly brands$ = this.brandsStore$.asObservable();

    constructor(private readonly brandsApiService: BrandsApiService) {}

    loadBrands(subCategoryId?: string | null) {
        if (this.loadBrandsSubscription) {
            this.loadBrandsSubscription.unsubscribe();
        }

        this.loadBrandsSubscription = this.brandsApiService
            .getBrands$(subCategoryId)
            .subscribe(brands => {
                this.brandsStore$.next(brands);

                this.loadBrandsSubscription = null;
            });
    }
}
