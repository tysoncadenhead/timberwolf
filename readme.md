# TimberWolf

A Logger for Typescript

## Installation

NPM:

`npm install timberwolf --save`

Yarn:

`yarn add timberwolf --save`

## Usage

### Logging and levels

There are 8 log levels from `emergency` to `debug`.

```js
import { logger } from "timberwolf";

logger.emergency({
  /* ... */
});
logger.alert({
  /* ... */
});
logger.critical({
  /* ... */
});
logger.error({
  /* ... */
});
logger.warning({
  /* ... */
});
logger.notice({
  /* ... */
});
logger.info({
  /* ... */
});
logger.debug({
  /* ... */
});
```

You can also use the `log` method and pass in the log level:

```js
import { logger, LogLevel } from "timberwolf";

logger.log(LogLevel.WARNING, {
  /* ... */
});
```

### Configuration

#### Set the transport

By default, the `ConsoleTransport` is used, which outputs logs to `console.log`. This can be overwritten by using the config method.

```js
import * as path from "path";
import { logger, FileSystemTransport } from "timberwolf";

logger.config({
  transport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs"),
  }),
});
```

#### Merging multiple transports

Every transport has a `concat` method that may be used to merge another transport into it:

```js
import * as path from "path";
import { logger, FileSystemTransport, ConsoleTransport } from "timberwolf";

logger.config({
  transport: new ConsoleTransport().concat(
    new FileSystemTransport({ path: path.resolve(__dirname, "./logs") })
  ),
});
```

#### Set different transports for different log levels

If you wish, you can set the transport on the log level. This will take precedence over setting `transport` globally.

```js
import * as path from "path";
import { logger, FileSystemTransport } from "timberwolf";

logger.config({
  emergencyTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/emergency"),
  }),
  alertTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/alert"),
  }),
  criticalTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/critical"),
  }),
  errorTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/error"),
  }),
  warningTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/warning"),
  }),
  noticeTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/notice"),
  }),
  infoTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/info"),
  }),
  debugTransport: new FileSystemTransport({
    path: path.resolve(__dirname, "./logs/debug"),
  }),
});
```

#### Setting the Log Level

Everything below the LogLevel will not be pushed into the transport and not logged.

```js
import { logger, LogLevel } from "timberwolf";

logger.config({
  logLevel: LogLevel.ERROR,
});
```

#### Enabling timestamps

```js
import { logger } from "timberwolf";

logger.config({
  timestamp: true,
});
```

### Using a custom transport

For a transport to be valid, it must extend a `log` method tha calls `super.log` for chaining purposes. Here is the `ConsoleTransport` implementation:

```js
import { IMessage } from "./types";
import { Transport } from "./Transport";

export class ConsoleTransport extends Transport {
  log(event: IMessage) {
    super.log(event);
    console.log(event);
  }
}
```

### Adding meta data to every log

You may add any object of metadata to be added to the logs.

```js
import { logger } from "timberwolf";

logger.addMeta({
  username: "Batman",
});
```

You may also clear the meta object.

```js
import { logger } from "timberwolf";

logger.clearMeta();
```
