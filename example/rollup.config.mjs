import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dev from "rollup-plugin-dev";
import svelte from "rollup-plugin-svelte";

const port = 5000;

export default {
  input: "example/src/index.mjs",
  output: {
    sourcemap: true,
    format: "esm",
    file: "example/public/bundle.mjs"
  },
  plugins: [
    svelte(),
    resolve({ browser: true }),
    commonjs(),
    dev({
      port,
      dirs: ["example/public"],
      spa: "example/public/index.html",
      basePath: "/base"
    })
  ]
};
