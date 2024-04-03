import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
    transform<T, P extends keyof T>(items: T[], propertyName: P, searchPropertyValue: T[P]): T[] {
        if (!items || !propertyName || !searchPropertyValue) {
            return items;
        }

        if (typeof searchPropertyValue === 'string') {
            const filterItems = items.filter(item =>
                String(item[propertyName])
                    .toUpperCase()
                    .includes(searchPropertyValue.toUpperCase()),
            );

            return filterItems;
        }

        const filterItems = items.filter(item => item[propertyName] === searchPropertyValue);

        return filterItems;
    }
}
