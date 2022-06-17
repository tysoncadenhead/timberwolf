import {getLogResponse} from '../getLogResponse';
import {log} from '../log';
import {LogLevel} from '../types';
import {shouldLog} from '../shouldLog';

export const info = (msg: string, meta?: object) => {
  if (shouldLog(LogLevel.INFO)) {
    log(LogLevel.INFO, msg, meta);
  }

  return getLogResponse(msg, meta);
};
