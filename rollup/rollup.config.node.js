import ts from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "../project/nodejs/package.json";
import path from "path";

const rootdir = path.join(path.resolve(), "project/nodejs");
const input = path.join(rootdir, "index.ts");
const output = {
    dir: path.join(rootdir, "dist"),
    format: "cjs",
    exports: "named",
};
const tsconfig = path.join(rootdir, "tsconfig.json");

export default {
    input,
    output,
    external: Object.keys(pkg.dependencies),
    plugins: [
        resolve(),
        commonjs({ include: /node_modules/ }),
        babel({
            exclude: "node_modules/**",
            babelHelpers: "bundled",
        }),
        ts({
            transpiler: "babel",
            babelConfig: {
                babelrc: false,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: false,
                        },
                    ],
                ],
                plugins: ["@babel/plugin-transform-runtime"],
                minified: false,
                comments: false,
            },
            tsconfig,
        }),
        terser({
            compress: true,
            mangle: {
                keep_classnames: true,
                keep_fnames: true,
                eval: false,
                module: "ES6",
            },
            format: {
                comments: "all",
            },
        }),
    ],
};
