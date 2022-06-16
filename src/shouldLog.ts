import type { LogLevel } from './types';
import { logLevelPriorityMap } from './logLevelPriorityMap';
import { getLogLevel } from './logLevel';

export const shouldLog = (requestedLogLevel: LogLevel) => {
  const logLevel = getLogLevel();
  const logLevelInt = logLevelPriorityMap[logLevel];
  const requestedLogLevelInt = logLevelPriorityMap[requestedLogLevel];

  return requestedLogLevelInt <= logLevelInt;
};
