import virtual from "@rollup/plugin-virtual";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dev from "rollup-plugin-dev";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
//import postcssImport from "postcss-import";

const basedir = "tests/app";
const port = 5000;

export default {
  input: `${basedir}/src/index.mjs`,
  output: {
    sourcemap: true,
    format: "esm",
    file: `${basedir}/public/bundle.main.mjs`
  },
  plugins: [
    virtual({
      "node-fetch": "export default fetch",
      stream: "export class Readable {}",
      buffer: "export class Buffer {}"
    }),
    svelte(),
    postcss({
      extract: true,
      sourceMap: true,
      minimize: false,
    //  plugins: [postcssImport]
    }),
    commonjs(),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    dev({
      port,
      dirs: [`${basedir}/public`],
      spa: `${basedir}/public/index.html`,
      basePath: `/components/kronos-integration/svelte-components/${basedir}`
    })
  ]
};
