import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {PopupHostComponent, IPopupHostConfig} from './components/popup-host/popup-host.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    readonly applicationConfigMock = applicationConfigMock;

    switchTemplate = new BehaviorSubject<boolean | null | undefined>(undefined);
    @ViewChild('first', {static: true}) template1: TemplateRef<unknown> | undefined;
    @ViewChild('second', {static: true}) template2: TemplateRef<unknown> | undefined;

    constructor(public dialog: MatDialog) {
        setTimeout(() => {
            this.switchTemplate.next(!this.switchTemplate.value);
        }, 3000);
        setTimeout(() => {
            this.switchTemplate.next(!this.switchTemplate.value);
        }, 6000);
        setTimeout(() => {
            this.switchTemplate.next(!this.switchTemplate.value);
        }, 9000);
        setTimeout(() => {
            this.switchTemplate.next(null);
        }, 12000);
    }

    ngOnInit(): void {
        this.switchTemplate.subscribe(() => {
            if (typeof this.switchTemplate.value === 'boolean') {
                this.openDialog();

                return;
            }

            this.dialog.closeAll();
        });
    }

    openDialog(): void {
        if (this.dialog.openDialogs) {
            this.dialog.closeAll();
        }

        const dialogRef = this.dialog.open(PopupHostComponent, {
            width: '400px',
            data: <IPopupHostConfig>{
                title: 'Some title !',
                dialogContent: this.switchTemplate.value ? this.template1 : this.template2,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                // return
            }
        });
    }
}
