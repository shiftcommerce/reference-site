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
API_ACCESS_TOKEN=<API_AUTH_ACCESS_TOKEN>
API_HOST_PROXY=<localhost>:<PORT>
```

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
