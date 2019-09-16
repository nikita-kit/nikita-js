module.exports = {
    extends: [
        './rules/best-practices',
        './rules/errors',
        './rules/es6',
        './rules/strict',
        './rules/style',
        './rules/variables',
        './rules/node',
        './rules/imports',
    ].map(require.resolve),
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};
