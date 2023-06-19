// @ts-check
"use strict";

import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  target: "es2020",
  outdir: "lib",
  external: ["react", "react-dom"],
});
