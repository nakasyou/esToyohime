import Toyohime from "./index.ts";
import * as flags from "https://deno.land/std@0.181.0/flags/mod.ts";
import * as actions from "./actions.ts";

export default async function ({ options }: Toyohime) {
  const modes = ["build","watch","npm","dnt"];
  const args = flags.parse(Deno.args, {
    boolean: modes,
  });
  const tasks: Array<Promise<void>> = [];
  for(const mode of modes){
    if(args[mode]){
      switch(mode){
        case "build":
          tasks.push(actions.build(options));
          break;
        case "watch":
          tasks.push(actions.watch(options));
          break;
        case "npm":
          tasks.push(actions.npm(options));
          break;
        case "dnt":
          tasks.push(actions.dnt(options));
          break;
        default:
          break;
      }
    }
    await Promise.all(tasks);
  }
}
