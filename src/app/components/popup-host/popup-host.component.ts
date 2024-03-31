import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subject, takeUntil, tap} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';
import {PopupData} from '../../shared/popup/popup.interface';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnInit, OnDestroy {
    protected template: TemplateRef<unknown> | null = null;
    protected context: unknown = null;
    private readonly destroy$ = new Subject<void>();

    constructor(readonly popupService: PopupService) {}

    ngOnInit(): void {
        this.popupService.template$
            .pipe(
                tap((data: PopupData | null) => {
                    if (data === null) {
                        this.template = null;
                        this.context = null;

                        return;
                    }

                    this.template = data.template;
                    this.context = data.context;
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
