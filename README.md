# Project Title

Technical exercise from some company, that was then extended.<br/>
The goal is to implement a simple mock page in which the user will be able to transfer money and have an overview of the past transactions. A design is provided.

## Getting Started

### Prerequisites

The application is has been tested/styled on the latest version of Chrome.

### Installing

```
npm install
```

### Running the application

```
npm start
```

## Running the tests

```
npm test
```

### Notes

Due to time contrainsts, the code is not 100% finished. I wrote about 50% of the unit tests - covering the application 'blocks': ducks, components and utilities - the rest would have been written following the patterns visible in those tests.

## Authors

- **Matthieu Izoulet**

## Acknowledgments

- The fake database data can be found in src/db.json. You may want to clean up the transaction lists from time to time.

- This project has been built with create-react-app. I didn't eject for the examiner to have a clear view on what I added and what the tool generated.

- The page provides some level of responsiveness. The left and right parts stack up vertically below a certain screen size. A optimization would be to split those 2 parts into different pages for narrow viewport, using responsive routing (https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/philosophy.md#responsive-routes)

- Internationalization has been started, as an extra, but not finished (Strings are still hardcoded) You can change the currency from GBP to EUR in the db.json, though, if you want. It will reflect in the UI.
