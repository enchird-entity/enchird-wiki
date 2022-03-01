---
sidebar_position: 4
---
# Processes

## The Main process

The main process is the primary core process initializing the app and running core functions like:
- Creating the app window and loading the UI
- Communicates with the render process via the [Inter process communication (ipc)](https://www.electronjs.org/docs/latest/api/ipc-main) channel
- Checks for updates, downloads available updates and notifies the render process of the downloaded update
- Save CSV to disk and read CSV files.
- Initializes the settings configuration file

The main process file path is `src/main/index.js`. Learn more about the [main process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-main-process).

### Printer module

This is a main process module that receives data from the render process and prints the data `58mm` printer. The printer module path 
is `src/main/api/pos.printer.js`

### Nudle Utility module

The nudle utility is initialized once the application is started, this modules runs background task that do not 
directly affect the UI (render process) for example: the nudle utility modules runs scheduled tasks like backing up the database
every hour incase of loss by antivirus or another reason. 

If you need to write specific background functions like cron jobs that do or do not necessary involve the render process, it is best to write it in this file. This file is called on start up by the `src/main/index.js`. Be sure you initialize your functions here

The utility module path is `src/main/api/nudle.utility.js`


## The Render process

The render process structure in `src/renderer` folder, is basically the set up of a standard vue application. There are currently two UI component frameworks installed; [Element UI](https://element.eleme.cn/#/en-US/component/quickstart) and [Ant Design](https://antdv.com/components/). Element UI is in the process of deprecation, it's recommended to use more of Ant Design modules. Learn more about the [render process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process)

### Registering modules
The file `src/renderer/modules.js` is used to register all imported modules (third-party mostly) to the vue instance. For example if you want to add the 
ripple effect to buttons from a third-party package. Check the file for examples.

```js
// Import the module
import Ripple from "vue-material-design-ripple";

// register the module as a directive to the vue instance
Vue.directive("ripple", Ripple);

```

### Components
Components are reusable vue instances that can be imported anywhere in your vue application, all components should reside in `src/renderer/components`. Naming conventions are important, it's recommended to name your component respective to it's use of view. you can put a group components it folders in the case if the components are related.

### Views
Views are the vue components with the user interfaces users interacts with. Read more in the next chapter
 