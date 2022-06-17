import {getLogResponse} from '../getLogResponse';
import {log} from '../log';
import {LogLevel} from '../types';
import {shouldLog} from '../shouldLog';

export const trace = (msg: string, meta?: object) => {
  if (shouldLog(LogLevel.TRACE)) {
    log(LogLevel.TRACE, msg, meta);
  }

  return getLogResponse(msg, meta);
};
