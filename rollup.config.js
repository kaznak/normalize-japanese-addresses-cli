import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginTypescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "cjs",
    name: "hello-nodejs",
  },
  plugins: [pluginTypescript(), pluginCommonjs(), pluginNodeResolve()],
};
