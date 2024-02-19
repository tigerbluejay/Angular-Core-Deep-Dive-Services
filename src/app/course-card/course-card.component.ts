import {
    AfterContentInit,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    // first we define coursesService in the service folder
    // the we inject it in the application constructor app.components.ts
    // now we can inject it at the compenent level via the constructor
    constructor(private coursesService: CoursesService,
        @Attribute('type') private type: string) {

            console.log(type);
    }

    ngOnInit() {
    // after injecting in the constructor (asbove) we now
    // test whether we can access the coursesService object
    console.log("coursesService course card", this.coursesService);
    }

    // this method captures the modified title of the course.
    // we only override the description property of the course
    // on the course card view we have a button html element
    // which is subscribed to the click event and triggers
    // this method (onSaveClicked) capturing the new course title
    // then this method emits this changed title on a courseChanged object
    // which is the output
    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }

    // to demonstrate default/standard change detection
    // we define the event handler method of the course-card component
    onTitleChanged(newTitle:string){
        this.course.description = newTitle;
    }



}
