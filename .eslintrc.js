/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
const config = {
	env: { browser: true, es2021: true, node: true },
	overrides: [
		{
			files: ["./project/nodejs/**/**/*.ts", "./example/**/*.ts"],
			env: { browser: true, es2021: true, node: true },
			extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
			parser: "@typescript-eslint/parser",
			parserOptions: { ecmaVersion: 12, sourceType: "module" },
			plugins: ["@typescript-eslint"],
			rules: { "@typescript-eslint/no-explicit-any": 0, "no-undef": 2 },
		},
		{
			files: ["./rollup/*.js", "./rollup.config.js"],
			env: { node: true },
			extends: ["eslint:recommended"],
			parserOptions: { ecmaVersion: 12, sourceType: "module" },
			rules: { "no-undef": 2 },
		},
		{
			files: ["./example/**/*.js", "./project/nodejs/**/**/*.js"],
			env: { browser: true, es2021: true, node: true, commonjs: true },
			extends: ["eslint:recommended"],
			parser: "@babel/eslint-parser",
			parserOptions: { ecmaVersion: 12, requireConfigFile: false },
			rules: {},
		},
	],
};
module.exports = config;
