module.exports = {
    extends: [
        'eslint-config-nikita',
        './rules/react',
        './rules/react-hooks',
        './rules/react-a11y',
    ].map(require.resolve),
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};
