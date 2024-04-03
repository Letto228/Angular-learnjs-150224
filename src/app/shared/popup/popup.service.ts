import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PopupData} from './popup.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly templateStore = new BehaviorSubject<PopupData | null>(null);

    readonly template$ = this.templateStore.asObservable();

    openPopup(template: TemplateRef<unknown>, context: unknown = null) {
        this.templateStore.next({template, context});
    }

    closePopup() {
        this.templateStore.next(null);
    }
}
