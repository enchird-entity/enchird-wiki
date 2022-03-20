---
sidebar_position: 3
---
# Querying the Database
## Getting a document
### One-time fetching
This is done by calling the `.get()` method on the document reference. For example,
```typescript
db.collection('users').document('AcblELodlfby9392dw').get();
```
will fetch and return the user with `id = 'AcblELodlfby9392dw'`.

### Live fetching
If you want to continue getting updates on the document as changes happen in the database, you can call the `.onSnapshot()` method on the document reference. This will return an observable to which you can subscribe to, to get the new document everytime the document is modified in the database. The observable completes if the document is deleted.

For example, 
```typescript
let user;

db.collection('user').document('AcblELodlfby9392dw').onSnapshot((result) => {
    //update the user everytime it is modified.
    user = result;
});
```
will keep an up-to-date object that will contain the user data of the user with `id = 'AcblELodlfby9392dw'`.

## Modifying a document.
To modify a document, the `.set()` method has to be called on the document reference. For example,

```typescript
db.collection('user').document('AcblELodlfby9392dw').set({
    name: "Mario",
    age: 15
}, true)
```
will update the user with `id = 'AcblELodlfby9392dw'`, changing his name to Mario and his age to 15. If a document with that particular `_id` doesn't exist, a new one is created. 

The `.set()` method has two parameters:
- `document`: Which is the object containing the attributes we want to write into the document.
- `merge`: Which is a boolean that indicates whether we are merging the attributes passed into `document` to the existing attributes or we are overriding all the data existing in the document to put in this one.

## Deleting a document. 
This is done by calling the `.delete()` method on the document reference. For example,

```typescript
db.collection('user').document('AcblELodlfby9392dw').delete();
```
will delete the user with `id = 'AcblELodlfby9392dw'`.

## Fetching documents in a collection (or subcollection)
### One-time fetch
This is done by calling the `.get()` method on the collection reference. For example,
```typescript
db.collection('users').get()
``` 
Will fetch and return all the users in the database once.

### Live fetching
If you want to continue getting updates on your collection as changes happen in the database, you can call the `.onSnapshot()` method on the collection reference. This will return an observable to which you can subscribe to, to get the new results everytime a document in the collection is modified or deleted, or a new document is added to the collection.

For example,
```typescript
let users = [];

db.collection('users').onSnapshot().subscribe((results) => {
    // Update our results array everytime the users collection is modified.
    users = results;
})
```
will keep an up-to-date list of users from the database.

## Adding documents to a collection
### Adding a single document to a collection
This is done by calling the `.add()` method on the collection reference, while passing the object as a parameter. 

For example,
```typescript
db.collection('users').add({
    name: "James"
    age: 23
});
```
will add a user whose name is James and who is 23 years old to the database. If the `_id` parameter is not passed, it creates a new ID for the document.

The `.add()` method takes two parameters:
- `document`: The document to be added to the database.
- `force`: A boolean indicating if we should override any existing document with the same `_id`. If `force` is `false` then the document is not added if one already exists with the `_id`.

### Adding multiple documents.
This is done by calling the `.bulkAdd()` method on the collection reference. It takes an array of documents to add and a `force` parameter that has the same effect as in the `.add()` for all the documents to be added.

## Querying a collection.
You can query a collection by calling the `.where()` method on the collection reference. This will return a reference for all the documents that satisfy the query.

For example,
```typescript
db.collection('users').where({
    selector: {
        name: "James",
        age: {$gt: 20}
    }
}, ["name", "age"]).get();
```
will select all the users whose name is James and their age is greater than 20.

The `where()` method takes 2 parameters:
- `options`: Which is an object containing options for filtering and sorting the data. It has the following attributes:
  - `selector` Defines a selector to filter the results. Required.
      - `$lt` Match fields “less than” this one.
      - `$gt` Match fields “greater than” this one.
      - `$lte` Match fields “less than or equal to” this one.
      - `$gte` Match fields “greater than or equal to” this one.
      - `$eq` Match fields equal to this one.
      - `$ne` Match fields not equal to this one.
      - `$exists` True if the field should exist, false otherwise.
      - `$type` One of: “null”, “boolean”, “number”, “string”, “array”, or “object”.
      - `$in` The document field must exist in the list provided.
      - `$and` Matches if all the selectors in the array match.
      - `$nin` The document field must not exist in the list provided.
      - `$all` Matches an array value if it contains all the elements of the argument array.
      - `$size` Special condition to match the length of an array field in a document.
      - `$or` Matches if any of the selectors in the array match. All selectors must use the same index.
      - `$nor` Matches if none of the selectors in the array match.
      - `$not` Matches if the given selector does not match.
      - `$mod` Matches documents where (field % Divisor == Remainder) is true, and only when the document field is an integer.
      - `$regex` A regular expression pattern to match against the document field.
      - `$elemMatch` Matches all documents that contain an array field with at least one element that matches all the specified query criteria.
  - `fields` (Optional) Defines a list of fields that you want to receive. If omitted, you get the full documents.
  - `sort` (Optional) Defines a list of fields defining how you want to sort. Note that sorted fields also have to be selected in the selector.
  - `limit` (Optional) Maximum number of documents to return.
  - `skip` (Optional) Number of docs to skip before returning.
- `fields`: Not to be confused with `options.fields` attribute, this specifies all the fields used in the `options.selector` attribute for performance reasons.

The `.where()` method returns a collection reference so both `.get()` and `.onSnapshot()` can be called on it. If `onSnapshot()` is called, it will always send the updated result set if the documents corresponding to the where query change (modified, deleted) or one is added.
