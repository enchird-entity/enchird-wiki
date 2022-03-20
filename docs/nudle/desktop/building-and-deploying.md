---
sidebar_position: 9
---

# Building and Deploying

## Building

This project uses [electron-builder](https://www.electron.build/) to create production releases; `.dmg` on Mac, `.exe` on Windows and `tar.gz` for Linux. You can customize the electron-builder configuration in the `package.json` build property.

``` bash
# Build the application for production
yarn run build

# Build application and deploy a release to github releases
yarn run build:deploy

```
