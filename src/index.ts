import {Logger, LogLevel} from './types';

export * from './loggers';
export * from './formatters';
import {LoggerClass} from './LoggerClass';

export const logger = new LoggerClass();

export {Logger, LogLevel};
