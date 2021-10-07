# Digital Hybrid

> This repo is to prove out the SDLC for the Digital Hybrid project.

## Build status

[![Deploy PR environment](https://github.com/TSWDTS/digital-hybrid/actions/workflows/deploy-pr.yml/badge.svg)](https://github.com/TSWDTS/digital-hybrid/actions/workflows/deploy-pr.yml)
[![Deploy to production](https://github.com/TSWDTS/digital-hybrid/actions/workflows/deploy-to-prod.yml/badge.svg)](https://github.com/TSWDTS/digital-hybrid/actions/workflows/deploy-to-prod.yml)
[![Destroy PR environment](https://github.com/TSWDTS/digital-hybrid/actions/workflows/destroy-pr.yaml/badge.svg)](https://github.com/TSWDTS/digital-hybrid/actions/workflows/destroy-pr.yaml)
[![Upload workflow metrics to Influx DB](https://github.com/TSWDTS/digital-hybrid/actions/workflows/upload-to-influx.yml/badge.svg)](https://github.com/TSWDTS/digital-hybrid/actions/workflows/upload-to-influx.yml)

---

## Getting started

Install dependencies with `yarn install`  
(Yarn v2 is required)

### Configure app settings

Copy the `.env.example` file as `.env.development` in the hybrid-frontend, and edit it to configure the environment variables read by the app.

    cp ./packages/hybrid-frontend/.env.example ./packages/hybrid-frontend/.env.development

---
## Packages  / Modules
To allow co-locating all of our code together, we are employing a mono-repo approach via [Yarn 2 workspaces](https://yarnpkg.com/features/workspaces). This allows us to configure each code base individually but retain a central location for running builds/packages and housing shared dependencies.

To this end, there are numerous modules in this repository which all serve different purposes in the project. Below is a summary of each of the modules in this repository:
1. **Function Apps** - Contains all source code, compilation and deployment for the [Azure Function Apps](https://docs.microsoft.com/en-gb/azure/azure-functions/functions-reference) that Digital Hybrid use. These are generally custom API backend which we use to support the running of the new Bestinvest website
1. **React Components** - The module contains all the base react components that are used across the new Bestinvest website. In general, each of the components is unaware of the state of the website of the data which it is displaying, allowing the specialisation of these by consumers of the module. This module is shared with downstream teams to ensure a consistent look and feel across TSW websites
1. **Hybrid Frontend** - In conjunction with react components, this module contains the composition of react components into the templates and pages that appear in the new Bestinvest website. Also housed in this module is the functional logic that populates the website, and the components which appear within it
1. **Shared Config** - Houses some base configuration for `eslint` and `typescript` that are used by all other modules in the mono-repo
1. **Testing** - Folder which contains the modules for automation tests such as API and UI tests
1. **Utils** - Folder containing some shared utilities for other modules such as telemetry, tracking and unit test helpers.

---

## Development
As above, [Yarn workspaces](https://yarnpkg.com/features/workspaces) is employed in our repository. Below are some useful commands and details that you will find useful when developing with the Digital Hybrid mono-repo 

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
1. Components
   1. `yarn components <script-name>`
   1. `yarn cmp <script-name>`

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
| Function App | Builds all function apps                            | `yarn all:fa:build`     |
| Function App | Builds and zips all function apps                   | `yarn all:fa:build:zip` |
| Function App | Copies function app zips to common folder           | `yarn all:fa:copy-zip`  |

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

#### `yarn all:format`

Runs `format` for all workspaces.

Front end - checks and fixes [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) errors.
