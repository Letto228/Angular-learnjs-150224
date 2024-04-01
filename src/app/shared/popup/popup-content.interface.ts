import {TemplateRef} from '@angular/core';

export interface IPopupContent<T extends object> {
    template: TemplateRef<T>;
    context: T;
}
