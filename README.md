# Angular University Course App
This project is an educational Angular application designed to showcase best practices in Angular development. It covers key architectural concepts, lifecycle hooks, performance optimizations, dependency injection strategies, internationalization, and Angular elements. This README provides a theoretical and implementation overview for developers seeking to explore the application’s design and functionality.

### Project Overview
This Angular application displays a collection of courses using components, services, pipes, and custom directives. It integrates core Angular features such as observables, change detection strategies, and dynamic component rendering. While the project is intended as an instructional tool, the code reflects practices suitable for scalable production-ready applications.

## Key Concepts
### 1. Change Detection
#### Conceptual Overview
Angular’s change detection mechanism ensures the view reflects the current application state. Angular uses "Default" change detection by default, checking the entire component tree on every detected change. For performance, Angular offers "OnPush" change detection, which restricts checks to changes in @Input() values or emitted observables.

#### Implementation
AppComponent and CourseCardComponent demonstrate both default and OnPush strategies.

Custom change detection logic is implemented using ChangeDetectorRef and the ngDoCheck() lifecycle hook.

Observable streams are passed to the template with the async pipe, enabling Angular to automatically manage subscriptions and trigger UI updates efficiently.

### 2. Dependency Injection
#### Conceptual Overview
Dependency Injection (DI) allows Angular to supply components and services with their dependencies. Angular supports hierarchical DI, tree-shakable providers, and the use of InjectionToken for non-class dependencies.

#### Implementation
CoursesService is a singleton provided via tree-shakable @Injectable({ providedIn: 'root' }).

AppComponent injects a plain JavaScript config object (APP_CONFIG) via CONFIG_TOKEN.

Advanced DI patterns are shown using @Optional(), @Self(), @SkipSelf(), and @Host() in services and directives.

Manual provider creation is demonstrated using factory functions and injection tokens.

### 3. Internationalization (i18n)
#### Conceptual Overview
i18n in Angular enables translation of the application into different languages, including pluralization and contextual hints for translators.

#### Implementation
UI elements are marked with the i18n attribute to extract translatable content using ng extract-i18n.

Pluralization is demonstrated using ICU message syntax.

Deployment to multiple languages involves creating translation files (e.g., messages.fr.xlf) and modifying angular.json to configure builds per language.

### 4. Angular Lifecycle Hooks
#### Conceptual Overview
Angular components go through a lifecycle from creation to destruction. Lifecycle hooks enable logic at various stages.

#### Implementation
The project includes examples and annotations for:

ngOnInit() – data loading and component setup.

ngDoCheck() – custom change detection.

ngAfterContentInit() and ngAfterViewInit() – content and view querying.

ngAfterContentChecked() and ngAfterViewChecked() – final DOM and data tweaks.

ngOnDestroy() – cleanup (discussed but not used).

### 5. Pipes: Pure vs Impure
#### Conceptual Overview
Pipes transform data in templates. By default, pipes are pure—executed only when their inputs change. Impure pipes re-execute on every change detection run, which can be performance-intensive.

#### Implementation
FilterByCategoryPipe demonstrates a pure pipe by default.

An impure version can be created by setting pure: false in the @Pipe() decorator, allowing dynamic filtering based on user interactions.

### 6. Angular Elements
#### Conceptual Overview
Angular Elements allow Angular components to be used as custom HTML elements outside of Angular apps. This supports integration with other frameworks or legacy projects.

#### Implementation
CourseTitleComponent is converted to a custom element using createCustomElement() and registered via customElements.define().

Demonstrates decoupling of Angular's component model from its rendering engine.

### 7. Standalone Components
#### Conceptual Overview
Angular now supports standalone components, reducing the reliance on NgModules. This simplifies application structure and aligns with modern Angular practices.

#### Implementation
Most components in this project are marked as standalone: true.

The imports array of each component replaces the need for NgModule declarations.

Migration instructions and best practices are provided in the comments.

### 8. Attribute Decorator
#### Conceptual Overview
The @Attribute() decorator is used to read static attribute values from HTML and can be useful for performance optimization by avoiding unnecessary bindings.

#### Implementation
CourseCardComponent uses @Attribute('type') to read the course type ("beginner") directly from the template, bypassing input bindings for immutable data.

## Code Structure Overview
### File	Purpose
app.component.*	Root component: demonstrates lifecycle, service interaction, DI, and change detection.
courses.service.ts	Handles all HTTP requests and data manipulation.
course-card.component.*	Displays a course with editing functionality and emits changes.
course-title.component.*	Rendered both as a component and custom Angular Element.
filter-by-category.pipe.ts	Custom pipe for filtering courses by category.
config.ts	Defines and provides an injectable plain object configuration.
courses.module.ts	Traditional module structure for course components (mostly deprecated in favor of standalone).

### Configuration and Bootstrapping
Configuration constants are injected using CONFIG_TOKEN and an associated AppConfig interface.

Bootstrapping logic for Angular Elements is located in AppComponent.

Migration paths and commentary are provided for transitioning from NgModules to a fully standalone architecture.

Services like CoursesService are injected using tree-shakable providers to optimize the final build.

## Conclusion
This application provides a thorough, real-world demonstration of essential Angular concepts. From DI and change detection to internationalization and component lifecycle, this codebase serves both as an educational reference and a practical foundation. Before diving into the implementation, understanding these key concepts will provide clarity and context that make the code easier to follow.


# Diagrams

### 1. Component Hierarchy

```plaintext
AppComponent
│
├── course-card *ngFor="courses"
│   ├── course-title
│   └── course-image (via <ng-content>)
│
└── Custom Angular Element: <course-title> (registered manually)
```

### 2. Dependency Injection Structure

```plaintext
[AppComponent]
    ├── injects CoursesService         <-- providedIn: 'root'
    ├── injects CONFIG_TOKEN           <-- plain JS object via InjectionToken
    └── injects Injector               <-- for Angular Element registration

[CourseCardComponent]
    ├── injects CoursesService         <-- inherited from root or local
    └── uses @Attribute('type')        <-- reads HTML static attribute
```

### 3. Change Detection Modes

```plaintext
Change Detection Strategy
--------------------------

Default (AppComponent - optionally)
    ↳ Scans all bindings on all events (keyup, click, async)
    ↳ Detects changes by comparing previous/current values

OnPush (CourseCardComponent)
    ↳ Triggers only when:
        - @Input() changes
        - Observable emits new value (async pipe)
        - Event handler is triggered

Custom
    ↳ Uses ChangeDetectorRef.markForCheck()
    ↳ Optional ngDoCheck() for custom triggers
```

### 4. Data Flow: Course Editing

```plaintext
User Edits Title in <input>
         ↓
(keyup)="onTitleChanged()"
         ↓
course.description updated locally

User Clicks "Save Course"
         ↓
(click)="onSaveClicked()"
         ↓
@Output() courseEmitter.emit(course)
         ↓
AppComponent receives (courseChanged)
         ↓
save(course) → CoursesService.saveCourse(course)
         ↓
HTTP PUT /api/courses/{id}
```

### 5. Service and HTTP Flow

```plaintext
AppComponent
    ↓
CoursesService.loadCourses()
    ↓
HttpClient GET /api/courses?page=1&pageSize=10
    ↓
Observable<Course[]> → AppComponent.courses
```plaintext
CoursesService.saveCourse(course)
    ↓
HttpClient PUT /api/courses/{id}
    ↓
Header: X-Auth: userId
```

### 6. Internationalization (i18n) Flow

```plaintext
Markup with i18n attributes
    ↓
Run ng extract-i18n
    ↓
Generates messages.xlf
    ↓
Send to translation team
    ↓
Receive messages.fr.xlf (or other)
    ↓
Place in src/locale/
    ↓
Configure angular.json build:
        └── configuration "fr"
    ↓
ng build --configuration=fr
    ↓
Deploy localized build
```

### 7. Pipe Execution: Pure vs Impure

```plaintext
Pure Pipe (default)
    └── Executed only when reference to input changes
    └── No re-execution on internal mutation

Impure Pipe (pure: false)
    └── Executed on every change detection cycle
    └── Useful when input object mutates (e.g., array content)

Example:
    *ngFor="let course of courses | filterByCategory:'BEGINNER'"
```
