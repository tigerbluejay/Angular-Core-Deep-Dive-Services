import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { CoursesModule } from './courses/courses.module';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { CourseTitleComponent } from './course-title/course-title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// An angular module is an organizational unit where we put together
// components, directives, services, and pipe and so that are related.
// A module makes this available to our application or a third party 

// @NgModule({
// // declarations is an array containing all the components that are part of the module
// // (components, directives and pipes that belong to the module)
//   declarations: [
//     AppComponent,
//     CourseCardComponent,
//     CourseImageComponent,
//     HighlightedDirective,
//     NgxUnlessDirective
//   ],
//   // here we define the dependent modules of this module
//   // This module needs these three modules
//   imports: [
//     BrowserModule, // contains services needed to render apps on a browser (it includes core directives ngIf and so on)
//     BrowserAnimationsModule, // to add animations to our application
//     HttpClientModule // httpClientService is part of this module
//   ],
//   // here we define providers our application needs (instead of being injected via tree shakable providers
//   // we can define it here - or instead of injecting it at the level of the component in the @Component providers property)
//   providers: [], // for example could do providers: [CoursesService]
//   // bootstrap is used to identify the root(s) component(s) of our application tree
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


@NgModule({
    declarations: [
      // AppComponent,
      // CourseTitleComponent
      // CourseCardComponent, // added to courses module
      // CourseImageComponent, // added to courses module
      // HighlightedDirective, // added to courses module
      // NgxUnlessDirective // added to courses module
    ],
    imports: [
      // BrowserModule,
      // BrowserAnimationsModule,
      // HttpClientModule,
      // CoursesModule,
      // FormsModule
    ]
    // providers: [],
    // // bootstrap: [AppComponent],
  })
  export class AppModule { }
  

  // MIGRATING TO STANDALONE COMPONENTS
  // Standalone components are the recommended way of developing
  /* You can switch from an application that relies on modules
  to an application where all components are standalone
  To do this migration automatically you can run the command
  > ng generate @angular:core/standalone
  Or Manually in 3 Steps

  STEP 1: Conver all components, directives and pipes to standalone
  a. Go to all components ts file and mark them as standalone:true
  (this includes components, directives, and pipes)
  b. Remove declarations from module files
  c. Remove the exports of the module files
  d. Import directives like ngIf and ngFor into the component ts file
  in the imports property
  e. Make the root component of the application standalone
  f. Import Components into the root component if it uses nested components

  STEP 2: Removing unnecessary NgModules from the application
  g. Remove schemas
  h. Remove providers properties from NgModules and ass them as injectables in
  the components ts file
  i. You can import whole modules in in the imports property of each component

  STEP 3: Refactor the bootstrapping of our application to not use NgModules
  Bootstrap the application using standalone APIs (in main.ts)
  j. Make changes in main.ts in this regard
  k. Refactor inputs property of root component module into main.ts
  l. Now that the modules are empty and refactored, delete them.
*/

