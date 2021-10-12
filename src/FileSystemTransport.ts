import * as fs from "fs";

import { IMessage } from "./types";
import { Transport } from "./Transport";

interface IFileSystemTransport {
  path: string;
}

export class FileSystemTransport extends Transport {
  _config?: IFileSystemTransport;

  constructor(config: IFileSystemTransport) {
    super();
    this._config = config;
  }

  log(event: IMessage) {
    super.log(event);

    fs.appendFileSync(this._config.path, "\n" + JSON.stringify(event), "utf8");
  }
}
