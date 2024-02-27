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
import {Course} from '../../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../courses.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, CommonModule],
    standalone: true
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

// LIFECYCLE HOOKS (continued): AFTERCONTENTCHECKED
// ngAfterContentChecked() (AfterContentChecked interface)
// Called after the contents of a component (nested tags within the component) are checked for changes.
// For example the course-image tag inside the course-card component (in app.component.html)
// Called whenever angular triggers change detection (for example after loading the page, 
// after receiving content from the backend)
// We should implement code that is lightweight on this method because the hook is called multiple times.

// We can modify properties of the component, but not properties of the content of the component,
// because ngAfterContentChecked() will be called AFTER checking the content of the component.
// If we try to do this, we'll get an error. This is because the content part is checked first,
// then the hook is called - changing properties of the component if we decide to do so programmatically-,
// and then the component is checked.
// So this is an ideal place to modify properties of the component (but not the content of that component)

// It is a good place to make last second modifications to the data of the component.


// LIFECYCLE HOOKS (continued): AFTERVIEWCHECKED
// ngAfterViewChecked() (AfterViewChecked interface)
// Called after AfterContentChecked() with each change detection execution.
// Angular checks the template of the component (except the contents of the component)
// So if we try to modify programmatically a property in a component it will return an error.
// This hook is useful to implement for example scrolling logic since everything has been checked.
// Or similar DOM operations such as setting the focus on an element.
// We can no longer modify data relevant to the component or the contents of the component.

// SUMMARY OF LIFECYCLE HOOKS - ORDER OF CALL
// constructor // no logic here - only use for Dependency Injection - assign dependencies to variables
// ngOnChanges() // called any time the input of our component changes and once after the constructor
                 // by the time it is first called, the properties of the component have been filled in
// ngOnInit() // initalization logic - called once by the framework, not on the constructor
// ngDoCheck() // implement custom change detection logic
// ngAfterContentInit() // releated to content projection and local template querying - called once
                        // here we program initalization logic related to @ContentChild and @ContentChildren
                        // if we need to programmatically access projected content
// ngAfterContentChecked() // called every time changed detection runs - last second modification to the data (except the content)
// ngAfterViewInit() // releated to content projection and local template querying - called once
                     // here we program initialization logic related to @ViewChild and @ViewChildren
// ngAfterViewChecked() // called every time changed detection runs - DOM operations such as scrolling and focus
// ngOnDestroy // whenever the component instance is destroyed - to release resources the component might hold
                // don't use it to unsubscribe to observables, it is best to use the async pipe

// called every time there's a change detection run:
// @ngOnChanges() // compare values with previous values of the component logic
// @ngDoCheck() // used for custom change detection
// @ngAfterContentChecked() // called after the content part of the component has been checked for changes
                            // here make last second modifications to the data before the view is renedered
                            // (except the contents of the component)
// @ngAfterViewChecked() // DOM direct manipulation (scrolling, setting focus)
