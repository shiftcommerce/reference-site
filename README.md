## Reference Monorepo

- reference site
- shift-next
- shift-next-routes
- shift-node-api
- shift-react-components

## Background

We utilise Lerna and Yarn workspaces as part of our development process.

Within the monorepo, we have our own reference site that is ran alongside all of our client facing packages.

## Publishing new package versions

We enforce that all packages are bumped versions simulataneously. There are 2 pre-canned commands that we utilise:

`yarn bump-versions` Bump every package's package.json version number and update every dependency to use the new version.

`yarn publish-versions` Publish the new package versions to NPM
