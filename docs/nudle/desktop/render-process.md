---
sidebar_position: 5
title: Render process
---

# The Render process

The render process structure in `src/renderer` folder, is basically the set up of a standard Vue application.  

## Structure
```bash
├─ src
   ├─ renderer                
   |  ├─ assets       
   |  ├─ components     
   |  ├─ constants
   |  ├─ core
   |  ├─ locales
   |  ├─ modules
   |  ├─ router
   |  ├─ store
   |  ├─ styles
   |  ├─ views
   |  |  ├─ auth        
   |  |  ├─ main     
   |  |  ├─ setup      
   |  |  ├─ splashscreen.vue  
   │  ├─ App.vue
   │  ├─ index.html
   │  ├─ index.ts
   │  ├─ renderer.d.ts
   │  └─ tsconfig.json
```

### Components
Components are reusable vue instances that can be imported anywhere in your vue application, all components should reside in `src/renderer/components`. Naming conventions are important, it's recommended to name your component respective to it's use of view. you can put a group components it folders in the case if the components are related.

### Views
Views are the vue components with the user interfaces users interacts with. 
> The `src/renderer/App.vue` does not particularly have a user interface, think of it as the root component that injects the other pages and organizes them to permit routing to happen! That's how vue works. Well `App.vue` being a component, means it has the same [life cycle hooks](https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate). In the `App.vue`'s created hook, the default language is initialized 
>and the listens to back up request from the main process.

#### Structure
 
The view directory has 3 subdirectories `auth`, `main` and `setup` and a `splashscreen.vue`. This folder structure is organized in a way
to group related views together making it easy to browse through.

##### 1. auth folder
Ths auth sub directory houses all views related to **user authentication** like the `Login.vue` and  `Forgot-password.vue` (which is yet to be created)

##### 2. setup folder
When the app is launched for the fist time, the user has to configure the application for their use (i.e inputting: their account details, details about their shop and preferred language). There is a `Welcome.vue` which is just a less-interactive welcome greeting screen and `set-up.vue` is the view with the setup form. 

##### 3. main folder
The rest of the application views are in this subfolder; the **sales views**, **inventory views** etc. The main component here is the `Main.vue` being the file with child routes to the other views in the main directory. It's UI is basically a side navigation with a section serving as the router outlet for the
other view

## Routing
When you register in new view be it in the `main` or `auth` folders, for a user to be able to navigate to this view, you will need to define the route path in the router file `src/router/index.ts`. 

## Registering modules
This project uses many packages like [moment](https://momentjs.com), [lodash](https://lodash.com). You can install other dependencies you see fit, make sure you follow our [guide for using packages](/docs/guide-to-using-packages/).
After installing a vue plugin, for you to be able to use it the plugin, you will have to register it in `src/renderer/modules/index.ts`. For example if you wish to use the vue js plugin for ripple effect `vue-material-design-ripple`. We will register it as a vue directive.
```javascript
// Importing package form node_modules
import 'vue-material-design-ripple/dist/vue-material-design-ripple.css'
import Ripple from 'vue-material-design-ripple'

// add it to the registerModule function
export default function registerModules(App: App) {
    ...
    App.directive('ripple', Ripple)
}
```

## Using the Design Library
Design component libraries are pre-made UI components that facilitate designing views. Nudle use [Element UI Plus](https://element-plus.org/en-US/component/button.html) and [Ant Design](https://next.antdv.com/components/overview) which is currently deprecated, Ant Design will be remove completely in subsequent versions, We recommend you use Element UI +. Element UI Plus provides many pre-made components, form controls, date pickers, data tables etc.
Before using a component we have to import the module like any other module. For example if we want to use the input control provider by element UI, we would have to import the input module in `src/renderer/modules/index.ts`
#### Example usage
```jsx
import { ElInput } from 'element-ui';

export default function registerModules(App: App) {
  ...
  App.use(ElInput)
}


// Using the input in your .vue files
<el-input :placeholder="$t('enter_username')" v-model.trim="loginForm.username"></el-input>

```

## Internationalization (i18n)
As of now Nudle is multi-lingual, supporting three langues; English, French and Spanish. The language files are located in `src/renderer/locales/`  Nudle uses a third party vue library [Vue-i18n](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting) to format language strings.
#### Example usage
```json
// In src/renderer/locales/en.json
{
    ...
    "add_items_to_order": "Please add items to complete order"
    ...
}
```
```jsx
// In your .vue template
<p>{{ $t('add_items_to_order') }}</p>
// Or
<p v-html="$t('add_items_to_order')"></p>


// In your vue script
export defineComponent({
    ...
    methods: {
        showAlert() {
            window.alert(this.$t('add_items_to_order'));
        }
    }
})
```


Learn more about [Vue-i18n](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting)

## Using Ipc in the render process
To communicate with the main process, the render process uses [IpcRenderer](https://www.electronjs.org/docs/latest/api/ipc-renderer). Don't bother importing `ipcRenderer` from electron, ipcRendere has already being provided to the vue application. You will just need to inject it in your component.
#### Example usage
```js
// Your .vue file script, inject $ipcRenderer
export default defineComponent({
  name: 'component_name',
  inject: ['$ipcRenderer'],   // Make sure to inject it before using it else you will get errors
  created() {
    // Listening to the 'APP::BACKUP_REQUEST' event from the main process
    this.$ipcRenderer.on('APP::BACKUP_REQUEST', (event, args) => {
        console.log('New APP::BACKUP_REQUEST event!')
    });
  }
});
```