import * as path from "path";

import { ConsoleTransport, LogLevel, Logger, TestTransport } from "..";

import { FileSystemTransport } from "../FileSystemTransport";

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
    logger.log(LogLevel.CRITICAL, {
      message: "Critical Error",
    });

    expect(transport.currentState().level).toEqual("CRITICAL");
    expect(transport.currentState().message).toEqual("Critical Error");
  });

  it("Should log debug", () => {
    logger.debug({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("DEBUG");
    expect(transport.currentState().message).toEqual("Hello");
  });

  it("Should log info", () => {
    logger.info({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("INFO");
  });

  it("Should log notice", () => {
    logger.notice({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("NOTICE");
  });

  it("Should log warning", () => {
    logger.warning({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("WARNING");
  });

  it("Should log error", () => {
    logger.error({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("ERROR");
  });

  it("Should log critical", () => {
    logger.critical({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("CRITICAL");
  });

  it("Should log alert", () => {
    logger.alert({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("ALERT");
  });

  it("Should log emergency", () => {
    logger.emergency({
      message: "Hello",
    });

    expect(transport.currentState().level).toEqual("EMERGENCY");
  });

  it("Should be possible to override the logger", () => {
    const generalTransport = new TestTransport();
    const infoTransport = new TestTransport();
    const logger = new Logger({
      transport: generalTransport,
      infoTransport,
    });

    logger.info({
      message: "Hello",
    });

    expect(infoTransport.currentState().message).toEqual("Hello");
  });

  it("Should log alert", () => {
    const generalTransport = new TestTransport();
    const logger = new Logger({
      transport: generalTransport,
      logLevel: LogLevel.EMERGENCY,
    });

    logger.alert({
      message: "Hi",
    });

    expect(generalTransport.currentState()).toEqual(undefined);
  });

  it("Should be possible to add meta data", () => {
    const generalTransport = new TestTransport();
    const testLogger = new Logger({
      transport: generalTransport,
      logLevel: LogLevel.DEBUG,
    });

    testLogger.addMeta({
      user: `Boba Fett`,
    });

    testLogger.warning({
      message: "Hi Boba",
    });

    expect(generalTransport.currentState().message).toEqual("Hi Boba");
    expect(generalTransport.currentState().user).toEqual("Boba Fett");

    testLogger.addMeta({
      type: "Bounty Hunter",
    });

    testLogger.warning({
      message: "Still there?",
    });

    expect(generalTransport.currentState().message).toEqual("Still there?");
    expect(generalTransport.currentState().user).toEqual("Boba Fett");
    expect(generalTransport.currentState().type).toEqual("Bounty Hunter");

    testLogger.clearMeta();

    testLogger.warning({
      message: "Gone?",
    });

    expect(generalTransport.currentState().message).toEqual("Gone?");
    expect(generalTransport.currentState().user).toEqual(undefined);
  });
});
