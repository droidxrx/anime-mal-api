module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
        jquery: true,
    },
    plugins: ["eslint-plugin-html"],
    extends: "eslint:recommended",
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 12,
        requireConfigFile: false,
    },
    rules: {},
};
