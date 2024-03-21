import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform(value: any[], propertyName: string, searchPropertyValue: any): any[] {
        if (!value || !propertyName || !searchPropertyValue) {
            return value;
        }

        return value.filter(item => {
            const propertyValue = item[propertyName];

            switch (typeof propertyValue) {
                case 'string':
                    return propertyValue.includes(searchPropertyValue);
                case 'boolean':
                case 'number':
                case 'object':
                    return propertyValue === searchPropertyValue;
                default:
                    return false;
            }
        });
    }
}
