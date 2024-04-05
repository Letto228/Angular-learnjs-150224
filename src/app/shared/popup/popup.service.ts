import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IPopup} from './popup.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly popupSubject = new BehaviorSubject<IPopup<object> | null>(null);
    readonly popup$ = this.popupSubject.asObservable();

    openPopup(template: IPopup<object>) {
        this.popupSubject.next(template);
    }

    closePopup() {
        this.popupSubject.next(null);
    }
}
