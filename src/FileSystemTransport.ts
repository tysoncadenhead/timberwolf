import * as fs from "fs";

import { ILoggerConfig, LogLevel } from "./types";

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

  log(config: ILoggerConfig, level: LogLevel, message: unknown) {
    super.log(config, level, message);

    fs.appendFileSync(
      this._config.path,
      `
${this.renderLevel(config, level)} ${JSON.stringify(
        message
      )} ${this.renderTimestamp(config)}`,
      "utf8"
    );
  }
}
