import { type StrictOptions } from "../options.ts";
import * as path from "https://deno.land/std@0.181.0/path/mod.ts";

export default async function readme(options: StrictOptions){
  await Deno.writeTextFile(path.join(options.npmDist,"LICENSE"),options.licenseText);
}