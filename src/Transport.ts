import { IMessage } from "./types";

export class Transport {
  _siblingLogger?: Transport;

  log(event: IMessage) {
    if (this._siblingLogger) {
      this._siblingLogger.log(event);
    }
  }

  concat(transport: Transport) {
    this._siblingLogger = transport;

    return this;
  }
}
