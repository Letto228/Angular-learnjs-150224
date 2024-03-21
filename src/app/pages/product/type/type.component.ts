import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeComponent {}
