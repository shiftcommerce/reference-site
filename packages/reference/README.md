[ ![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)[ ![Code Climate](https://codeclimate.com/repos/59afd402570e4e0296000b5d/badges/ddb538f31d467ab460b5/gpa.svg)](https://codeclimate.com/repos/59afd402570e4e0296000b5d/feed)

# Shift Front End React

## Getting started

To run the application locally you can carry out the instructions below.

#### Running Shift Front End React:

* **Install Docker:**

We suggest installing the Edge version of Docker Community Edition:

[https://www.docker.com/community-edition/](https://www.docker.com/community-edition/)

* **Clone the project:**

```bash
git clone git@github.com:shiftcommerce/shift-front-end-react.git
```

* **Enter the project folder:**

```bash
cd shift-front-end-react
```

* **Run:**

```bash
./bin/dev/boot
```

You should now be able to interact with the web interface via [http://localhost:3000](http://localhost:3000).

* **Add API Environment Variables:**
Connect to your API Host by adding the following environment variables in your `.env` file.
```
API_HOST=http://<DOCKER_HOST_IP_ADDRESS>:<PORT>
API_TENANT=http:<API_TENANT_REFERENCE>
API_ACCESS_TOKEN=<API_AUTH_ACCESS_TOKEN>
API_HOST_PROXY=<localhost>:<PORT>
```

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


**Testing**

Jest specs are located in the spec file and can be run using the following command:
```bash
./bin/dev/jest
```
You can optionally also pass the path to a specific file/folder to run specs in
```bash
./bin/dev/jest spec/components/ExampleComponent.spec.js
```

You can run alternate jest test runners using the following commands:
```bash
./bin/dev/yarn run jest-watch
./bin/dev/yarn run jest-coverage
```

To rebuild snapshots, you can run
```bash
./bin/dev/yarn run jest-update-snapshot
```

**Security Headers**

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

## Development of related libraries

You are likely to use the reference site to develop and test related Shift libraries, in particular [shift-react-components](https://github.com/shiftcommerce/shift-react-components) and [shift-next](https://github.com/shiftcommerce/shift-next). To make local changes to these packages reflected in your local instance of the reference site use [yarn link](https://yarnpkg.com/en/docs/cli/link) :
```
# in ./shift-react-components
yarn link

# in ./shift-front-end-react
yarn link @shiftcommerce/shift-react-components

# Now boot the reference site outside of Docker
nodemon --watch server.js
```
**Make sure you run webpack in watch mode** in shift-react-components. It makes compilation significantly faster.

Any changes made to the linked library should now be automatically picked up by Next and pushed to the browser.
