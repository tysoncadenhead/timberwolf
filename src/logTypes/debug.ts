import {getLogResponse} from '../getLogResponse';
import {log} from '../log';
import {LogLevel} from '../types';
import {shouldLog} from '../shouldLog';

export const debug = (msg: string, meta?: object) => {
  if (shouldLog(LogLevel.DEBUG)) {
    log(LogLevel.DEBUG, msg, meta);
  }

  return getLogResponse(msg, meta);
};
