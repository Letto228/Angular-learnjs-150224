import {TemplateRef} from '@angular/core';

export interface IPopup<T extends object> {
    template: TemplateRef<T>;
    context: T;
}
