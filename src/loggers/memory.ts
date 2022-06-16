import { Logger, LogLevel } from '../types';

interface IMemory {
  logLevel: LogLevel;
  message: string;
  meta?: object;
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
    meta,
  });
};

export const getLastLog = () => {
  return memory[memory.length - 1];
};

export const getLog = () => memory;

export const clear = () => {
  memory = [];
};
