import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IPopupContent} from './popup-content.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly popupTemplateStore$ = new BehaviorSubject<IPopupContent<object> | null>(null);

    readonly popupTemplate$ = this.popupTemplateStore$.asObservable();

    openPopup<T extends object>(popupContent: IPopupContent<T>) {
        this.popupTemplateStore$.next(popupContent);
    }

    closePopup() {
        this.popupTemplateStore$.next(null);
    }
}
