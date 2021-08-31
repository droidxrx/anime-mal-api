module.exports = {
    env: { browser: true, es2021: true, node: true },
    overrides: [
        {
            files: ["./nodejs/**/*.ts", "./example/**/*.ts"],
            env: { browser: true, es2021: true, node: true },
            extends: [
                "standard",
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:import/errors",
                "plugin:import/warnings",
                "plugin:promise/recommended",
                "prettier",
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: { ecmaVersion: 12, sourceType: "module" },
            plugins: ["prettier", "@typescript-eslint"],
            rules: {
                "@typescript-eslint/no-explicit-any": 0,
                "comma-dangle": ["error", "always-multiline"],
                "no-empty-pattern": ["off"],
                "no-undef": ["error"],
                "no-var": ["error"],
                "object-curly-spacing": ["error", "always"],
                indent: ["off"],
                "prettier/prettier": ["error", { singleQuote: false, semi: true, endOfLine: "auto" }],
            },
        },
        {
            files: ["./rollup/*.js"],
            env: { node: true },
            extends: ["eslint:recommended"],
            parserOptions: { ecmaVersion: 12, sourceType: "module" },
            rules: { "no-undef": 2 },
        },
    ],
};
