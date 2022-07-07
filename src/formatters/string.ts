import {Formatter} from '../types';

export const stringFormatter: Formatter = (input: object) =>
  JSON.stringify(input);
