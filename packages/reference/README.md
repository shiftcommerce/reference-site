[ ![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)[ ![Code Climate](https://codeclimate.com/repos/59afd402570e4e0296000b5d/badges/ddb538f31d467ab460b5/gpa.svg)](https://codeclimate.com/repos/59afd402570e4e0296000b5d/feed)

# Shift Front End React
## Purpose

This repo is an out of the box front-end that works with the shift-platform. It is built with shift-next and shift-react-components. It has basic styles out of the box. It is designed to allow clients to get a front-end up and running within minutes.


## Getting started

To run the application locally you can carry out the instructions below.

#### Running Shift Front End React:

* **Clone the project:**

```bash
git clone git@github.com:shiftcommerce/shift-front-end-react.git
```

* **Enter the project folder:**

```bash
cd shift-front-end-react
```
* **Install packages:**

```bash
yarn install
```
* **Add .env:**

[.env example](https://github.com/shiftcommerce/shift-front-end-react/blob/master/.env.example)

Create a `.env` and follow the `.env.example` above, make sure you have the right values for each key in this file.

* **Run:**

```console
yarn devserver
```


You should now be able to interact with the web interface via [http://localhost:3000](http://localhost:3000).

**Available tools:**

We have the following binstubs available within the `/bin/dev/` folder to assist in working with the project locally via Docker:

* `./bin/dev/boot` - Boot the application. To exit use `CTRL-C`
* `./bin/dev/yarn` - Run the test suite within Docker.
* `./bin/dev/jest` - Run Jest within Docker.
* `./bin/dev/lint all` - Run both Standard & Stylelint.
* `./bin/dev/lint js` - Run Standard linting.
* `./bin/dev/lint js:fix` - Run Standard linting with auto-fix.
* `./bin/dev/lint css` - Run Stylelint.
* `./bin/dev/lint css:fix` - Run Stylelint with auto-fix.

## Testing

Jest specs are located in the spec directory and can be run using the following command:

```bash
./bin/dev/jest
```

or to run it locally:

```bash
yarn test
```

You can optionally also pass the path to a specific file/folder to run specs in

```bash
./bin/dev/jest spec/components/ExampleComponent.spec.js
```

```bash
yarn test spec/components/ExampleComponent.spec.js
```

You can run alternate jest test runners using the following commands:

```bash
./bin/dev/yarn run jest-watch
./bin/dev/yarn run jest-coverage
```

To rebuild snapshots, you can run

```bash
./bin/dev/jest -u
```

or

```bash
yarn test -u
```

## Security Headers

The reference site has a default set of best-practice security headers.

If external image hosts are used then these will need to be included in the
Content Security Policy - this can be done by setting the `IMAGE_HOSTS` environment
variable to a comma-separated list of hosts, e.g.:

```
IMAGE_HOSTS=https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com
```

While working on the site you may find you need to update these headers depending
on which features are required for the site to function.

These can be modified within `lib/expressSecurityHeadersMiddleware.js` (and the
corresponding test updated in `spec/lib/expressSecurityHeadersMiddleware.spec.js`)
as required.

**Note:** if you're working on a new feature and run into issues, check the
Feature Policy header in the above file as you may need to enable certain features
(e.g. geolocation)

## Style Guide
[Shift Style Guide](https://github.com/shiftcommerce/shift-front-end-react/blob/master/shift-style-guide.md)

## Development of related libraries

You are likely to use the reference site to develop and test related Shift libraries, in particular [shift-react-components](https://github.com/shiftcommerce/shift-react-components) and [shift-next](https://github.com/shiftcommerce/shift-next). To make local changes to these packages reflected in your local instance of the reference site use [yarn link](https://yarnpkg.com/en/docs/cli/link) :

**example using shift-react-components:**

```
# in ./shift-react-components
yarn link

# in ./shift-front-end-react
yarn link @shiftcommerce/shift-react-components

# Make sure you run webpack in watch mode in shift-react-components. 
# It makes compilation significantly faster.

# Now boot the reference site outside of Docker
nodemon --watch server.js
```

Any changes made to the linked library should now be automatically picked up by Next and pushed to the browser.
