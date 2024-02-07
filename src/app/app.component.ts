import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
  constructor(private coursesService: CoursesService) {

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
