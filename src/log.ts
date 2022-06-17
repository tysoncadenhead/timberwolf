import {getMeta} from './globalMeta';
import {metaMask} from './metaMask';
import {getMetaMaskToggled} from './metaMaskToggled';
import {LogLevel} from './types';
import {getLogger} from './loggerFn';

export const log = (logLevel: LogLevel, msg: string, meta?: object) => {
  const allMeta = {
    ...getMeta(),
    ...meta,
  };

  getLogger()(
    logLevel,
    msg,
    getMetaMaskToggled() ? metaMask(allMeta) : allMeta,
  );
};
