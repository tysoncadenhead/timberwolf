import {getLogResponse} from '../getLogResponse';
import {log} from '../log';
import {LogLevel} from '../types';
import {shouldLog} from '../shouldLog';

export const fatal = (msg: string, meta?: object) => {
  if (shouldLog(LogLevel.FATAL)) {
    log(LogLevel.FATAL, msg, meta);
  }

  return getLogResponse(msg, meta);
};
