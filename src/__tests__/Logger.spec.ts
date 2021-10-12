import * as path from "path";

import { ConsoleTransport } from "..";
import { FileSystemTransport } from "../FileSystemTransport";
import { LogLevel } from "../types";
import { Logger } from "../Logger";
import { TestTransport } from "../TestTransport";

describe("Logger", () => {
  const transport = new TestTransport().concat(new ConsoleTransport()).concat(
    new FileSystemTransport({
      path: path.resolve(__dirname, `../../log`),
    })
  );
  const logger = new Logger({
    transport,
    timestamp: true,
  });

  it("Should log", () => {
    logger.log(LogLevel.CRITICAL, "Critical Error");

    expect(transport.currentState().level).toEqual(LogLevel.CRITICAL);
    expect(transport.currentState().message).toEqual("Critical Error");
  });

  it("Should log debug", () => {
    logger.debug("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.DEBUG);
    expect(transport.currentState().message).toEqual("Hello");
  });

  it("Should log info", () => {
    logger.info("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.INFO);
  });

  it("Should log notice", () => {
    logger.notice("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.NOTICE);
  });

  it("Should log warning", () => {
    logger.warning("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.WARNING);
  });

  it("Should log error", () => {
    logger.error("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.ERROR);
  });

  it("Should log critical", () => {
    logger.critical("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.CRITICAL);
  });

  it("Should log alert", () => {
    logger.alert("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.ALERT);
  });

  it("Should log emergency", () => {
    logger.emergency("Hello");

    expect(transport.currentState().level).toEqual(LogLevel.EMERGENCY);
  });

  it("Should be possible to override the logger", () => {
    const generalTransport = new TestTransport();
    const infoTransport = new TestTransport();
    const logger = new Logger({
      transport: generalTransport,
      infoTransport,
    });

    logger.info("Hello");

    expect(infoTransport.currentState().message).toEqual("Hello");
  });

  it("Should log alert", () => {
    const generalTransport = new TestTransport();
    const logger = new Logger({
      transport: generalTransport,
      logLevel: LogLevel.EMERGENCY,
    });

    logger.alert("Hi");

    expect(transport.currentState().message).toEqual("Hello");
  });
});
