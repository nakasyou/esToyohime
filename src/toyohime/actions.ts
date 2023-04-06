import { type StrictOptions } from "./options.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.17.14/mod.js";
import exists from "../utils/exists.ts";
import npmModule from "./npm/index.ts";
import * as dntDeno from "https://deno.land/x/dnt@0.33.1/mod.ts";
import * as npmTool from "./npm/index.ts";

function options2esbuild(options: StrictOptions): esbuild.BuildOptions{
  const { banner, footer } = options;
  return {
    entryPoints: [options.src],
    bundle: true,
    plugins: options.plugins,
    banner,
    footer,
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
  await npmModule(options,esbuildOptions);
}
export async function dnt(options: StrictOptions): Promise<void>{
  await dntDeno.emptyDir(options.npmDist);
  // make same files
  await Promise.all([
    npmTool.readme(options),  // readme
    npmTool.license(options), // license
    npmTool.packageJson(options), // package.json
  ]);
  await dntDeno.build({
    entryPoints: [options.src],
    outDir: options.npmDist,
    shims: {
      deno: true,
    },
    package: options.npm,
  });
}
