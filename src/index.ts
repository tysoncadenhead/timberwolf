import { ILoggerConfig, IMessage, LogLevel } from "./types";

import { ConsoleTransport } from "./ConsoleTransport";
import { FileSystemTransport } from "./FileSystemTransport";
import { Logger } from "./Logger";
import { TestTransport } from "./TestTransport";
import { Transport } from "./Transport";

export const logger = new Logger({
  transport: new ConsoleTransport(),
});

export {
  ConsoleTransport,
  Logger,
  FileSystemTransport,
  TestTransport,
  Transport,
  ILoggerConfig,
  IMessage,
  LogLevel,
};
