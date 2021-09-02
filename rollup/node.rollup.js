import ts from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "../project/nodejs/package.json";
import path from "path";

const rootdir = path.join(path.resolve(), "project/nodejs");
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
	input: path.join(rootdir, "index.ts"),
	output: {
		dir: path.join(rootdir, "dist"),
		format: "cjs",
		exports: "named",
		strict: false,
	},
	external: Object.keys(pkg.dependencies),
	plugins: [
		resolve({ preferBuiltins: true, browser: false }),
		commonjs(),
		babel({ babelHelpers: "bundled" }),
		ts({
			transpiler: "babel",
			babelConfig: {
				babelrc: false,
				presets: [["@babel/preset-env"]],
				plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-private-methods"],
				minified: false,
				comments: false,
			},
			tsconfig: path.join(rootdir, "tsconfig.json"),
		}),
		terser({
			compress: true,
			mangle: true,
			format: {
				comments: false,
			},
		}),
	],
};
export default config;
