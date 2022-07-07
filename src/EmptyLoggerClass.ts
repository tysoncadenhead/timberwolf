import {Formatter, Logger, LogLevel} from './types';

export class EmptyLoggerClass {
  debug(_message: string, _meta?: object) {
    return this;
  }

  error(_message: string, _meta?: object) {
    return this;
  }

  fatal(_message: string, _meta?: object) {
    return this;
  }

  info(_message: string, _meta?: object) {
    return this;
  }

  warn(_message: string, _meta?: object) {
    return this;
  }

  trace(_message: string, _meta?: object) {
    return this;
  }

  throw(_message?: string) {}

  setLogLevel(_logLevel: LogLevel) {
    return this;
  }

  setLogger(_logger: Logger) {
    return this;
  }

  addMeta(_value: object) {
    return this;
  }

  clearMeta() {
    return this;
  }

  disableMetaMask() {
    return this;
  }

  enableMetaMask() {
    return this;
  }

  setFormatter(_fn: Formatter) {
    return this;
  }
}
