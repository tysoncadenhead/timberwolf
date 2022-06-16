import { LogLevel } from './types';

let logLevel = LogLevel.INFO;

export const setLogLevel = (newLogLevel: LogLevel) => {
  logLevel = newLogLevel;
};

export const getLogLevel = () => logLevel;

// Set the log level if it is provided as an environment variable
(() => {
  if (process.env.LOG_LEVEL) {
    setLogLevel(process.env.LOG_LEVEL as LogLevel);
  }
})();
