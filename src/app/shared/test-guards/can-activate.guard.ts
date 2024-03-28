import {CanActivateFn} from '@angular/router';
import {question} from './question';

export const canActivateGuard: CanActivateFn = (_route, _state) => {
    // const router = inject(Router);

    // router.navigate(...)

    // return false;

    // OR

    // const router = inject(Router);

    // return router.createUrlTree(...);

    return question('Разрешить переход по данному пути?');
};
