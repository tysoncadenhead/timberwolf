import {getLogResponse} from '../getLogResponse';
import {log} from '../log';
import {LogLevel} from '../types';
import {shouldLog} from '../shouldLog';

export const warn = (msg: string, meta?: object) => {
  if (shouldLog(LogLevel.WARN)) {
    log(LogLevel.WARN, msg, meta);
  }

  return getLogResponse(msg, meta);
};
