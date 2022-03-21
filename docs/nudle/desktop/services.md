---
sidebar_position: 7
---

# Services
Services are functions that run at specific points during the application life-cycle. You can create a service to:
 - Listen to ipc events form the render process.
 - Run every hour or every day at a particular time
 - Run when the app is initialized, looses focus.

Service files only run int the main process. Service files are located in the path `src/main/services`. There are three types of services; **listeners**, **schedulers** and **hooks**.

```
main
│   ├── services
│   │   ├── hooks.services.ts
│   │   ├── index.ts
│   │   ├── listener.services.ts
│   │   ├── scheduler.services.ts
```

## Listeners
Ipc (Inter process communication) is a protocol used by electron to communicate between the main process and render process. [See Electron Ipc](https://www.electronjs.org/docs/latest/tutorial/ipc). Usually what happens is you will create a listener function in the main process then invoke it by sending a message form the renderer process and when the process is done, it returns a value or not. For homogeneity, it is recommended to put all Ipc listeners in the file  `src/main/services/listener.services.ts`, so it is easily identifiable and easy to debug. All listeners should be added in the `registerMainProcessListeners` function. See the example below;
#### Example
```javascript
import { NudleServiceContextWindow } from "../modules/service.module";

export default function registerMainProcessListeners(context: NudleServiceContextWindow) {
 /**
  * This service listens to the 'APP::BACKUP_REQUEST_REPLY' event from the render process
  *  and writes the backup data to a file.
  * ipc is the same as ipcMain exported from electron, 
  * NudleService factory will provide iPcMain as ipc in the context.
 */
  context.ipc.on("APP::BACKUP_REQUEST_REPLY", (event, arg) => {
    // write backup to file
    outputFile(join(context.configPath, "_nudle-db.bck"), arg, (err) => {
      console.log(err);
    });
  });
}

```

## Hooks
Hooks are functions that are called at specific points during the application's life cycle. The events are 
- `on-init` When the application is ready to start
- `on-window-blur` When the window looses focus
- `on-window-focus` When the window gains focus
- `on-window-show` When the window is displayed

**NOTE:** All hooks must return a **Boolean** and should be exported else they will not be called by Nudle.

```javascript
import { createHookService } from "../modules/service.module";

  // This function will be called when the window looses focus
const onBlurHook = createHookService('on-window-blur', (ctx) => {
  console.log('This window has lost focus');
  return true;
});

export { onBlurHook }
```

Alternatively, calling `createService()` is the same as calling `createHookService('on-init')`. The both functions will be executed once the app is ready.

```javascript
import { createService, createHookService } from "../modules/service.module";

  // This function will be called when the app is ready
  const onReadyHook1 = createHookService('on-init', (ctx) => {
    console.log('The app is ready');
    return true;
  });

  // This function will be called when the app is ready
  const onReadyHook2 = createService((ctx) => {
    console.log('The app is ready');
    return true;
  }); 

export { onReadyHook1, onReadyHook2 }
```


Add your hooks to the `src/main/services/hooks.services.ts` file.

## Schedulers
Schedulers are basically cron jobs that run at specific time. For example you can create a scheduler service that runs every hour. [Learn more about cron jobs](https://www.freeformatter.com/cron-expression-generator-quartz.html). See the example below:
```javascript
import { createSchedulerService } from "../modules/service.module";

 // This service runs every hour
const hourlyScheduler = createSchedulerService("30 */1 * * *", (context) => {
  console.log('Hi, I run every hour!')
});

export { hourlyScheduler }
```
If you want to create a scheduler function, you should write it in the `src/main/services/scheduler.services.ts`. **Note** All functions you write here must be exported, else they would not be called.


## Context
Every service is provided with a context object as parameter which can be of type `NudleServiceContextWindow` or `NudleServiceContext`. Context provides services with Nudle APIs.
#### Context Interface
* **settings**: `SettingsModule` Settings object.
* **userDataPath**: `string` Path to User data part on the user's system ($USER_DATA on windows and $APP_DATA on MacOs)
* **configPath**: `string` Path to Nudle config folder.
* **ipc**: `IpcMain` ipcMain object
* **dialog**: `Dialog` dialog object, to create alert box, show open file dialog and save file dialogs.
* **systemInformation**:
  * **platform**: returns the operating system platform
  * **version**: The version of the loaded application