import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'propertyFilter',
})
export class PropertyFilterPipe implements PipeTransform {
    private searchValue: any;
    transform(value: any[], name: string, searchPropertyValue: unknown): any[] {
        // Проверка на пустые значения
        if (!value || !name || !searchPropertyValue) {
            return value;
        }

        // Преобразование к нижнему регистру для более гибкого поиска
        this.searchValue =
            typeof searchPropertyValue === 'string'
                ? searchPropertyValue.toLowerCase()
                : searchPropertyValue;

        return value.filter(item => {
            const propertyValue = item[name];

            // Проверка на пустую строку для свойства типа объекта
            if (typeof propertyValue === 'object' && propertyValue !== null) {
                return false;
            }

            // Фильтрация по значениям свойств
            switch (typeof propertyValue) {
                case 'string':
                    // Преобразование к нижнему регистру для более гибкого сравнения
                    return String(propertyValue).toLowerCase().includes(this.searchValue);
                case 'boolean':
                case 'number':
                case 'object':
                    return propertyValue === this.searchValue;
                default:
                    return false;
            }
        });
    }
}
