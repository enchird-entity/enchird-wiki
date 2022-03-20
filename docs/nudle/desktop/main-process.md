---
sidebar_position: 4
title: Main process
---

# The Main process
The main process is node.js process which is the primary core process initializing the app and running core functions like:
- Creating the app window and loading the UI
- Communicates with the render process via the [Inter process communication (ipc)](https://www.electronjs.org/docs/latest/api/ipc-main) channel
- Checks for updates, downloads available updates and notifies the render process of the downloaded update
- Writing files to disk.
- Initializes the settings configuration file

The main process entry file is `src/main/index.ts`. Learn more about the [main process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-main-process).

## Structure
```bash
├─ src
   ├─ main                
   |  ├─ modules          
   |  |  ├─ logger.module.ts         
   |  |  ├─ printer.module.ts         
   |  |  ├─ service.module.ts         
   |  |  ├─ settings.module.ts         
   |  ├─ services 
   |  |  ├─ hook.services.ts         
   |  |  ├─ index.ts         
   |  |  ├─ listeners.services.ts         
   |  |  ├─ scheduler.services.ts       
   |  ├─ workers
   |  |  ├─ index.ts     
   │  ├─ index.dev.ts
   │  ├─ index.ts
   │  ├─ main.d.ts
   │  └─ tsconfig.json
```

### Entry File
The entry file `src/main/index.ts` is the entry point of the Nudle electron application. This file contains code to create the window, load modules etc.

### Modules
Modules are classes or a mechanism to group functions which are used to specific tasks. For example;
- The `ServiceModule` class imports  and instantiates services.
- The `SettingsModule` class reads/writes to the settings and sends the settings object to the main process.
- The `LoggerModule` class is used to write error log events to a logger file.

### Services
Services are functions that run at specific points during the application life-cycle. You can create a service to:
 - Listen to ipc events form the render process.
 - Run every hour or every day at a particular time
 - Run when the app is initialized, looses focus.

See the [Services chapter](services.md)

### Workers
Workers (threads) are useful for performing CPU-intensive operations.  [Learn more about workers](https://nodejs.org/api/worker_threads.html#worker-threads)