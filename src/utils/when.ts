import {getLogResponse} from '../getLogResponse';
import {logTypes} from '../logTypes';

export const when = (condition: boolean) => {
  return {
    fatal: (msg: string, meta?: object) =>
      condition ? logTypes.fatal(msg, meta) : getLogResponse(msg, meta),

    error: (msg: string, meta?: object) =>
      condition ? logTypes.error(msg, meta) : getLogResponse(msg, meta),

    warn: (msg: string, meta?: object) =>
      condition ? logTypes.warn(msg, meta) : getLogResponse(msg, meta),

    info: (msg: string, meta?: object) =>
      condition ? logTypes.info(msg, meta) : getLogResponse(msg, meta),

    debug: (msg: string, meta?: object) =>
      condition ? logTypes.debug(msg, meta) : getLogResponse(msg, meta),

    trace: (msg: string, meta?: object) =>
      condition ? logTypes.trace(msg, meta) : getLogResponse(msg, meta),
  };
};
