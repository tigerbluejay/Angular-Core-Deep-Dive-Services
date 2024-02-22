import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CoursesService } from './courses.service';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { FilterByCategoryPipe } from './filter-by-category.pipe';



@NgModule({
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective,
    FilterByCategoryPipe
  ],
  imports: [
    CommonModule // contains ngFor ngIf and other such directives
                // it does not appear on the root because it is a transitive
                // dependency to the Browser Module
  ],
  exports: [ // this section is needed to make visible certain
              // components that might otherwise be kept private
              // and out of sight of the app.module.ts
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe
  ],
  providers: [
    CoursesService
  ]
})
export class CoursesModule { }
