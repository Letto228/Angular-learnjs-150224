import {borderOffset} from '../constants/border-offset';

export function isScrollReachedTopOffcet(scrollTop: number, prevScrollTop: number): boolean {
    return scrollTop < borderOffset && scrollTop < prevScrollTop;
}
