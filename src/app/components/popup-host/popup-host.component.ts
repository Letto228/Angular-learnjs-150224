import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {tap} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly templateContent$ = this.popupService.popupTemplate$.pipe(
        tap(templateOptions => {
            this.isEmpty = !templateOptions?.template;
        }),
    );

    @HostBinding('class.empty')
    isEmpty = true;

    constructor(private readonly popupService: PopupService) {}

    onPopupClose() {
        this.popupService.closePopup();
    }
}
