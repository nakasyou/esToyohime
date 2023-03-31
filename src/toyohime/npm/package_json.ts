import { type StrictOptions } from "../options.ts";
import * as path from "https://deno.land/std@0.181.0/path/mod.ts";

export default async function(options: StrictOptions){
  const { npm } = options;

  npm.module = "esm/main.js";
  npm.main = "umd/main.js";
  
  await Deno.writeTextFile(
    path.join(options.npmDist,"package.json"),
    JSON.stringify(npm,null,"  ")
  );
}