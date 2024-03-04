import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent
    implements
        OnChanges,
        OnInit,
        DoCheck,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked,
        OnDestroy
{
    @Input() product: Product | null = null;
    // @Input() user: string | null = null;

    @Output() readonly buy = new EventEmitter<Product['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (!this.product) {
            return;
        }

        this.buy.emit(this.product._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }

    constructor() {
        // eslint-disable-next-line no-console
        console.log('constructor - Card');
    }

    // ngOnChanges({product, user}: SimpleChanges): void {
    //     console.log(product, user);

    //     const isProductChanged =
    //         product && product.currentValue?._id !== product.previousValue?._id;

    //     if (isProductChanged) {
    //         console.log(product.currentValue === this.product);
    //         // this.updateProduct();
    //     }

    //     if (user) {
    //         // this.updateUser();
    //     }
    // }

    ngOnChanges({product}: SimpleChanges): void {
        // eslint-disable-next-line no-console
        console.log(product, 'Card');
    }

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log('ngOnInit - Card');
    }

    ngDoCheck(): void {
        // eslint-disable-next-line no-console
        console.log('ngDoCheck - Card');
    }

    ngAfterContentInit(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterContentInit - Card');
    }

    ngAfterContentChecked(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterContentChecked - Card');
    }

    ngAfterViewInit(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterViewInit - Card');
    }

    ngAfterViewChecked(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterViewChecked - Card');
    }

    ngOnDestroy(): void {
        // eslint-disable-next-line no-console
        console.log('ngOnDestroy - Card');
    }
}
