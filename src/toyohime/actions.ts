import { type StrictOptions } from "./options.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.17.14/mod.js";
import exists from "../utils/exists.ts";
import npmModule from "./npm/index.ts";
import * as dntDeno from "https://deno.land/x/dnt@0.33.1/mod.ts";
import * as npmTool from "./npm/index.ts";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";

function isString(value: any): boolean {
  if (typeof value === "string" || value instanceof String) {
    return true;
  } else {
    return false;
  }
}
function options2esbuild(options: StrictOptions): esbuild.BuildOptions{
  const { banner, footer } = options;
  
  const esbuildOptions = {
    entryPoints: [options.src],
    bundle: true,
    plugins: options.plugins,
    banner,
    footer,
  }
  
  if(!esbuildOptions.plugins) esbuildOptions.plugins=[];
  
  esbuildOptions.plugins.push(denoPlugin({
    importMapURL: options.importmapPath,
    loader: "native",
  }));
  return esbuildOptions;
}
export async function build(options: StrictOptions): Promise<void>{
  const esbuildOptions = options2esbuild(options);
  for(const format of options.formats){
    Object.assign(esbuildOptions,{
      minify: true,
      outfile: options.dist.min[format],
      format: format,
    });
    await esbuild.build(esbuildOptions);
    esbuild.stop();
  }
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
    compilerOptions: options.compilerOptions,
  });
}
