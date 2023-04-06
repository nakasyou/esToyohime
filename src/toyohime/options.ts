import * as esbuild from "https://deno.land/x/esbuild@v0.17.14/mod.js";

export interface Options {
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
  importmapPath?: void | URL;
  tsconfigPath?: string;
  globalName?: string;
  banner?: Record<string,string>;
  footer?: Record<string,string>;
  compilerOptions?: Record<string,any>;
};
export interface StrictOptions {
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
  importmapPath: void | URL;
  tsconfigPath: string;
  globalName: string;
  banner: Record<string,string>;
  footer: Record<string,string>;
  compilerOptions: Record<string,any>;
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
  importmapPath: void(0),
  tsconfigPath: "./tsconfig.json",
  globalName: "project",
  banner: {},
  footer: {},
  compilerOptions: {},
}
export function parseOptions(options: Options): StrictOptions {
  const result=Object.assign({}, defaultOptions, options);
  result.npm=Object.assign({}, defaultOptions.npm,options.npm);
  return result;
}
