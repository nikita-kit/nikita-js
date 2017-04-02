# eslint-config-nikita

This package provides nikitas .eslintrc as an extensible shared config.

Our default export contains all of our ESLint rules, including ECMAScript 6+. It requires `eslint`, `eslint-plugin-import` and `eslint-plugin-promise`.

## Usage


1. Install the correct versions of each package, which are listed by the command:

  ```sh
  npm info "eslint-config-nikita@latest" peerDependencies
  ```

  Run command like that:

  ```sh
    npm install --save-dev eslint-config-nikita eslint@^#.#.# eslint-plugin-import@^#.#.# eslint-plugin-promise@^#.#.#
  ```

2. Add `"extends": "nikita"` to your .eslintrc or reference index.js as config in your Grunt eslint task.


## more

You can make sure this module lints with itself using `npm run lint`.

See [Nikita JavaScript Styleguide](https://github.com/nikita-kit/nikita-js) for more information.

