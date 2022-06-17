import {Logger, LogLevel} from '../types';
import {logLevelTypeMap} from '../logLevelTypeMap';

export const consoleLogger: Logger = (
  logLevel: LogLevel,
  msg: string,
  meta?: object,
) => {
  const logType = logLevelTypeMap[logLevel];

  console[logType](`${msg}`, {
    ...meta,
  });
};
