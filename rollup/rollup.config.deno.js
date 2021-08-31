import dts from "rollup-plugin-dts";
import nodeResolve from "@rollup/plugin-node-resolve";

const config = [
    {
        input: "./types/mod.d.ts",
        output: [{ file: "./mod.d.ts", format: "es" }],
        plugins: [dts(), nodeResolve()],
    },
];

export default config;
