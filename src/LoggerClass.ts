import {Formatter, Logger, LogLevel} from './types';
import {setLogLevel} from './logLevel';
import {addMeta, clearMeta} from './globalMeta';
import {disableMetaMask, enableMetaMask} from './metaMaskToggled';
import {setLogger} from './loggerFn';
import {setFormatter} from './formatter';
import {logTypes} from './logTypes';
import {EmptyLoggerClass} from './EmptyLoggerClass';

export class LoggerClass implements EmptyLoggerClass {
  private _lastLog?: string;

  private setLastLog(message?: string) {
    this._lastLog = message;
    return this;
  }

  debug(message: string, meta?: object) {
    logTypes.debug(message, meta);
    return this.setLastLog(message);
  }

  error(message: string, meta?: object) {
    logTypes.error(message, meta);
    return this.setLastLog(message);
  }

  fatal(message: string, meta?: object) {
    logTypes.fatal(message, meta);
    return this.setLastLog(message);
  }

  info(message: string, meta?: object) {
    logTypes.info(message, meta);
    return this.setLastLog(message);
  }

  warn(message: string, meta?: object) {
    logTypes.warn(message, meta);
    return this.setLastLog(message);
  }

  trace(message: string, meta?: object) {
    logTypes.trace(message, meta);
    return this.setLastLog(message);
  }

  throw(message?: string) {
    throw new Error(message || this._lastLog);
  }

  when(condition: boolean) {
    if (condition) {
      return this;
    }

    return new EmptyLoggerClass();
  }

  setLogLevel(logLevel: LogLevel) {
    setLogLevel(logLevel);
    return this;
  }

  setLogger(logger: Logger) {
    setLogger(logger);
    return this;
  }

  addMeta(value: object) {
    addMeta(value);
    return this;
  }

  clearMeta() {
    clearMeta();
    return this;
  }

  disableMetaMask() {
    disableMetaMask();
    return this;
  }

  enableMetaMask() {
    enableMetaMask();
    return this;
  }

  setFormatter(fn: Formatter) {
    setFormatter(fn);
    return this;
  }
}
