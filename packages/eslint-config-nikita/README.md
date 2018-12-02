# eslint-config-nikita

This package provides nikitas .eslintrc as an extensible shared config.

Our default export contains all of our ESLint rules, including ECMAScript 6+. 
It requires `eslint`, `eslint-plugin-import` and `eslint-plugin-promise`.

## Usage


1. Install the correct versions of each package, which are listed by the command:

```sh
npm info "eslint-config-nikita@latest" peerDependencies
```

If using npm 5+, use this shortcut:

```sh
npx install-peerdeps --dev eslint-config-nikita
```

2. Add `"extends": "nikita"` to your .eslintrc or reference index.js as config in your Grunt eslint task.


## Version

The version of this package equals the nikita-js version.


## more

You can make sure this module lints with itself using `npm run lint`.

See [Nikita JavaScript Styleguide](https://github.com/nikita-kit/nikita-js) for more information.
