import {Formatter} from '../types';

export const prettyStringFormatter: Formatter = (input: object) =>
  JSON.stringify(input, null, 2);
