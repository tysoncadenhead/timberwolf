import { ILoggerConfig, LogLevel } from "./types";

import { Transport } from "./Transport";

export class ConsoleTransport extends Transport {
  constructor() {
    super();
  }

  log(config: ILoggerConfig, level: LogLevel, message: unknown) {
    super.log(config, level, message);

    console.log(
      this.renderLevel(config, level),
      message,
      this.renderTimestamp(config)
    );
  }
}
