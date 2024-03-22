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
        if (!Array.isArray(items) || !propertyName || typeof searchValue === 'undefined') {
            return items;
        }

        return items.filter(item => {
            if (typeof item[propertyName] === 'string') {
                return (item[propertyName] as string)
                    .toLowerCase()
                    .includes((searchValue as string).toLowerCase());
            }

            return item[propertyName] === searchValue;
        });
    }
}
