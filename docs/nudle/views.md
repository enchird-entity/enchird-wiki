---
sidebar_position: 5
---
# Views
Views are the vue components with the user interfaces users interacts with. 
> The `src/renderer/App.vue` does not particularly have a user interface, think of it as the root component that injects the other pages and organizes them to permit routing to happen! That's how vue works. Well `App.vue` being a component, means it has the same [life cycle hooks](https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate). In the `App.vue`'s created hook, the default language is initialized 
>and the listens to back up request from the main process.
 
The view directory has 3 subdirectories `auth`, `main` and `setup` and a `splashscreen.vue`. This folder structure is organized in a way
to group related views together making it easy to browse through.

#### 1. auth folder
Ths auth sub directory houses all views related to **user authentication** like the `Login.vue` and  `Forgot-password.vue` (which is yet to be created)

#### 2. setup folder
When the app is launched for the fist time, the user has to configure the application for their use (i.e inputting: their account details, details about their shop and preferred language). There is a `Welcome.vue` which is just a less-interactive welcome greeting screen and `set-up.vue` is the view with the setup form. 

#### 3. main folder
The rest of the application views are in this subfolder; the **sales views**, **inventory views** etc. The main component here is the `Main.vue` being the file with child routes to the other views in the main directory. It's UI is basically a side navigation with a section serving as the router outlet for the
other view

### Routing
When you register in new view be it in the `main` or `auth` folders, for a user to be able to navigate to this view, you will need to define the route path in the router file `src/router/index.js`. 
