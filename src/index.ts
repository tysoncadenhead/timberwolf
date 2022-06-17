import {Logger, LogLevel} from './types';
import {setLogLevel} from './logLevel';
import {logTypes} from './logTypes';
import {addMeta, clearMeta} from './globalMeta';
import {disableMetaMask, enableMetaMask} from './metaMaskToggled';
import {setLogger} from './loggerFn';
import {when} from './utils';

export const logger = {
  ...logTypes,
  when,
  setLogLevel,
  setLogger,
  addMeta,
  clearMeta,
  disableMetaMask,
  enableMetaMask,
};

export {Logger, LogLevel};
