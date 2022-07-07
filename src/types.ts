export type LogType = 'log' | 'info' | 'error' | 'warn';

export enum LogLevel {
  FATAL = 'FATAL',
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE',
}

export type Logger = (logLevel: LogLevel, msg: string, meta?: object) => void;

export type FormattedMeta = object | string;

export type Formatter = (input: object) => FormattedMeta;
