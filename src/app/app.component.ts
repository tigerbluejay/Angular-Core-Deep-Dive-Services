import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  courses$ : Observable<Course[]>;

  // declare a reference to the service
  // and we inject it (dependency injection)
  constructor(private http: HttpClient) {

  }

  // lifecycle hook - trigger a backend http call
  // called by the framework (before the application)
  ngOnInit() {

    // // define parameters to add to the request
    // // we add it below with {params}
    const params = new HttpParams()
      .set("page", "1")
      .set("pageSize", "10");

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

    this.courses$ = this.http.get<Course[]>('/api/courses', {params});

  }
}
