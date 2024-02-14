import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  // root here means that the instance of CoursesService
  // will be an instance for the entire application.
  // this means that if we inject an object of type
  // CoursesService to a course-card and we have many
  // course-cards, only one instance of CoursesService
  // will be used. This is an application Singleton
  providedIn: 'root'
})
// isolating like we've done here the http logic in
// a service, is a good pattern.
// now the app.component.ts doesn´t know if this is
// an http request, it simply calls the loadCourses()
// method, which has all the logic incapsulated in this class.


export class CoursesService {

  constructor(private http: HttpClient) { 
    // this is to verify that the courses service
    // is created only once. It is a singleton.
      console.log("Creating courses service");
  }

  // Observable<Course[]> is the return type of loadCourses()
  loadCourses(): Observable<Course[]> {

    const params = new HttpParams()
        .set("page", "1")
        .set("pageSize", "10");
    
    return this.http.get<Course[]>('/api/courses', {params});
  }

  // this is the api of the service
  // were we perform the data modification operation
  saveCourse(course: Course){

    // we add a header
    const headers = new HttpHeaders()
        .set("X-Auth", "userId");

    // here we return the observable
    // we pass the headers as the third argument of the put call
    return this.http.put(`/api/courses/${course.id}`, 
    course, {headers});
  }
}
