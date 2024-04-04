import {FormControl, FormsModule, NgModel} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, flush} from '@angular/core/testing';
import {ValidatorsModule} from './validators.module';
import {IsStringValidatorDirective} from './is-string-validator.directive';

describe('IsStringValidatorDirective Isolate', () => {
    it('should create an instance', () => {
        const directive = new IsStringValidatorDirective();

        const error = directive.validate(new FormControl('123'));

        expect(error).toEqual({isStringValidator: `Is value: 123 - number`});
    });
});

@Component({
    template: `
        <input #input appIsStringValidator [ngModel]="search" />
    `,
})
class TestComponent {
    search = '123';

    @ViewChild('input', {read: NgModel, static: true})
    ngModel: NgModel | undefined;
}

describe('IsStringValidatorDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ValidatorsModule, FormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('Ошибка при старте', fakeAsync(() => {
        fixture.detectChanges();

        // tick(100);
        flush();

        const errors = component.ngModel?.errors;

        expect(errors).toEqual({isStringValidator: `Is value: 123 - number`});
    }));
});
