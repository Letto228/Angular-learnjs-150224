import {NgModule} from '@angular/core';
import {FilterPipePipe} from './filter-pipe.pipe';

@NgModule({
    declarations: [FilterPipePipe],
    exports: [FilterPipePipe],
})
export class FilterPipeModule {}
