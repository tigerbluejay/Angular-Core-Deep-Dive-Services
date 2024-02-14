import {AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES, findCourseById} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';
import { ParseErrorLevel } from '@angular/compiler';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // here we are injecting a plain javascript object
  // defined in config.ts
  // providers: [
  //   {provide: CONFIG_TOKEN, useFactory: () => APP_CONFIG}
  // ]
  // alternative syntax
  // providers: [
  //   {provide: CONFIG_TOKEN, useValue: APP_CONFIG}
  // ]
  // instead of doing "providers" here, we define in 
  // config.ts ProvidedIn to make the injectable "tree shakable"
})
export class AppComponent implements OnInit {

  // courses member variable
  // courses;

  // we define an observable variable
  // the values emited by this observable over time
  // are going to be each value, an array of courses.
  // the observable is courses$ and each value emitted
  // by the observable will be an array of courses.
  courses$ : Observable<Course[]>;

  // declare a reference to the service
  // and we inject it (dependency injection)
  // Courses service is injected also, but this
  // is declared in the services folder
  // constructor(private http: HttpClient, 
  //   private coursesService: CoursesService) {

  // }
  // We moved the Http Client to the service root
  constructor(private coursesService: CoursesService,
    //we also want to inject a plain javascript object
    // here we are injecting a plain javascript object
    // defined in config.ts
    @Inject(CONFIG_TOKEN) private config: AppConfig) {
      console.log(config);
  }

  // lifecycle hook - trigger a backend http call
  // called by the framework (before the application)
  ngOnInit() {

    // // define parameters to add to the request
    // // we add it below with {params}
    // we now move the code below to the services folder
    // const params = new HttpParams()
    //   .set("page", "1")
    //   .set("pageSize", "10");

    // // we consume a service available at
    // // localhost:9000/api/courses - we previously
    // // initialized the service to consume it
    // this.http.get('/api/courses', {params})
    // // subscribe success handler
    // // we assign the array of courses to the
    // // courses member variable
    // // here we are manually subscribing to the
    // // observabe this.http.get etc..
    //   .subscribe(
    //       courses => this.courses = courses
    //   );

    // this.courses$ = this.http.get<Course[]>('/api/courses', {params});
    // we moved this logic in the line above to the service folder
    // and so now we call the loadCourses method in the services folder
    this.courses$ = this.coursesService.loadCourses();

    // we test the injected coursesService
    console.log(this.coursesService);
  }

  // if we don't subscribe to the observable, then the course will not be saved
  save(course:Course){
    this.coursesService.saveCourse(course)
        .subscribe(
          () => console.log('Course Saved')
        );
  }
}


/* DEPENDENCY INJECTION THEORY */

// Any component, service or directive can be injected
// via dependency Injection, for example via the constructor
// as we've done above with CoursesService.
// Dependency injection has the advantage of making the application 
// more easily Testable.
// In addition if we didn't use dependency injection we would have
// to use Inputs and if we had a deeply nested component where we 
// would like to inject a service we'd have to rely on Input but on
// every level of the nesting Chain (the component tree)
// A service for example that is injected via dependency injection 
// can have its own dependencies injected via the constructor. 
// How is angular creating the injected dependency? 
// With: @Injectable(){ 
//   providedIn: 'root'
// } 
// declared at the level of the component we want to inject.
// The provider is what creates the dependency.
// The provider will use a factory function and it will generate the dependency. 


/* WE WRITE OUR OWN PROVIDER 
TO UNDERSTAND WHAT IS HAPPENING UNDER THE HOOD  */

// We don't need to write our own providers by hand. Angular provides that
// automatically.

// // 1
// // the provider factory function that returns a CoursesService
// // and it calls the constructor. That is what the provider is.
// function coursesServiceProvider(): CoursesService {
//   return new CoursesService(http);
// }
// we write this in the app.component.ts file, that is the level of the
// top level component where we are injecting a dependency.

// // 2
// // the unique courses service injection token
// // which is a unique identifier for a dependency
// const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');
// we write this in the app.component.ts file, that is the level of the
// top level component where we are injecting a dependency.

// // 3
// // the dependency injection system
// // we inform Angular the unique token and the provider function
// // and the dependencies of our dependency with "deps"
// @Component({
//   providers: [
//     {provide: COURSES_SERVICE, useFactory: coursesServiceProvider,
//     deps: [HttpClient]}
//    ]
// })
// we write this in the app.component.ts file, that is the level of the
// top level component where we are injecting a dependency.

// // 4
// // in the constructor, everywhere we are injecting it
// // we add the @Inject decorator with a reference to the token

// // export class AppComponent implements OnInit {
// //   constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService) {}
// // }

// // export class CourseCardComponent implements OnInit {
// //   constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService) {};
// // }


/* WE ANGULAR IS DOING UNDER THE HOOD 
WHEN WE DONT WRITE OUR OWN PROVIDER */

// Angular support class names as unique injection tokens.
// So we could do:
// // @Component({
// //   providers: [
// //     {provide: CourseService, useFactory: coursesServiceProvider,
// //     deps: [HttpClient]}
// //    ]
// // })
// // And we don't need to write @Inject in the constructors

// We can use useClass instead of useFactory
// So we don't need the factory function or the deps dependencies
// So we could do:
// // @Component({
// //   providers: [
// //     {provide: CourseService, useClass: CourseService
// //    ]
// // })

// This could be further simplified to:
// // @Component({
// //   providers: [
// //     CourseService
// //    ]
// // })

// Further, although we are defining the providers in the app.component.ts 
// file, we generally define providers (application singletons) in 
// the app.module.ts file. So the @Component block wouldn't appear at the 
// component level.


/* HIERARCHICAL DEPENDENCY INJECTION */
// In the case where we want to access a service that we are injecting 
// into child components of a component.
// We can choose to define
// // // @Component({
// // //   providers: [
// // //     CourseService
// // //    ]
// // // })
// at the level of each nested component, and not only in the parent component.
// Thus if we have an app.component and within it a nested component 
// course-card.component 
// We can define with @Component that CourseService is a provider at both 
// levels.
// If ten course cards are displayed, then there will be 11 instances of 
// CoursesService: one for the root component and one for each course card.
// We would want to define a provider for each of the nested child components 
// (the course cards ) if the service we are injecting had a state which is 
// private to that component we would want to create multiple instances of the 
// injected service. 
// When the component is destroyed, the service instances associated with the component 
// would be destroyed also.
// On the other hand if we define the dependency only at the parent level component we 
// can still use it at the child level component but the parent instance will be used
// Thus when we create a course card if, we did not define providers for it in its template 
// the course card element will ask its parent and its parents parent and so on, until it finds 
// the provider for the injected service.


/* TREE SHAKABLE PROVIDERS */
// Instead of injecting at the app.component.ts level the CoursesService.
// We can inject it at the courses.service.ts level.
// This is true whenever we are injecting an application singleton, that is 
// we are injecting a single instance of the service for the whole application.
// If again, our subcomponents had states specific to the components, then in that case 
// we would want to inject at the subcomponent level.

// Why would we do this? 
// To avoid loading our application bundle with unnecessary code.

// To inject at the courses.service.ts level we would write 
// @Injectable({
//   providedIn: 'root'
// })

// We could also be more verbose using: 
// @Injectable({
//   providedIn: 'root',
//   useClass: CoursesService
// })

// although this might be redundant. As would be the alternative syntax:

// We could also be more verbose using: 
// @Injectable({
//   providedIn: 'root',
//   useFactory: (http) => new CoursesService(http)
//   deps: [httpClient]
// })

// Whenever we are using the @Injectable syntax at the course.services.ts level.
// We should remove the following syntax from the components or root level components 

// @Component({
//   providers: [
//     CourseService
//   ]
// })


/* ADVANCED DEPENDENCY INJECTION */
/* INJECTING THINGS OTHER THAN CLASSES
LIKE A PLAIN JAVASCRIPT OBJECT */

// The CoursesService we have been injecting is an instance of a class service.
// example worked on: config.ts and app.component.ts and maybe courses.service.ts


/* ADVANCED DEPENDENCY INJECTION */
/* OPTIONAL, SELF AND SKIP SELF DECORATORS */
// Most of the time we won't need them, but we can use them

// @Optional allows us to not define a provider and
// allows us to handle programmatically the cases when the
// injected service defined in the constructor is expected but not used.
// in the rest of the code
// without getting the error we would get for using a service in
// the constructor that has no provider 

// for example in app.component we could do
// constructor(
//  @Optional() private coursesService: CoursesService)
// {}

// @Self makes sure that the injected service defined in the
// constructor comes from
// the same component class and not from a parent element in
// the hierarchy.

// if for example we have defined in app.component
// @Component({
//   providers: [
//     CourseService
//   ]
// })
// and in a nested component course-card we also have 
// @Component({
//   providers: [
//     CourseService
//   ]
// })
// we define in course-card.component
// constructor(@Self() private coursesService: CoursesService){}
// then Self indicates that the course card component provider will
// be used.

// @Skip-self makes sure that the injected service defined in the
// constructor comes from
// the parent class and not from the same component class.
// if for example we have defined in app.component
// @Component({
//   providers: [
//     CourseService
//   ]
// })
// and in a nested component course-card we also have 
// @Component({
//   providers: [
//     CourseService
//   ]
// })
// we define in course-card.component
// constructor(@Skip-self() private coursesService: CoursesService){}
// then Skip-self indicates that the app.component (parent) provider will
// be used.

/* ADVANCED DEPENDENCY INJECTION */
/* HOST DECORATOR */
// When we have a directive like "highlighted", which might be applied
// to an element such as "course-card", we say that course card is the
// host of the highlighted directive.
// With this in mind, when we want to inject the CoursesService and we
// want the provider to be course-card (the host element) and not necessarily
// an element higher in the hierarchy like app.component for example, we
// use the @Host decorator in the constructor of the directive.
// Like this:
// In highlighted.directive.ts
// constructor(@Host() private coursesService: CoursesService){
//   console.log('coursesService highlighted' + CoursesService.id);
// }
// And of course we have to define the provider in the host element so 
// in course-card.component.ts we do 
// @Component({
//   providers: [
//     CourseService
//   ]
// })