import { IMessage } from "./types";
import { Transport } from "./Transport";

export class TestTransport extends Transport {
  _history: Array<IMessage> = [];

  log(event: IMessage) {
    super.log(event);

    this._history.push(event);
  }

  currentState() {
    return this._history[this._history.length - 1];
  }
}
