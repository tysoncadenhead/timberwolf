import {Logger, LogLevel} from './types';
import {setLogLevel} from './logLevel';
import {shouldLog} from './shouldLog';
import {consoleLogger} from './loggers/console';

let loggerFn: Logger = consoleLogger;

let globalMeta = {};

const log = (logLevel: LogLevel, msg: string, meta?: object) => {
  loggerFn(logLevel, msg, {
    ...globalMeta,
    ...meta,
  });
};

const addMeta = (value: object) => {
  globalMeta = {
    ...globalMeta,
    ...value,
  };
};
const clearMeta = () => {
  globalMeta = {};
};

export const logger = {
  fatal: (msg: string, meta?: object) => {
    if (shouldLog(LogLevel.FATAL)) {
      log(LogLevel.FATAL, msg, meta);
    }
  },
  error: (msg: string, meta?: object) => {
    if (shouldLog(LogLevel.ERROR)) {
      log(LogLevel.ERROR, msg, meta);
    }
  },
  warn: (msg: string, meta?: object) => {
    if (shouldLog(LogLevel.WARN)) {
      log(LogLevel.WARN, msg, meta);
    }
  },
  info: (msg: string, meta?: object) => {
    if (shouldLog(LogLevel.INFO)) {
      log(LogLevel.INFO, msg, meta);
    }
  },
  debug: (msg: string, meta?: object) => {
    if (shouldLog(LogLevel.DEBUG)) {
      log(LogLevel.DEBUG, msg, meta);
    }
  },
  trace: (msg: string, meta?: object) => {
    if (shouldLog(LogLevel.TRACE)) {
      log(LogLevel.TRACE, msg, meta);
    }
  },
  setLogLevel,
  setLogger: (newLogger: Logger) => {
    loggerFn = newLogger;
  },
  addMeta,
  clearMeta,
};

export {Logger, LogLevel};
