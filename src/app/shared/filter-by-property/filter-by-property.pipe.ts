import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T>(
        items: T[] | undefined | null,
        propertyName: keyof T,
        searchValue: unknown,
    ): T[] | undefined | null {
        if (!items?.length || typeof searchValue === 'undefined' || searchValue === null) {
            return items;
        }

        return items.filter(item => {
            const itemValue = item[propertyName];

            if (typeof itemValue === 'string') {
                return itemValue.toLowerCase().includes(String(searchValue).toLowerCase());
            }

            return itemValue === searchValue;
        });
    }
}
