import { type BuildOptions } from "https://deno.land/x/esbuild@v0.17.14/mod.js";
import { type StrictOptions } from "../options.ts";
import exists from "../../utils/exists.ts";
import * as fs from "https://deno.land/std@0.181.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.181.0/path/mod.ts";
import emptydir from "./emptydir.ts";
import readme from "./readme.ts";
import license from "./license.ts";
import packageJson from "./package_json.ts";
import build from "./build.ts";

export default async function(options: StrictOptions, esbuildOptions: BuildOptions){
  // make empty dir
  await emptydir(options);

  // make same files
  await Promise.all([
    readme(options),  // readme
    license(options), // license
    packageJson(options), // package.json
  ]);
  
  await build(options,esbuildOptions)
}
export {
  emptydir,
  license,
  packageJson,
  build,
  readme,
}
