import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './enum/load-direction';
import {isScrollReachedBottomOffcet} from './utils/is-scroll-reached-bottom-offcet';
import {isScrollReachedTopOffcet} from './utils/is-scroll-reached-top-offcet';

// Without uniq event
// ------------------
@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private prevScrollTop = -1;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const prevScrollTop = this.prevScrollTop;

        this.prevScrollTop = scrollTop;

        const lowerScrollPosition = scrollHeight - clientHeight;
        const shouldLoadMessagesDown = isScrollReachedBottomOffcet(
            scrollTop,
            lowerScrollPosition,
            prevScrollTop,
        );

        if (shouldLoadMessagesDown) {
            this.loadData.emit(LoadDirection.After);

            return;
        }

        const shouldLoadMessagesTop = isScrollReachedTopOffcet(scrollTop, prevScrollTop);

        if (shouldLoadMessagesTop) {
            this.loadData.emit(LoadDirection.Before);
        }
    }
}

// With uniq event
// ---------------
// @Directive({
//     selector: '[appScrollWithLoading]',
// })
// export class ScrollWithLoadingDirective {
//     @Output() loadData = new EventEmitter<LoadDirection>();

//     private prevScrollTop = -1;
//     private locationArea = {
//         [LoadDirection.Before]: true,
//         [LoadDirection.After]: false,
//     };

//     @HostListener('scroll', ['$event.target'])
//     onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
//         const previousLocationArea = this.locationArea;

//         this.updateLocationArea(scrollTop, clientHeight, scrollHeight);

//         const insertInTopOffset =
//             this.locationArea[LoadDirection.Before] && !previousLocationArea[LoadDirection.Before];

//         if (insertInTopOffset) {
//             this.loadData.emit(LoadDirection.After);

//             return;
//         }

//         const insertInBottomOffset =
//             this.locationArea[LoadDirection.After] && !previousLocationArea[LoadDirection.After];

//         if (insertInBottomOffset) {
//             this.loadData.emit(LoadDirection.Before);
//         }
//     }

//     private updateLocationArea(scrollTop: number, clientHeight: number, scrollHeight: number) {
//         const prevScrollTop = this.prevScrollTop;

//         this.prevScrollTop = scrollTop;

//         const lowerScrollPosition = scrollHeight - clientHeight;
//         const shouldLoadMessagesDown = isScrollReachedBottomOffcet(
//             scrollTop,
//             lowerScrollPosition,
//             prevScrollTop,
//         );
//         const shouldLoadMessagesTop = isScrollReachedTopOffcet(scrollTop, prevScrollTop);

//         this.locationArea = {
//             [LoadDirection.After]: shouldLoadMessagesDown,
//             [LoadDirection.Before]: shouldLoadMessagesTop,
//         };
//     }
// }
