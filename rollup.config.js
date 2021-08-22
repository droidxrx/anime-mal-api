import ts from "rollup-plugin-ts"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import babel from "@rollup/plugin-babel"
import pkg from "./package.json"

export default {
    input: "src/index.ts",
    output: {
        dir: "lib",
        format: "cjs",
    },
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
                minified: true,
                comments: false,
            },
            tsconfig: { noImplicitUseStrict: true, declaration: true },
        }),

        terser({
            keep_classnames: true,
            keep_fnames: true,
            compress: true,
            mangle: true,
            format: {
                comments: "all",
            },
        }),
    ],
}
