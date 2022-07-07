import {defaultFormatter} from './formatters';
import {Formatter} from './types';

let formatter: Formatter = defaultFormatter;

export const setFormatter = (fn: Formatter) => {
  formatter = fn;
};

export const getFormatter = () => formatter;
