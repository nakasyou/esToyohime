import * as esbuild from "https://deno.land/x/esbuild@v0.17.14/mod.js";

export interface Options {
  src?: string;
  dist?: {
    min: {
      esm: "esm.min.js",
      iife: "iife.min.js",
      cjs: "cjs.min.js",
    },
    esm: "esm.js",
    iife: "iife.js",
    cjs: "cjs.js",
  };
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
  formats?: ("iife" | "cjs" | "esm")[];
};
export interface StrictOptions {
  src: string;
  dist: {
    min: {
      esm: string,
      iife: string,
      cjs: string,
    },
    esm: string,
    iife: string,
    cjs: string,
  };
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
  formats: ("iife" | "cjs" | "esm")[];
};
export const defaultOptions: StrictOptions = {
  src: "./src/index.ts",
  dist: {
    min: {
      esm: "esm.min.js",
      iife: "iife.min.js",
      cjs: "cjs.min.js",
    },
    esm: "esm.js",
    iife: "iife.js",
    cjs: "cjs.js",
  },
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
  formats: ["esm"],
}
export function parseOptions(options: Options): StrictOptions {
  const result=Object.assign({}, defaultOptions, options);
  result.npm=Object.assign({}, defaultOptions.npm,options.npm);
  return result;
}
