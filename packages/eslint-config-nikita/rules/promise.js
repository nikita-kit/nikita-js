module.exports = {
    parserOptions: {
        ecmaVersion: 7,
    },
    plugins: [
        'promise',
    ],

    rules: {
        // Enforces the use of catch on un-returned promises.
        'promise/catch-or-return': 'warn',

        // Avoid wrapping values in Promise.resolve or Promise.reject when not needed.
        'promise/no-return-wrap': 'warn',

        // Enforce consistent param names when creating new promises.
        'promise/param-names': 'off',

        // Return inside each then to create readable and reusable Promise chains.
        'promise/always-return': 'error',

        // In an ES5 environment, make sure to create a Promise constructor before using.
        'promise/no-native': 'off',

        // Avoid nested .then() or .catch() statements
        'promise/no-nesting': 'warn',

        // Avoid using promises inside of callbacks
        'promise/no-promise-in-callback': 'warn',

        // Avoid calling cb() inside of a then() (use nodeify] instead)
        'promise/no-callback-in-promise': 'warn',

        // Avoid creating new promises outside of utility libs (use pify instead)
        'promise/avoid-new': 'off',

        // Prefer await to then() for reading Promise values
        'prefer-await-to-then': 'off',

        // Prefer async/await to the callback pattern
        'prefer-await-to-callbacks': 'off',
    },
};
