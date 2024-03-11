import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {DumpNgIfContext} from './dump-ng-if-context.interface';

@Directive({
    selector: '[appDumpNgIf]',
})
export class DumpNgIfDirective<T> {
    @Input() set appDumpNgIf(value: T | undefined | null) {
        const isContainerHasView = this.viewContainerRef.length;

        if (value && !isContainerHasView) {
            const context: DumpNgIfContext<T> = {
                appDumpNgIf: value,
                $implicit: value,
            };

            this.viewContainerRef.createEmbeddedView(this.templateRef, context);

            return;
        }

        if (!value && isContainerHasView) {
            this.viewContainerRef.clear();
        }
    }

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<DumpNgIfContext<T>>,
    ) {}

    static ngTemplateContextGuard<T>(
        _directive: DumpNgIfDirective<T>,
        _context: unknown,
    ): _context is DumpNgIfContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appDumpNgIf<T>(
        _directive: DumpNgIfDirective<T>,
        _inputValue: unknown,
    ): _inputValue is T {
        return true;
    }
}
