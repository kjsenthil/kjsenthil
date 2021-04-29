# Digital Hybrid

> This repo is to prove out the SDLC for the Digital Hybrid project.

## Build status

![Deploy PR in DEV](https://github.com/dmwgroup/digital-hybrid/workflows/Deploy%20terraform%20and%20frontend%20to%20PR%20environment/badge.svg)
![Deploy to Production](https://github.com/dmwgroup/digital-hybrid/workflows/Deploy%20all%20the%20way%20to%20the%20PRODUCTION%20environment/badge.svg)

## Test coverage

![Test coverage: lines](./badges/badge-lines.svg)
![Test coverage: functions](./badges/badge-functions.svg)
![Test coverage: branches](./badges/badge-branches.svg)
![Test coverage: statements](./badges/badge-statements.svg)

---

## Getting started

Install dependencies with `yarn install`  
(Yarn v2 is required)

### Configure app settings

Copy the `.env.example` file as `.env.development` in the hybrid-frontend, and edit it to configure the environment variables read by the app.

    cp ./hybrid-frontend/.env.example ./hybrid-frontend/.env.development

---

## Development

To allow co-locating all of our code together, we are employing a mono-repo approach via [Yarn 2 workspaces](https://yarnpkg.com/features/workspaces). This allows us to configure each code base individually but retain a central location for running builds/packages and housing shared dependencies.

:warning: All `yarn` commands should be run at the root of the repository

### Using Yarn workspaces

To run a specific command in one of the yarn workspaces, you will need to use the following syntax:

```
$ yarn workspace <workspace-name> <script-name>
$ yarn workspace @tsw/hybrid-frontend build
```

To save your fingers, shortcuts have been provided for all currently available workspaces:

1. Front-end
   1. `yarn frontend <script-name>`
   1. `yarn fe <script-name>`

Equally, you can run a command for all workspaces with the following syntax:

```
$ yarn workspaces foreach run <script-name>
$ yarn workspaces foreach run build
```

This will run the script for each workspace that script is found in.

Once again, some commonly used `foreach` scripts have been provided as shortcuts. All the below will run the script in every workspace:

| Type         | Description                                         | command                 |
| ------------ | --------------------------------------------------- | ----------------------- |
| Format       | Runs formatting commands                            | `yarn all:format`       |
| Build        | Runs build commands                                 | `yarn all:build`        |
| Build        | Creates zip packages for workspaces, where required | `yarn all:build:zip`    |
| Test         | Runs test commands                                  | `yarn all:test`         |
| Test         | Runs E2E test commands                              | `yarn all:test:e2e`     |
| Function App | Builds all function apps                            | `yarn all:fa:build`     |
| Function App | Builds and zips all function apps                   | `yarn all:fa:build:zip` |
| Function App | Copies function app zips to common folder           | `yarn all:fa:copy-zip` |

### Key Yarn commands

#### `yarn install`

Runs install for all `package.json` files in this repo. First run will be long!

#### `yarn all:build`

Runs `build` for all workspaces.

Front end - builds the app for production to the `build` folder.

#### `yarn frontend develop`

Builds and runs the front end app in development mode.  
Open [http://localhost:8000/](http://localhost:8000/) to view it in the browser.

#### `yarn frontend storybook`

Launches [Storybook](https://storybook.js.org/).  
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

#### `yarn all:test`

Runs tests for all workspaces.

For front-end, this will launch the unit test runner - see [testing React components with Gatsby](https://www.gatsbyjs.com/docs/how-to/testing/testing-react-components/) for more information.

#### `yarn all:test:e2e`

Launches the [Cypress](https://www.cypress.io/) test runner for end-to-end UI tests.

#### `yarn all:format`

Runs `format` for all workspaces.

Front end - checks and fixes [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) errors.
