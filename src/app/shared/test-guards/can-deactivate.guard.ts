import {CanDeactivateFn} from '@angular/router';
import {question} from './question';

export const canDeactivateGuard: CanDeactivateFn<unknown> = (
    _component,
    _currentRoute,
    _currentState,
    _nextState,
) => {
    return question('Хотите ли вы уйти с данного пути');
};
