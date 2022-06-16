import { IMessage } from "./types";
import { Transport } from "./Transport";

export class ConsoleTransport extends Transport {
  log(event: IMessage) {
    super.log(event);
    console.log(event);
  }
}
