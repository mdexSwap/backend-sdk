# @mdex/backend-sdk

Used for coding sharing between repository for project `MDEX`

---

## Respository that will use package

- [`igo-backend`](https://github.com/openmeta-finance/igo-backend)
- [`info-service`](https://github.com/mdexSwap/info-service)

## Types of files being shared

##### Constant (`@mdex/backend-sdk/lib/constant`)

##### Decorators (`@mdex/backend-sdk/lib/decorators`)

##### Dto (`@mdex/backend-sdk/lib/dtos`)

##### Exceptions (`@mdex/backend-sdk/lib/exceptions`)

##### Middlewares (`@mdex/backend-sdk/lib/middlewares`)

##### NestService (`@mdex/backend-sdk/lib/nestService`)

##### Utils (`@mdex/backend-sdk/lib/utils`)

---

## What **should not** be included in this repository

If one or more of the following is available in the file being considered then the file <font color="red">**SHOULD NOT**</font> be added it to `@mdex/backend-sdk` (can be discussed over):

- File relies on local environment. For example, `config.production.ts` `.env`

---

## How to add files to this repo

1. add files as normal but also add `index.ts` that export constants or functions correctly. For example, anyone importing `@mdex/backend-sdk/lib/constant` will be able to get all constants from the `constants` folders
2. use `yarn build` on your local and try if you can import the files (from `dist` folder) properly. <br/><font color="red">**NOTE:** </font>Make sure to use absolute path as derived path `@utils/..` might create issues after package is being published
3. before creating release branch, use `bumpVersion:release:dry` to confirm the version you are bumping up to.
4. create `release` branch on github based on the version obtained from Step 3 and the npm package `vX.X.X-beta.X` should be published based on the version seen in Step 3.
5. Try importing the npm package in Step 4 in your repository and test out until satisfactory. If you need to make adjustment, then just directly create a new branch from `release` branch and merge it to publish the new beta npm package for testing.
6. Once the update is satisfactory, then merge `release` branch to `master` to create official npm package `vX.X.X`, and then merge `master` branch back to `development` branch

#### Things to Note:

- Once a npm package is published, you cannot overwrite that npm package. For example, you cannot publish `v1.1.0-beta.0` if this number has been published previously.
