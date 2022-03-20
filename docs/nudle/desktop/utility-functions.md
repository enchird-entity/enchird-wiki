---
sidebar_position: 8
---
# Utility functions
These are re-usable functions that can be used in both the main process and rendered, meaning they are platform independent and you should try to reference electron or vue in your utility functions. Create or import utility functions in the folder `src/utils`

#### Example
The  Number utility functions `src/utils/number`, exports functions to format currency and large numbers.
```js
import {formatNumber, formatCurrency} from '../utils/number';

console.log(formatNumber(100000));   // Outputs => 100,000

console.log(formatCurrency(100000));   // Outputs => FCFA 100,000

```