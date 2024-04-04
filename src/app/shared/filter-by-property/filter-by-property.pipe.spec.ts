import {productsMock} from '../products/products.mock';
import {FilterByPropertyPipe} from './filter-by-property.pipe';

describe('FilterByPropertyPipe', () => {
    let pipe: FilterByPropertyPipe;

    beforeEach(() => {
        pipe = new FilterByPropertyPipe();
    });

    it('Фильтрация по имени', () => {
        const value = pipe.transform(productsMock, 'name', productsMock[0].name);

        expect(value).toEqual([productsMock[0]]);
    });

    it('Фильтрация по id', () => {
        const value = pipe.transform(productsMock, '_id', 'unknow');

        expect(value).toEqual([]);
    });
});
