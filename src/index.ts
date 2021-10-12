import { ConsoleTransport } from "./ConsoleTransport";
import { Logger } from "./Logger";

export * from "./Logger";
export * from "./Transport";
export * from "./ConsoleTransport";
export * from "./types";

export const logger = new Logger({
  transport: new ConsoleTransport(),
});
