import { type BuildOptions } from "https://deno.land/x/esbuild@v0.17.14/mod.js";
import { type StrictOptions } from "../options.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.17.14/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";
import * as path from "https://deno.land/std@0.181.0/path/mod.ts";
import dts from "https://esm.sh/esbuild-plugin-d.ts@v1.1.0";
const { dtsPlugin } = dts;

export default async function(options: StrictOptions, esbuildOptions: BuildOptions){
  esbuildOptions = Object.assign({}, esbuildOptions, {
    minify: true,
  });
  const esmOptions=Object.assign({}, esbuildOptions, {
    format: "esm",
    outfile: path.join(options.npmDist,"esm","main.js")
  })
  esmOptions.plugins.push(dtsPlugin({
    tsconfig: options.tsconfigPath,
    outDir: path.join(options.npmDist,"types"),
  }));
  await esbuild.build(esmOptions);
  esbuild.stop();

  await esbuild.build(Object.assign({},esbuildOptions,{
    format: "iife",
    outfile: path.join(options.npmDist,"usm","main.js"),
    globalName: options.globalName,
  }));
  esbuild.stop();
}
