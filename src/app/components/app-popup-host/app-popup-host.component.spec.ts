import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppPopupHostComponent} from './app-popup-host.component';

describe('AppPopupHostComponent', () => {
    let component: AppPopupHostComponent;
    let fixture: ComponentFixture<AppPopupHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppPopupHostComponent],
        });
        fixture = TestBed.createComponent(AppPopupHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
