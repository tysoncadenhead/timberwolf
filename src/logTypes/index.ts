import {debug} from './debug';
import {error} from './error';
import {fatal} from './fatal';
import {info} from './info';
import {warn} from './warn';
import {trace} from './trace';

export type LogType = 'debug' | 'error' | 'fatal' | 'info' | 'warn' | 'trace';

export const logTypes = {
  debug,
  error,
  fatal,
  info,
  warn,
  trace,
};
