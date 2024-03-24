import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, N extends keyof T>(
        value: T[],
        propertyName: N,
        searchPropertyValu: T[N],
    ): T[] | [] {
        if (typeof searchPropertyValu === 'string') {
            return value.filter(item => {
                const itemString = item[propertyName] as string;

                return itemString.includes(searchPropertyValu);
            });
        }

        return value.filter(item => {
            return item[propertyName] === searchPropertyValu;
        });
    }
}
