import {getLogResponse} from '../getLogResponse';
import {log} from '../log';
import {LogLevel} from '../types';
import {shouldLog} from '../shouldLog';

export const error = (msg: string, meta?: object) => {
  if (shouldLog(LogLevel.ERROR)) {
    log(LogLevel.ERROR, msg, meta);
  }

  return getLogResponse(msg, meta);
};
