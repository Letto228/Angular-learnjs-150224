import {InjectionToken} from '@angular/core';

export const BASE_URL_TOKEN = new InjectionToken('Base url token', {
    providedIn: 'root',
    factory: () => 'https://course-angular.javascript.ru/api',
});
