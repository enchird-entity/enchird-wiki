---
sidebar_position: 2
---

# Quick Start

This project is built with [vue.js@2.5.16](https://vuejs.org), [Electron.js@4.2.12](https://electronjs.org) and 
Node.js, it is highly recommended you have a considerate amount of knowledge and understanding in the aforementioned 
frameworks.

## Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn run dev

# run unit & end-to-end tests
npm test

```

## Building

This project uses [electron-builder](https://www.electron.build/) to create production releases; `.dmg` on Mac, `.exe` on Windows and `tar.gz` for Linux. You can customize the electron-builder configuration in the `package.json` build property.

``` bash
# Build the application for production
yarn run build

# Build application and deploy a release to github releases
yarn run build:deploy

```


## Version control

There are two main branches; `master` and `develop`. You will most probably be working with other developers, it is very important to 
keep a consistent workflow, as a result, there a few rules to to consider:

1. **NEVER** push your code directly to the master branch. pushing to master branch is **ONLY** done by the team & project leads
2. **ALWAYS** create a new branch and name it according to the feature you are working on, so it makes it easier to an assigned personnel verify and approve your code.
3. Once you are ready to submit your code, create a **pull request** to the **develop** branch. The team leads will verify and approve the merge. Incase nobody is available to verify, you can merge it directly to the develop branch.

## Processes

The primary two process of the app the [main process](/docs/nudle/processes?#the-main-process) which can be considered the backbone of the application and the [Render process](/docs/nudle/processes?#the-render-process) which is much of the user interface or vue application. The main process code resides in `src/main` and the render process `src/renderer`

When the app is launched, the main process is triggered and it runs the `createWindow()` function to create a window and load the render process file (which is `https://localhost:3000` in development and `dist/electron/index.html` in production).