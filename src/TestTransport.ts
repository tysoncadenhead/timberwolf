import { ILoggerConfig, LogLevel } from "./types";

import { Transport } from "./Transport";

export class TestTransport extends Transport {
  _history: Array<{ level: LogLevel; message: unknown }> = [];

  constructor() {
    super();
  }

  log(config: ILoggerConfig, level: LogLevel, message: unknown) {
    super.log(config, level, message);

    this._history.push({
      message,
      level,
    });
  }

  currentState() {
    return this._history[this._history.length - 1];
  }
}
