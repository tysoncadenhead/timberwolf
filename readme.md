# TimberWolf 2.0

An extremely lightweight dependency-free logger for Typescript

## Installation

NPM:

`npm install timberwolf --save`

Yarn:

`yarn add timberwolf --save`

## Example

```js
import { logger } from "timberwolf";

logger.info("Hello World!"); 
// "[ INFO ] Hello World!"

logger.addMeta({
  user: "John Doe",
})

logger.debug('Hi John!')
// "[ DEBUG ] Hi John!", { user: "John Doe" }

logger.error('Something went wrong!', { error: 'John did it' }) 
// "[ ERROR ] Something went wrong!", { user: "John Doe", error: "John did it" }
```

```

## Usage

### Logging and levels

There are 6 log levels from `fatal` to `trace`.

```js
import { logger } from "timberwolf";

logger.fatal(message: string, metaData?: object);
logger.error(message: string, metaData?: object);
logger.warn(message: string, metaData?: object);
logger.info(message: string, metaData?: object);
logger.debug(message: string, metaData?: object);
logger.trace(message: string, metaData?: object);
```

### Configuration

#### Set the logger

Timberwolf uses a single function to output all logs.

By default, the console logger is used, which outputs logs to `console.log`. This can be overwritten by using the `setLogger` method.

```js
import { logger , Logger, LogLevel } from "timberwolf";

export const myLogger: Logger = (
  logLevel: LogLevel,
  msg: string,
  meta?: object,
) => {
  // Log however you want
};

// Set the logger to use myLogger
logger.setLogger(myLogger)
```

#### Setting the Log Level

The order of log priority is:

``
{
  FATAL: 1,
  ERROR: 2,
  WARN: 3,
  INFO: 4,
  DEBUG: 5,
  TRACE: 6,
}
```

Everything below the LogLevel will not be pushed into the transport and not logged.

By default, the log level is set to `INFO` unless you provide a `LOG_LEVEL` environment variable, which will be parsed as a LogLevel.

Additionally, you can set the log level any time using the `setLogLevel` method.

```js
import { logger, LogLevel } from "timberwolf";

logger.setLogLevel(LogLevel.ERROR);
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

The metadata will be spread over the metadata object for every subsequent log.

### Meta masking

By default Timberwolf will mask sensitive keys in the metadata object. These are defined in the `metaMask.ts` file.

If you want to disable this, you can use the `disableMetaMask` method.

```js
import { logger } from "timberwolf";

logger.disableMetaMask();

logger.info("Hello", {
  password: "pass123",
});
// "[ INFO ] Hello", { password: "********" }

logger.enableMetaMask();

logger.info("Hello", {
  password: "pass123",
});
```