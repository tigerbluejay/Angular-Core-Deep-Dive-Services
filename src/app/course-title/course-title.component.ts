import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'course-title',
  templateUrl: './course-title.component.html',
  styleUrls: ['./course-title.component.css'],
  standalone: true
})
export class CourseTitleComponent implements OnInit {

  @Input()
  title:string;

  constructor() {}

  ngOnInit() {}

}

// ANGULAR ELEMENTS
/* An element is a component that is not handled by Angular, but by the browser.
It is useful for example to develop a third party widget that is compatible
with other frameworks.
The browser instantiates each element.
We create a new component for example course-title
First we add our project the ability to handle elements: ng add @angular/elements --project-name=actual-project-name
Then we generate the component that will be an element
ng generate component course-title
Modify course-title css file, html file and register the input in the ts file
In the application component ts file, we turn the component to an element
in the constructor we inject the injector
and in ngOnInit we do:
// here we turn a component into an element
// and we pass the injector so angular can fetch all the dependencies it may need
const htmlElement = createCustomElement(CourseTitleComponent,
  {injector:this.injector});
// we register the element in our browser
customElements.define('course-title', htmlElement);
// Now SUPPOSEDLY if we inspect the browser and edit the inspector
html code and we add a course-title element we will see it on screen
this is because it is an element which is processed by the browser and
not angular.
*/
