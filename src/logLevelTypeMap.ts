import type { LogType, LogLevel } from './types';

export const logLevelTypeMap: Record<LogLevel, LogType> = {
  FATAL: 'error',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'log',
  TRACE: 'log',
};
