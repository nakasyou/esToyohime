import * as esbuild from "https://deno.land/x/esbuild@v0.17.14/mod.js";

export type Options = {
  src?: string;
  esmDist?: string;
  minEsmDist?: string;
  readmeText?: string;
  readmePath?: string;
  licenseText?: string;
  npmDist?: string;
  name?: string;
  version?: string;
  npm?: object;
  pligins?: Array<esbuild.Plugin>;
  importmapPath?: string;
  tsconfigPath?: string;
  globalName?: string;
};
export type StrictOptions = {
  src: string;
  esmDist: string;
  minEsmDist: string;
  readmeText: string;
  readmePath: string;
  licenseText: string;
  npmDist: string;
  name: string;
  version: string;
  npm: object;
  plugins: Array<esbuild.Plugin>;
  importmapPath: string;
  tsconfigPath: string;
  globalName: string;
};
export const defaultOptions: StrictOptions = {
  src: "./src/index.ts",
  esmDist: "./dist/esm.js",
  minEsmDist: "./dist/esm.min.js",
  readmeText: "# esToyohime project\nthis project use esToyohime!!",
  readmePath: "README.md",
  licenseText: "no license found...",
  npmDist: "./npm",
  npm: {
    name: "estoyohime_project",
    version: "v0.1.0",
    description: "this project use esToyohime"
  },
  plugins: [],
  importmapPath: "",
  tsconfigPath: "./tsconfig.json",
  globalName: "project",
}
export function parseOptions(options: Options): StrictOptions {
  const result=Object.assign({}, defaultOptions, options);
  options.npm=Object.assign({}, defaultOptions.npm,options.npm);
  return result;
}
