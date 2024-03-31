import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PopupData} from './popup.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    template$ = new BehaviorSubject<PopupData | null>(null);

    openPopup(template: TemplateRef<unknown>, context: unknown = null) {
        this.template$.next({template, context});
    }

    closePopup() {
        this.template$.next(null);
    }
}
