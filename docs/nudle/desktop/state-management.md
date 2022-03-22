---
sidebar_position: 6
title: State management
---

# State management
Nudle uses [Vuex](https://vuex.vuejs.org/guide/) for state management, by using a single state tree, all states of Nudle are contained inside one big object. Before you continue reading this, We recommend you go through [Vuex's documentation](https://vuex.vuejs.org/guide/) first.

## Creating modules
We divide our stores into modules. modules contain their own state, mutations, actions and getters. We have users module, inventory module etc. Suppose we introduce customers to Nudle, we will have a customers module like the example below:

### Customer module example
```javascript title=src/renderer/store/modules/customers.ts
export default {
    state: {
        data: []
    },
    mutations: {
        ...
        ADD_CUSTOMER (state, user) {
            state.data = [{id: state.data.length + 1, ...user}, ...state.data]
        }
    },
    actions: {
        addCustomer ({commit}) {
            return new Promise((resolve, reject) => {
                DB.addCustomer()
                    .then((response) => {
                        // add to db then mutate state, response has the _id field
                        commit('ADD_CUSTOMER', response);
                        resolve(response);
                    })
                    .catch((e) => reject(e));
            });
        }
    }
}
```
When you create you module, import in the modules index file `/renderer/store/modules/index.ts`. Learn more about [Vuex modules](https://vuex.vuejs.org/guide/modules.html)

### Dispatching actions
Vuex is already provided to the vue app and has been globally injected, you don't inject it to your components
```ts
this.$store.dispatch('addCustomer')
    .then((customers) => {
      console.log(customers);
})
```

### Getting store data as a computed property
Vue computed properties enable you to create a property that can be used to modify, manipulate, and display data within your components in a readable and efficient manner.

```tsx

// Get settings state as a computed property
export default defineComponent({
    ...
    computed: {
      settings: function () {
        return this.$store.state.settings.data
      }
    },
});

// In your template
<p> {{ settings.company.name }}</p>

```

Learn more about [vue computed properties](https://vuejs.org/guide/essentials/computed.html)