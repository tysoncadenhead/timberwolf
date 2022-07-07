import {logger, prettyStringFormatter, defaultFormatter} from '..';
import {clear, memoryLogger, getLastLog, getLog} from '../loggers/memory';
import {consoleLogger} from '../loggers/console';
import {LogLevel} from '../types';

describe('Log utility', () => {
  beforeAll(() => {
    logger.setLogger(memoryLogger);
  });

  beforeEach(() => {
    clear();
    logger.clearMeta();
    logger.setLogLevel(LogLevel.INFO);
  });

  afterAll(() => {
    logger.setLogger(consoleLogger);
  });

  describe('Logging', () => {
    it('Should handle fatal errors', () => {
      logger.setLogLevel(LogLevel.FATAL);
      logger.fatal('Some fatal error', {});

      expect(getLastLog()).toEqual({
        message: 'Some fatal error',
        meta: {},
        logLevel: LogLevel.FATAL,
      });
    });

    it('Should handle errors', () => {
      logger.setLogLevel(LogLevel.ERROR);
      logger.error('Some error', {});

      expect(getLastLog()).toEqual({
        message: 'Some error',
        meta: {},
        logLevel: LogLevel.ERROR,
      });
    });

    it('Should handle warnings', () => {
      logger.setLogLevel(LogLevel.WARN);
      logger.warn('Some warning', {});

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {},
        logLevel: LogLevel.WARN,
      });
    });

    it('Should handle info', () => {
      logger.setLogLevel(LogLevel.INFO);
      logger.info('Some info', {});

      expect(getLastLog()).toEqual({
        message: 'Some info',
        meta: {},
        logLevel: LogLevel.INFO,
      });
    });

    it('Should handle debugs', () => {
      logger.setLogLevel(LogLevel.DEBUG);
      logger.debug('Some debug', {});

      expect(getLastLog()).toEqual({
        message: 'Some debug',
        meta: {},
        logLevel: LogLevel.DEBUG,
      });
    });

    it('Should handle traces', () => {
      logger.setLogLevel(LogLevel.TRACE);
      logger.trace('Some trace', {});

      expect(getLastLog()).toEqual({
        message: 'Some trace',
        meta: {},
        logLevel: LogLevel.TRACE,
      });
    });
  });

  describe('Levels', () => {
    it('Should not log error if the log level is fatal', () => {
      logger.setLogLevel(LogLevel.FATAL);
      logger.error('Some error', {});

      expect(getLog()).toEqual([]);
    });

    it('Should not log warn if the log level is error', () => {
      logger.setLogLevel(LogLevel.ERROR);
      logger.warn('Some warning', {});

      expect(getLog()).toEqual([]);
    });

    it('Should log warn if the log level is info', () => {
      logger.setLogLevel(LogLevel.INFO);
      logger.warn('Some warning', {});

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {},
        logLevel: LogLevel.WARN,
      });
    });
  });

  describe('Meta', () => {
    it('Should log meta that is passed in to the logger', () => {
      logger.setLogLevel(LogLevel.WARN);
      logger.warn('Some warning', {
        foo: 'bar',
      });

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {
          foo: 'bar',
        },
        logLevel: LogLevel.WARN,
      });
    });

    it('Should log meta that is global', () => {
      logger.setLogLevel(LogLevel.WARN);
      logger.addMeta({
        foo: 'bar',
      });
      logger.warn('Some warning', {});

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {
          foo: 'bar',
        },
        logLevel: LogLevel.WARN,
      });
    });
  });

  describe('Masking', () => {
    it('Should mask sensitive keys', () => {
      logger.info('Hello', {
        password: 'pass123',
      });

      expect(getLastLog()).toEqual({
        message: 'Hello',
        meta: {
          password: '******',
        },
        logLevel: LogLevel.INFO,
      });
    });

    it('Should allow us to disable the meta mask', () => {
      logger.disableMetaMask();

      logger.info('Hello', {
        password: 'pass123',
      });

      logger.enableMetaMask();

      expect(getLastLog()).toEqual({
        message: 'Hello',
        meta: {
          password: 'pass123',
        },
        logLevel: LogLevel.INFO,
      });
    });

    it('Should mask nested sensitive keys', () => {
      logger.info('Hello', {
        user: {
          password: 'pass123',
        },
      });

      expect(getLastLog()).toEqual({
        message: 'Hello',
        meta: {
          user: {
            password: '******',
          },
        },
        logLevel: LogLevel.INFO,
      });
    });

    it('Should mask nested sensitive keys inside arrays', () => {
      logger.info('Hello', {
        users: [
          {
            password: 'pass123',
          },
        ],
      });

      expect(getLastLog()).toEqual({
        message: 'Hello',
        meta: {
          users: [
            {
              password: '******',
            },
          ],
        },
        logLevel: LogLevel.INFO,
      });
    });

    it('Should allow regular arrays', () => {
      logger.info('Hello', {
        userIds: ['1'],
      });

      expect(getLastLog()).toEqual({
        message: 'Hello',
        meta: {
          userIds: ['1'],
        },
        logLevel: LogLevel.INFO,
      });
    });
  });

  describe('Throw', () => {
    it('Should throw the error message', () => {
      expect(() => {
        logger.fatal('Oops', {}).throw();
      }).toThrow('Oops');
    });

    it('Should throw a custom error message', () => {
      expect(() => {
        logger.fatal('Oops', {}).throw('Custom message');
      }).toThrow('Custom message');
    });
  });

  describe('When', () => {
    it('Should log when the condition is met', () => {
      logger.when(true).info('Some message', {});

      expect(getLastLog()).toEqual({
        message: 'Some message',
        meta: {},
        logLevel: LogLevel.INFO,
      });
    });

    it('Should not log when the condition is not met', () => {
      logger.when(false).info('Some message', {});

      expect(getLastLog()).toEqual(undefined);
    });

    it('Should allow chaining', () => {
      logger
        .setFormatter(prettyStringFormatter)
        .info('Hello', {
          foo: 'bar',
        })
        .setFormatter(defaultFormatter);

      expect(getLastLog()).toEqual({
        logLevel: 'INFO',
        message: 'Hello',
        meta: `{
  \"foo\": \"bar\"
}`,
      });
    });
  });
});
