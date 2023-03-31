import { type StrictOptions } from "./options.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.17.14/mod.js";
import exists from "../utils/exists.ts";
import npmModule from "./npm/index.ts";

function options2esbuild(options: StrictOptions): esbuild.BuildOptions{
  return {
    entryPoints: [options.src],
    bundle: true,
    plugins: options.plugins
  }
}
export async function build(options: StrictOptions): Promise<void>{
  const esbuildOptions = options2esbuild(options);
  Object.assign(esbuildOptions,{
    minify: true,
    outfile: options.minEsmDist,
  });
  await esbuild.build(esbuildOptions);
  esbuild.stop();
}
export async function watch(options: StrictOptions): Promise<void>{
  const esbuildOptions = options2esbuild(options);
  Object.assign(esbuildOptions,{
    minify: false,
    outfile: options.esmDist,
  });
  const ctx = await esbuild.context(esbuildOptions);
  await ctx.watch();
}
export async function npm(options: StrictOptions): Promise<void>{
  const esbuildOptions = options2esbuild(options);
  npmModule(options,esbuildOptions);
  
}