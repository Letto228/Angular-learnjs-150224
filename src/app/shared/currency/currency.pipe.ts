import {Pipe, PipeTransform} from '@angular/core';

type CurrencyCode = 'USD' | 'RUB';

const currencyCodeMap: Record<CurrencyCode, string> = {
    USD: '$',
    RUB: 'Р',
};

@Pipe({
    name: 'currency',
    pure: false,
})
export class CurrencyPipe implements PipeTransform {
    // constructor(...) {}

    transform(price: number | null | undefined, currencyCode: CurrencyCode = 'USD'): string {
        // eslint-disable-next-line no-console
        console.log('Calculate pipe card product');

        return `${price} ${currencyCodeMap[currencyCode]}`;
    }
}
