import type { LogLevel } from './types';

export const logLevelPriorityMap: Record<LogLevel, number> = {
  FATAL: 1,
  ERROR: 2,
  WARN: 3,
  INFO: 4,
  DEBUG: 5,
  TRACE: 6,
};
