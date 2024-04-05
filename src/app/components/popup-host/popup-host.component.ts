import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {tap} from 'rxjs';
import {IPopup} from 'src/app/shared/popup/popup.interface';
import {PopupService} from 'src/app/shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    popup: IPopup<object> | null = null;

    constructor(private readonly popupService: PopupService) {}

    readonly templateInfo$ = this.popupService.popup$.pipe(
        tap(curConf => {
            this.isEmpty = !curConf?.template;
        }),
    );

    @HostBinding('class.empty')
    isEmpty = true;

    closePopup() {
        this.popupService.closePopup();
    }
}
