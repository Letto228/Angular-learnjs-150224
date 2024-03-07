import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appDumpNgIf]',
})
export class DumpNgIfDirective<T> {
    @Input() set appDumpNgIf(value: T | undefined | null) {
        const isContainerHasView = this.viewContainerRef.length;

        if (value && !isContainerHasView) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);

            return;
        }

        if (!value && isContainerHasView) {
            this.viewContainerRef.clear();
        }
    }

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<unknown>,
    ) {}

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appDumpNgIf<T>(
        _directive: DumpNgIfDirective<T>,
        _inputValue: T | undefined | null,
    ): _inputValue is T {
        return true;
    }
}
