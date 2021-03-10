# Digital Hybrid

>This repo is to prove out the SDLC for the Digital Hybrid project.

## Build status

![Deploy PR in DEV](https://github.com/dmwgroup/digital-hybrid/workflows/Deploy%20terraform%20and%20frontend%20to%20PR%20environment/badge.svg)
![Deploy to Production](https://github.com/dmwgroup/digital-hybrid/workflows/Deploy%20all%20the%20way%20to%20the%20PRODUCTION%20environment/badge.svg)

## Test coverage

![Test coverage: lines](./hybrid-frontend/badges/badge-lines.svg)
![Test coverage: functions](./hybrid-frontend/badges/badge-functions.svg)
![Test coverage: branches](./hybrid-frontend/badges/badge-branches.svg)
![Test coverage: statements](./hybrid-frontend/badges/badge-statements.svg)

---

## Getting started

Install dependencies with ```yarn install```

### Configure app settings

Copy the `.env.example` file as `.env.development`, and edit it to configure the environment variables read by the app.

    cp .env.example .env.development

---

## Development

### `yarn develop`

Builds and runs the app in development mode.  
Open [http://localhost:8000/](http://localhost:8000/) to view it in the browser.

### `yarn storybook`

Launches [Storybook](https://storybook.js.org/).  
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

### `yarn test`

Launches the unit test runner.
See the section about [testing React components with Gatsby](https://www.gatsbyjs.com/docs/how-to/testing/testing-react-components/) for more information.

### `yarn test:e2e`

Launches the [Cypress](https://www.cypress.io/) test runner for end-to-end UI tests.

### `yarn format`

Checks and fixes [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) errors.

### `yarn build`

Builds the app for production to the `build` folder.
