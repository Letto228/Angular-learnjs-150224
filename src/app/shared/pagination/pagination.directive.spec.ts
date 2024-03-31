import {TemplateRef, ViewContainerRef} from '@angular/core';
import {PaginationDirective} from './pagination.directive';

describe('PaginationDirective', () => {
    it('should create an instance', () => {
        const templateRefMock: TemplateRef<any> = {} as TemplateRef<any>;
        const viewContainerRefMock: ViewContainerRef = {} as ViewContainerRef;

        const directive = new PaginationDirective(templateRefMock, viewContainerRefMock);

        expect(directive).toBeTruthy();
    });
});
