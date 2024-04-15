import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';

export type TPopupTemplate = TemplateRef<{$implicit: string}>;

export type TPopupContext = {$implicit: string};

export type TTemplateRef = {
    templateRef: TPopupTemplate;
    contextRef: TPopupContext;
};

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    readonly popUpTemplate$ = new Subject<TTemplateRef | null>();

    openPopup(template: TPopupTemplate, context: TPopupContext) {
        this.popUpTemplate$.next({
            templateRef: template,
            contextRef: context,
        });
    }

    closePopup() {
        this.popUpTemplate$.next(null);
    }
}
