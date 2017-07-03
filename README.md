# YAWA
> Yet Another Web App

[View a live version of YAWA hosted on surge.sh](http://yawa.surge.sh)

YAWA is a simple web app which allows users to:

- Query the weather based on a location or a post code
- "Pin" locations to keep track of the weather with every opening of the app
- Share weather locations with friends using uniquely generated weather links
- View the weather on a mobile device and a desktop device


YAWA uses:

- Bootstrap 3
    - Mobile first, responsive design
    - Consistent UI that is easy to use
    - Powerful templates
- Angular 1.6
    - MVC application
    - Databinding utilizing the `$scope` object
    - Single page routing
- TypeScript
    - Type definitions for a faster workflow with less errors
    - JS version targeting for older browser support
    - Statically typed models, allowing for a greater feeling of MVC throughout the application
    - "Web Packing" through the outfile parameter, allowing for a nicely structured directory which all is outputted to index.js

This application was written for a High Distinction program for the Swinburne Unit _"Interface Design and Development"_. 

Whilst I am proud of it some of this project was very much a learning experience for NodeJS and NPM JavaScript development. This is 
the reason for inconsistencies such as the usage of `typings` and `DefinitelyTyped` when one or the other could've sufficed.

Note to use YAWA you need an OpenWeatherMap API key, saving this key as a global constant string in any TypeScript file will suffice;

```ts
const API_KEY: string = "123412342134132412dsfaasfadsf";
```

Special thanks to Caslon Chua for running this unit and also in the end giving me a mark I was very happy with.