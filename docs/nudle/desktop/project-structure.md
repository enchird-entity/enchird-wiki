---
sidebar_position: 3
---

# Project structure

```bash
# root of the application
.
├─ .github
├─ build                  # Path for assets to be used for prod build.
├─ node_modules
├─ dist
├─ scripts                # Development and build tools configuration scripts
├─ src
│  ├─ main                # Main process
│  |  ├─ modules          # Main process modules
│  |  ├─ services         # Main process services path
│  |  ├─ workers          # Main process worker threads path
│  │  ├─ index.dev.ts
│  │  ├─ index.ts
│  │  ├─ main.d.ts
│  │  └─ tsconfig.json
│  ├─ renderer            # Render process files i.e Vue UI.
│  ├─ preload             # Electron preload scripts
│  │   ├ index.ts
│  │   └ tsconfig.json
│  ├─ models               # Models or interfaces
│  ├─ utils                # utility functions path
├ static
├ .editorconfig
├ .env
├ .eslintrc.json
├ .gitignore
└ package.json
```

## Structure details 
### 1. scripts
The path `scripts` contains files with configurations to run the Nudle development server and to build production ready applications (Mac, Windows & Linux).  You will not need to modify these files unless you require specific build configurations.

### 2. build
The build path has assets like app icons used to package and build the set-up file for their respective platforms (Mac, Windows, Linux).

### 3. dist
This folder is used to save the vue distributution files further used for packaging the final application.

### 4. src
Directory to primary source code to the application. This structure of the path will be explained in the main and renderer process later.

### Other files
As for the root files; the mainly configuration files and their contents will rarely be changed, like package.json, .gitignore etc