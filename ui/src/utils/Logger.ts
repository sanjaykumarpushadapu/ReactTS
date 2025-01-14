// src/utils/logger.js

import { LOG_CONFIG } from '../constants';

class Logger {
  config: any;
  logs: any[];
  levels: string[];

  constructor(config: any) {
    this.config = config;
    this.logs = [];
    this.levels = ['DEBUG', 'INFO', 'WARN', 'ERROR']; // Log level hierarchy
  }

  log({
    level,
    message,
    context = {},
    trace = null,
  }: {
    level: string;
    message: string;
    context?: unknown;
    trace?: string | null;
  }): void {
    if (this.config.DISABLE_LOGGING) return;

    const currentLevelIndex = this.levels.indexOf(this.config.LOG_LEVEL);
    const messageLevelIndex = this.levels.indexOf(level);

    // Check if the log level is enabled
    if (messageLevelIndex < currentLevelIndex) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      trace,
    };

    // Add the new log entry and maintain max logs
    this.logs.push(logEntry);
    if (this.logs.length > this.config.MAX_LOGS) {
      this.logs.shift(); // Remove oldest log
    }

    // Optionally log to the console
    if (this.config.ENABLE_CONSOLE_LOGS) {
      this.outputToConsole(logEntry);
    }
  }

  outputToConsole(logEntry: {
    timestamp: string;
    level: string;
    message: string;
    context: any;
    trace: string | null;
  }) {
    const { timestamp, level, message, context, trace } = logEntry;
    console.log(`[${timestamp}] [${level}] - ${message}`, context);
    if (trace) {
      console.error(`Trace: ${trace}`);
    }
  }

  info(message: string, context: any = {}) {
    this.log({ level: 'INFO', message, context });
  }

  warn(message: string, context: any = {}) {
    this.log({ level: 'WARN', message, context });
  }

  error(message: string, error: Error | null = null, context: any = {}) {
    this.log({
      level: 'ERROR',
      message,
      context,
      trace: error?.stack || null,
    });
  }

  debug(message: string, context: any = {}) {
    this.log({ level: 'DEBUG', message, context });
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

const logger = new Logger(LOG_CONFIG);
export default logger;
