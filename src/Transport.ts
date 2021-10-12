import { ILoggerConfig, LogLevel } from "./types";

export class Transport {
  _siblingLogger?: Transport;

  constructor() {}

  log(config: ILoggerConfig, level: LogLevel, message: unknown) {
    if (this._siblingLogger) {
      this._siblingLogger.log(config, level, message);
    }
  }

  concat(transport: Transport) {
    this._siblingLogger = transport;

    return this;
  }

  renderLevel(config: ILoggerConfig, level: LogLevel) {
    return `[ ${config.levels[level]} ] -`;
  }

  renderTimestamp(config: ILoggerConfig) {
    if (config.timestamp) {
      return ` [ ${new Date().toString()} ]`;
    }

    return "";
  }
}
