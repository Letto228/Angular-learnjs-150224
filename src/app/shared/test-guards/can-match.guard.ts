import {CanMatchFn} from '@angular/router';
import {question} from './question';

export const canMatchGuard: CanMatchFn = (_route, _segments) => {
    return question('Можно ли применить данный конфиг?');
};
