import {ComponentFixture, TestBed} from '@angular/core/testing';

import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {take} from 'rxjs';
import {HeaderComponent} from './header.component';
import {HeaderModule} from './header.module';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // declarations: [HeaderComponent],
            imports: [HeaderModule, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Клик по меню', () => {
        const {debugElement} = fixture;
        const menuClickEmitSpy = spyOn(component.menuClick, 'emit');
        const trigerEvent = new Event('click');

        expect(menuClickEmitSpy).not.toHaveBeenCalled();

        debugElement
            .query(By.css('[test-id="menu-button"]'))
            .triggerEventHandler('click', trigerEvent);

        expect(menuClickEmitSpy).toHaveBeenCalled();
    });

    it('Клик по меню async', done => {
        const {debugElement} = fixture;
        const trigerEvent = new Event('click');

        component.menuClick.pipe(take(1)).subscribe(() => {
            done();
        });

        debugElement
            .query(By.css('[test-id="menu-button"]'))
            .triggerEventHandler('click', trigerEvent);
    });
});
