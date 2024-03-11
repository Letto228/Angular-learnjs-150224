import {borderOffset} from '../constants/border-offset';

export function isScrollReachedBottomOffcet(
    scrollTop: number,
    lowerScrollPosition: number,
    prevScrollTop: number,
): boolean {
    return lowerScrollPosition - scrollTop < borderOffset && scrollTop > prevScrollTop;
}
