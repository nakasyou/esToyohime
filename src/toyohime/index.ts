import {
  type Options,
  parseOptions,
  type StrictOptions
} from "./options.ts";
import connect from './connect.ts';

class Toyohime {
  options: StrictOptions;
  constructor(options?: Options) {
    if(!options) options={};
    // to strict options
    this.options = parseOptions(options);
  }
  async connect(addOptions: Options){
    const add = addOptions;
    Object.assign(this.options, add);
    await connect(this);
  }
}

export default Toyohime;
export {
  type Options,
  parseOptions,
  type StrictOptions,
}
