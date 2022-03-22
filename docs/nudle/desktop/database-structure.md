---
sidebar_position: 8
title: Database
---

:::info 
Nudle uses [Dexie](https://dexie.org) idb plugin which is currently DEPRECATED. The database functions entry file is located in `rendered/core/database.ts`. Dexie will be replaced with [RageStore](../../rage-store/intro.md) in the subsequent versions.
:::

## Structure
| Collections           |  Fields                                                                                           |
|-----------------------| ------------------------------------------------------------------------------------------------- |
| users                 |  _id, name, phoneNumber, photoURL, username, password, role                                       |
| inventory_items       |  _id, name, category, unitPrice, quantity, photoURL, hasStock, status                             |
| inventory_categories  | _id, name                                                                                         |
| company               | _id, name, location                                                                               |
| branch                | _id, name, location                                                                               |
| sales                 | _id, invoiceNumber, date, items, categories, totalQty, totalAmount, cashier, payed, createdAt     |
| reports               | _id, date, totalQty, totalAmount, numberOfSales, dailySales                                       |
| inventory_reports     | _id, name, category, date, itemId, totalQty, totalAmount                                          |
| category_reports      | _id, name, date, totalQty, totalAmount                                                            |


## Saving reports data
Reports data are generated from sales records, when a user saves a sale event, Nudle immediately computes or re-computes reports data. There are three collections for saving reports data, the:
* **reports**: This collection has a unique record of id `_GLOBAL`. It saves the total revue and total number of orders made by the client through out his Nudle usage. The other objects have ids specific to the date; for example a report record of _id `2022-01-21` holds records for the total revuenu and number of orders made on the **21st of January 2022**.
* **inventory_reports**: As the name suggest this collection holds records of the total number items sold at a particular period. Example:
  ```javascript
    const inventory_report = {
        dateId: '2022-01-21`,
        itemId: '6ysifyisue234sdfsdfcgy',
        name: 'Ice Black',
        unitPrice: 1000,
        totalAmount: 12000,
        totalQty: 12
    }
  ```
  This record shows the total number of ice and the revenue made by selling **Ice Black** on the **21st of January 2022**.
* **category_reports**: Similarly to **inventory_reports**, category_reports collection hold records of the total number items sold at a particular period by category.

## Generating Invoice numbers
Nudle has a format to generate invoice numbers. Nudle's Format is quite simple
```CSS
#PO$[year_last_2_digits]$[month]$[day]$[orderNumber]
# example
PO2203220004
```