import {isObject} from './utils';
import {keysToMask} from './data';

interface IKeysToMask {
  [key: string]: boolean;
}

const keysToMaskObject = keysToMask.reduce((prev, current) => {
  return {
    ...prev,
    [current]: true,
  };
}, {}) as IKeysToMask;

const MASK = '******';

export const metaMask = <T>(meta: any): T => {
  if (isObject(meta)) {
    return Object.keys(meta).reduce((prev, key) => {
      const value = meta[key];
      return {
        ...prev,
        [key]: keysToMaskObject[key]
          ? MASK
          : typeof value === 'object' && Array.isArray(value)
          ? value.map(metaMask)
          : typeof value === 'object'
          ? metaMask(value)
          : value,
      };
    }, {}) as T;
  }

  return meta;
};
