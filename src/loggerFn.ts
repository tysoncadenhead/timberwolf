import {consoleLogger} from './loggers/console';
import {Logger} from './types';

let loggerFn: Logger = consoleLogger;

export const getLogger = () => loggerFn;

export const setLogger = (newLogger: Logger) => {
  loggerFn = newLogger;
};
