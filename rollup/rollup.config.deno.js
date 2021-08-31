import dts from "rollup-plugin-dts";
import nodeResolve from "@rollup/plugin-node-resolve";
import path from "path";

const rootDir = path.join(path.resolve(), "project/deno");
const join = (fileorfolder) => path.join(rootDir, fileorfolder);

const config = [
    {
        input: join("types/mod.d.ts"),
        output: [{ file: join("mod.d.ts"), format: "es" }],
        plugins: [dts(), nodeResolve()],
    },
];

export default config;
