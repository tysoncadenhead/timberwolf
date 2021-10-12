import { ILoggerConfig, LEVELS, LogLevel } from "./types";

export class Logger {
  _config: ILoggerConfig;

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

  log(level: LogLevel, message: unknown) {
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

    if (transportMap[level]) {
      transportMap[level].log(this._config, level, message);
    } else {
      this._config.transport.log(this._config, level, message);
    }
  }

  debug(message: unknown) {
    this.log(LogLevel.DEBUG, message);
  }

  info(message: unknown) {
    this.log(LogLevel.INFO, message);
  }

  notice(message: unknown) {
    this.log(LogLevel.NOTICE, message);
  }

  warning(message: unknown) {
    this.log(LogLevel.WARNING, message);
  }

  error(message: unknown) {
    this.log(LogLevel.ERROR, message);
  }

  critical(message: unknown) {
    this.log(LogLevel.CRITICAL, message);
  }

  alert(message: unknown) {
    this.log(LogLevel.ALERT, message);
  }

  emergency(message: unknown) {
    this.log(LogLevel.EMERGENCY, message);
  }
}
