import {FormattedMeta, Logger, LogLevel} from '../types';
import {getFormatter} from '../formatter';

interface IMemory {
  logLevel: LogLevel;
  message: string;
  meta?: FormattedMeta;
}

let memory: IMemory[] = [];

export const memoryLogger: Logger = (
  logLevel: LogLevel,
  message: string,
  meta?: object,
) => {
  memory.push({
    logLevel,
    message,
    meta: getFormatter()(meta),
  });
};

export const getLastLog = () => {
  return memory[memory.length - 1];
};

export const getLog = () => memory;

export const clear = () => {
  memory = [];
};
