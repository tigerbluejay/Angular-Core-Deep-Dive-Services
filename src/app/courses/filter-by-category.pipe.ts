import {Pipe, PipeTransform} from '@angular/core'
import { Course } from '../model/course';

// this is the name the pipe will take in the html file
@Pipe({
    name: 'filterbyCategory'
})
// here the pipe receives two parameters the array of courses
// and the category string (BEGINNER / ADVANCED and so on)
export class FilterByCategoryPipe implements PipeTransform {
// the transform method of the PipeTransform interface
    transform(courses: Course[], category: string) {
        // here goes the logic. we filter the collection of courses
        // by category
        return courses.filter(course => course.category == category);
    }
}

// PURE VS IMPURE PIPES //
// Pipes are by default pure. 
// This means that they are not triggered by change detection.
// So for example if we press a button and modify the value of the
// category via a method in the component model, for example to ADVANCED,
// the pipe won't be called and the value of the category tag will be 
// modified AND CONTINUE to be displayed alongside BEGINNER taged elements.
// This is because Angular considers Pipes to be unperformant potentially
// and this can cause the application to slow down.
// In order to make a pipe impure and thus trigger change detection
// every time, we must make it impure, like so:
// @Pipe({
//     name: 'filterbyCategory',
//     pure: false
// })
// In this way then every time change detection is triggered, the pipe
// will be called. So if we modify BEGINNER to ADVANCED with the press
// of a button, change detection will be triggered and the newly minted
// ADVANCED tagged element will be removed from items displayed (the
// pipe is filtering once again).