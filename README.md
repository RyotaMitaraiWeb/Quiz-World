# QuizWorld

## How to run
```bash
npm install;
npm run start;
```

## Running tests
```bash
npm run test # launches Chrome
npm run test:headless # runs in headless mode, does not run in watch mode
npm run test:headless:watch # runs in headless and watch mode

npm run test:e2e # runs Playwright tests in headless mode
npm run test:e2e:debug # runs Playwright tests in debug mode, useful for close inspection of specific tests
```

## Structure

### app
- ``constants`` - holds files that contain constant values, e.g. API endpoints, available roles, etc.
- ``core`` - holds singleton services, shell components like header, footer, and etc., and other elements that need to be imported within the ``AppModule``.
- ``shared`` - holds reusable components, pipes, guards, directives, and other elements that can be used across multipe modules. You can import the shared module in any module where you need the components, pipes, or directives.
- ``features`` - holds components and services that implement a specific feature of the app, such as a form page, search bar, etc.
- ``store`` - configures the ngrx store.

Each folder and its respective subfolders contain more documentation for the different components, services, etc.

### environments
Contains environment variables for development and production modes.

### types
Contains custom types.

## License
MIT