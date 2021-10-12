import { Transport } from "./Transport";

export enum LogLevel {
  EMERGENCY = 0,
  ALERT = 1,
  CRITICAL = 2,
  ERROR = 3,
  WARNING = 4,
  NOTICE = 5,
  INFO = 6,
  DEBUG = 7,
}

export const LEVELS = [
  "EMERGENCY",
  "ALERT",
  "CRITICAL",
  "ERROR",
  "WARNING",
  "NOTICE",
  "INFO",
  "DEBUG",
];

export interface ILoggerConfig {
  logLevel?: LogLevel;
  levels?: Array<string>;
  transport: Transport;
  debugTransport?: Transport;
  infoTransport?: Transport;
  noticeTransport?: Transport;
  warningTransport?: Transport;
  errorTransport?: Transport;
  criticalTransport?: Transport;
  alertTransport?: Transport;
  emergencyTransport?: Transport;
  timestamp?: boolean;
}

export interface IMessage {
  [key: string]: unknown;
}
