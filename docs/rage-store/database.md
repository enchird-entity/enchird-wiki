---
sidebar_position: 2
---
# The Database
## Creating a database
You can create a new database by creating a RageStore object.

For example,
```typescript
const ownerId: string = "ownerId";
const remoteDbUrl: string = "https://localhost:5891";
const db = new RageStore(ownerId, "myDatabase", remoteDbUrl);
```

The constructor takes the following parameters:
- `owner`: This is a string that dictates the data that is synchronized from the server. Only data which has its `owner` attribute equal to this value would be synced.
- `name`: The name of the local database.
- `remoteUrl` (optional): The URL of the remote database server that this local database will replicate. 
- `auth`: The authentication credentials for the remote database server. It has the following attributes:
  - `username`
  - `password`
- `adapter`: One of `'idx'`, `'leveldb'` or `'http'` specifying the adapter to use.
- `hooks`: An array of objects that correspond to any hooks (create hooks, update hooks, delete hooks) that have to be run in the database. Each has the following attributes:
  - `name`: Used to identify the hook.
  - `type`: An element of an enumeration (`RageHook`) specifying whether it's a create, update or delete hook.
  - `callback`: A function that takes two parameters (the document that was created, updated or deleted and the RageStore database object) and returns a boolean indicating if the hook was run successfully or not.

## Collections
Like Firestore, RageStore implements the concept of collections. This is a NoSQL concept similar to tables in a relational database. A collection is a set of documents (documents here being the base elements stored in the database. We will elaborate more on them below) that have the same structure or are of the same type. For example, we could have a collection for tickets and one for buses.

Collections don't have to created explicitly. They are created automatically when the first document is added to them. To reference a collection, call the `.collection()` method on the database object. 

For example, 
```typescript
db.collection('users')
```
references the `'users'` collection in the database.

## Subcollections
Like Firestore, RageStore implements the concept of subcollections. A subcollection is a collection of documents that are related to a single document. For example the ticket subcollection for a user will be all the tickets for a particular user. To reference a subcollection, call the `.collection()` method on a document reference.

For example,
```typescript
db.collection('users').document('AcblELodlfby9392dw').collection('tickets');
```
references the collection of all the ticket of the user with `_id = 'AcblELodlfby9392dw'`.

Note that, there can be an infinite number of nested subcollections.

That is, `collection('string').document('string')`....`.collection('string').document('string')` can be repeated any number of times. As long as the documents and the collections exist.

## Documents
A document is the unit of data in the database. Each document is identified by an `_id` and must be in a collection. A document is made up of attributes. To reference a document, you can use the `.document()` method of the collection reference.

For example,
```typescript
db.collection('users').document('AcblELodlfby9392dw');
```
references the user with `_id = 'AcblELodlfby9392dw'`.