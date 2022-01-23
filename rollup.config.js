import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginTypescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [pluginTypescript(), pluginCommonjs(), pluginNodeResolve()],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    // ...Object.keys(pkg.devDependencies || {}),
  ],
};
