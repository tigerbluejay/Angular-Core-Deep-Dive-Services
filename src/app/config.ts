// This contains application wide configuration
// We use this file to demonstrate how we can create a plain
// javascript object to be injected using dependency injection
// (instead of injecting instances of a service class)

import { InjectionToken } from "@angular/core";

// definition of our application wide configuration:
export interface AppConfig {
    apiUrl: string;
    courseCacheSize: number;
}

// creation of the plain javascript object
export const APP_CONFIG:AppConfig = {
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
}

// injection token for our plain javascript object
// name of the injection token is CONFIG_TOKEN
// export const CONFIG_TOKEN = 
//     new InjectionToken<AppConfig>('CONFIG_TOKEN');

// to make our provider tree shakable we modify
// the configuration token
export const CONFIG_TOKEN =
    new InjectionToken<AppConfig>('CONFIG_TOKEN',
    {
        providedIn: 'root',
        factory:() => APP_CONFIG
    });