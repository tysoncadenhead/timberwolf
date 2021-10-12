import { ILoggerConfig, IMessage, LEVELS, LogLevel } from "./types";

export class Logger {
  _config: ILoggerConfig;
  _meta: IMessage;

  constructor(config: ILoggerConfig) {
    this.config(config);
  }

  config(config: ILoggerConfig) {
    this._config = config;

    if (typeof config.logLevel !== "number") {
      this._config.logLevel = LogLevel.DEBUG;
    }

    if (!config.levels) {
      this._config.levels = LEVELS;
    }
  }

  log(level: LogLevel, message: IMessage) {
    if (this._config.logLevel < level) {
      return;
    }

    const transportMap = {
      [LogLevel.DEBUG]: this._config.debugTransport,
      [LogLevel.INFO]: this._config.infoTransport,
      [LogLevel.NOTICE]: this._config.noticeTransport,
      [LogLevel.WARNING]: this._config.warningTransport,
      [LogLevel.ERROR]: this._config.errorTransport,
      [LogLevel.CRITICAL]: this._config.criticalTransport,
      [LogLevel.ALERT]: this._config.alertTransport,
      [LogLevel.EMERGENCY]: this._config.emergencyTransport,
    };

    const event = {
      level: this._config.levels[level],
      ...message,
      ...this._meta,
      ...(this._config.timestamp
        ? {
            timestamp: new Date().toLocaleString(),
          }
        : {}),
    };

    if (transportMap[level]) {
      transportMap[level].log(event);
    } else {
      this._config.transport.log(event);
    }
  }

  debug(message: IMessage) {
    this.log(LogLevel.DEBUG, message);
  }

  info(message: IMessage) {
    this.log(LogLevel.INFO, message);
  }

  notice(message: IMessage) {
    this.log(LogLevel.NOTICE, message);
  }

  warning(message: IMessage) {
    this.log(LogLevel.WARNING, message);
  }

  error(message: IMessage) {
    this.log(LogLevel.ERROR, message);
  }

  critical(message: IMessage) {
    this.log(LogLevel.CRITICAL, message);
  }

  alert(message: IMessage) {
    this.log(LogLevel.ALERT, message);
  }

  emergency(message: IMessage) {
    this.log(LogLevel.EMERGENCY, message);
  }

  addMeta(meta: IMessage) {
    this._meta = {
      ...this._meta,
      ...meta,
    };
  }

  clearMeta() {
    this._meta = {};
  }
}
