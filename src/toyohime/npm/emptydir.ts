import * as fs from "https://deno.land/std@0.181.0/fs/mod.ts";
import { type StrictOptions } from "../options.ts";
import exists from "../../utils/exists.ts";

export default async function(options: StrictOptions){
  const existsNpmDir=await exists(options.npmDist);
  if(!existsNpmDir.isDir && existsNpmDir.isPath){
    await Deno.remove(options.npmDist);
  }
  await fs.emptyDir(options.npmDist);
}