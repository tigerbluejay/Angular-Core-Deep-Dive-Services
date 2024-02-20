import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import {HttpClientModule} from '@angular/common/http';

// An angular module is an organizational unit where we put together
// components, directives, services, and pipe and so that are related.
// A module makes this available to our application or a third party 

@NgModule({
// declarations is an array containing all the components that are part of the module
// (components, directives and pipes that belong to the module)
  declarations: [
    AppComponent,
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective
  ],
  // here we define the dependent modules of this module
  // This module needs these three modules
  imports: [
    BrowserModule, // contains services needed to render apps on a browser (it includes core directives ngIf and so on)
    BrowserAnimationsModule, // to add animations to our application
    HttpClientModule // httpClientService is part of this module
  ],
  // here we define providers our application needs (instead of being injected via tree shakable providers
  // we can define it here - or instead of injecting it at the level of the component in the @Component providers property)
  providers: [], // for example could do providers: [CoursesService]
  // bootstrap is used to identify the root(s) component(s) of our application tree
  bootstrap: [AppComponent]
})
export class AppModule { }
