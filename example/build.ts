import { Toyohime } from "../mod.ts";

const toyohime: Toyohime = new Toyohime({
  src: "./example/src/index.ts",
  esmDist: "./example/dist/esm.js",
  minEsmDist: "./example/dist/esm.min.js",
  npmDist: "./example/npm",
  npm: {
    name: "example_project",
    version: "v1.0.0",
    description: "example.",
  },
  readmeText: await Deno.readTextFile("./example/README.md"),
  licenseText: await Deno.readTextFile("./example/LICENSE"),
  tsconfigPath: "./example/tsconfig.json",
  globalName: "project",
  importmapPath: new URL("./import_map.json",import.meta.url),
});

await toyohime.connect({});
