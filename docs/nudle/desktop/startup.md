---
sidebar_position: 6
title: The start up process
---
# Start up

## Creating the app window
When the app is launched (when the user clicks on the app icon or when the developer runs `yarn run dev`), The main function in the main process entry file is run then the following processes 
1. A Logger service instance is created and we set a path to save log files.
2. When the application is ready, the main app window is created
3. The is Nudle service handler is first attached to the created window. This is important for ipc listeners and events. 
4. Nudle services are initialized.
```js title=src/main/index.ts
async function main() {
  const logger = new LoggerModule()
  logger.initialize(app.getPath('userData'));

  app.whenReady().then(() => {
    const mainWindow = createWindow();

    serviceHandler.setWindow(mainWindow);
    // start services
    serviceHandler.startServices();
  });
}
```
## Loading the UI
When the Browser widow has fully initialized, the browser window loads the UI. The first view to be loaded is the `App.vue` which is the entry point of our vue application. Once the `App.vue` has been created:
1. It loads the settings to vue store and then set's the default the language of the app from the settings config.
2. We initialize a listener that listen for backup data request from the main process and sends the idb database as a serialized json data.

```ts title=src/renderer/App.vue
...
created() {
    // Get settings and set the default language
    this.$store.dispatch('loadSettings')
    .then((settings) => {
      this.getLang(settings.lang)
    })

    // listen for back up events from the main process
    this.$ipcRenderer.on('APP::BACKUP_REQUEST', () => {
      DB.exportDatabase()
        .then((json) => {
          // send database json back to main process
          this.$ipcRenderer.send('APP::BACKUP_REQUEST_REPLY', json)
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }
```
`App.vue` is created, the router is initialized, which loads the `splashscreen.vue` view in the path `src/renderer/views/splashscreen.vue`. Once the Splash screen view has been mounted, it displays a loader on the UI and the following check is done:
1. Check if database is empty and tries to restore it from backup (if the `_nudle-db.bck` backup file exist exists) if not it redirects the app to the set up page.
2. If no users exist in the database, We need at least one admin for the app to function, so we will redirect to set up page and or if the application has not been configured, redirect to set up page
3. If the database exist and a user exist, Nudle will redirect to the login page

See the code in the `initializeApp` function in the `splashscreen.vue` file.

## Why Back up?
Usually (on windows), the indexedDb database can be cleared by a malware or antivirus software, this is be pernicious for our users.
So as an effect, Nudle backups the database to the file system every hour in the `$NUDLE_CONFIG_DIR` (in dev `./nudle/_nudle-db.bck`, in prod `$USER_DATA/.nudle/_nudle-db.bck` <br />
This is make sure we don't loose the user's data in any case. Nudle checks if the database exist on start up, then it attempts to find a backup file and restore the data.