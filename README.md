# React + Apollo GraphQL

Sample repo to show the implementation of Apollo GraphQL to a simple form that only Reads, Creates and Deletes data, no Update, sorry.
Created for the talk `GraphQL 101: From backend to frontend` for Cognizant Softvision Programmer's week.

---

## Usage

Well, usage or something like that, there are a couple of branches to see how to add Read, Create and Delete. These steps have each their own branch, which are:

`01-read-all`, `02-read-single`, `03-create` and `04-delete`

`master` is the starting point with a json-server used as a REST API.

To run the app + server: `npm run dev` or `yarn dev`.

To change to each branch:

```
git branch checkout 01-read-all

git branch checkout 02-read-single

git branch checkout 03-create

git branch checkout 04-delete
```