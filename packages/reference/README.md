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
