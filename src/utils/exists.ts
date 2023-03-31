export type Exists = {
  isFile: boolean;
  isDir: boolean;
  isPath: boolean;
  isSymlink: boolean;
}
export default async function(path: string): Promise<Exists>{
  try{
    const stat = await Deno.stat(path);
    return {
      isFile: stat.isFile,
      isDir: stat.isDirectory,
      isPath: true,
      isSymlink: stat.isSymlink,
    }
  }catch(e){
    if(e instanceof Deno.errors.NotFound)
      return {
        isFile: false,
        isDir: false,
        isPath: false,
        isSymlink: false,
      }
    throw e;
  }
}