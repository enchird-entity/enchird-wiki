---
sidebar_position: 1
---

# Introduction
RageDB is Enchird's live synchronised NoSQL database javascript module built on PouchDB and its interaction with the CouchDB database (or any database that implements the CouchDB Sync protocol such as [Couchbase][couchbase]), to provide an offline first database with an interface similar to that of Google's Firestore from Firebase.

We will be using [Couchbase][couchbase] as the backend for the PouchDB client.

## PouchDB
PouchDB is a JavaScript implementation of [CouchDB][couchdb]. Its goal is to emulate the CouchDB API with near-perfect fidelity, while running in the browser or in Node.js.

CouchDB is a NoSQL database created in 2005 by Damien Katz, and now maintained by the Apache Software Foundation. If you are a JavaScript developer, you probably use CouchDB every day, because it's the core technology that powers npm.

You can find guides on using PouchDB [here][pouchdb-guides] and you will find its API reference [here][pouchdb-api].

## Couchbase
Couchbase is an award-winning distributed NoSQL opensource database. It delivers unmatched versatility, performance, scalability, and financial value across cloud, on-premises, hybrid, distributed cloud, and edge computing deployments.

You can find Couchbase documentation [here][couchbase-docs].

<!-- links -->
[couchdb]: https://couchdb.apache.org/
[couchbase]: http://couchbase.com/
[couchbase-docs]: https://docs.couchbase.com/home/index.html
[pouchdb-guides]: https://pouchdb.com/guides/
[pouchdb-api]: https://pouchdb.com/api.html