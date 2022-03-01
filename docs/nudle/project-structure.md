---
sidebar_position: 3
---

# Project structure

Here is an image of the project structure:

![Project structure](/img/nudle/project-structure.png)

The paths you see in the image above will be explained sequentially below:

## .nudle-build

The path `.nudle-build` contains files with configurations to run the Nudle development server and to build production ready applications (Mac, Windows & Linux).  You will not need to modify these files unless you require specific build configurations.

## build
The build path has icons used to package and build the set-up file for their respective platforms (Mac, Windows, Linux). Ideally the contents of this folder will barely change.

## config
This folder was intended to contain configuration files used by Nudle in dev and production mode. You can write specific configurations files and put here.

## dist
This folder is used to save the vue distributution files further used for packaging the final application.

## docs
This path contains the documentation files you are currently reading, you can further add documentation by creating your file.[md] and adding the path to the `_sidebar.md`

Example: You want to add documentation on how to export records to excel.
1. Create a file called `export-to-excel.md`. 
2. In the `sidebar.md` add the path:
    ```bash
    * [Export records to excel](export-to-excel.md)
    ```
    This creates a menu link to your documentation.

## src
Directory to primary source code to the application. This structure of the path will be explained in the main and renderer process later.

## static
Static directory contain static files. Any static assets placed in the ‘static’ folder will simply be copied to the build folder and won’t go through Webpack. You need to reference them using absolute paths. It has the subdirectories:
- `i18n` containing language files, used by app to render in different languages
- `workers` containing webworker files called by the rendered process.

## test
This directory contain unit test files

## Other files
As for the root files; the mainly configuration files and their contents will rarely be changed. 