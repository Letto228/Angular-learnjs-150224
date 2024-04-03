import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';
import {PopupData} from '../../shared/popup/popup.interface';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnInit, OnDestroy {
    template: TemplateRef<unknown> | null = null;
    context: unknown = null;
    private readonly destroy$ = new Subject<void>();

    constructor(readonly popupService: PopupService) {}

    ngOnInit(): void {
        this.initTemplateSubscription();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    closePopup() {
        this.popupService.closePopup();
    }

    initTemplateSubscription(): void {
        this.popupService.template$
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: PopupData | null) => {
                if (data === null) {
                    this.template = null;
                    this.context = null;

                    return;
                }

                this.template = data.template;
                this.context = data.context;
            });
    }
}
