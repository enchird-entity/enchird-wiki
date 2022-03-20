---
sidebar_position: 2
---

# Get started

This project is built with [vue.js@3.0.6](https://vuejs.org), [Electron.js@13.2.1](https://electronjs.org) and 
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

## Contributing

### Using version control

There are two main branches; `master` and `develop`. You will most probably be working with other developers, it is very important to 
keep a consistent workflow, as a result, there a few rules to to consider:

1. **NEVER** push your code directly to the master branch. pushing to master branch is **ONLY** done by the team & project leads
2. **ALWAYS** create a new branch and name it according to the feature you are working on or your name, so it makes it easier to an assigned personnel verify and approve your code.
3. Once you are ready to submit your code, create a **pull request** to the **develop** branch. The team leads will verify and approve the merge. Incase nobody is available to verify, you can merge it directly to the develop branch.

### Adding dependencies
This project uses many packages like [moment](https://momentjs.com), [lodash](https://lodash.com). You can install other dependencies you see fit, make sure you follow our [guide for using packages](/docs/guide-to-using-packages/).
#### Registering vue packages
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

### Using Icons
This project uses a third-party vue library for icons called [Oh Vue Icons](https://oh-vue-icons.js.org/). For the purpose of optimizing our bundle size, we recommend you manually import only the icon modules you need in `src/renderer/modules/icons.ts`. For example, to import an edit icon.
```javascript
// In src/renderer/modules/icons.ts
import { MdEdit } from "oh-vue-icons/icons";

// registering the icon...
export default function registerIcons(app) {
  addIcons(
      MdEdit
  );
};
```

Usage in your vue file
```html
<!-- usage in src/renderer/views/main/inventory/Inventory.vue -->
<v-icon name="md-edit" />
```
Learn more about how to use Oh Icons [here.](https://oh-vue-icons.js.org/docs/)


### Internalization
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


### Using the Design component library
Design component libraries are pre-made UI components that facilitate designing views. Nudle use [Element UI Plus](https://element-plus.org/en-US/component/button.html) and [Ant Design](https://next.antdv.com/components/overview) which is currently deprecated, Ant Design will be remove completely in subsequent versions, We recommend you use Element UI. Element UI Plus provides many pre-made components, form controls, date pickers, data tables etc.
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