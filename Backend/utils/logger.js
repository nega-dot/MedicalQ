const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...meta
    };
    
    return JSON.stringify(logEntry);
  }

  writeToFile(level, message) {
    const logFile = path.join(logsDir, `${level}.log`);
    const logEntry = this.formatMessage(level, message) + '\n';
    
    fs.appendFileSync(logFile, logEntry);
  }

  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  log(level, message, meta = {}) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, meta);
    
    // Console output with colors
    const colors = {
      error: '\x1b[31m', // red
      warn: '\x1b[33m',  // yellow
      info: '\x1b[36m',  // cyan
      debug: '\x1b[37m'  // white
    };
    
    const reset = '\x1b[0m';
    console.log(`${colors[level]}${formattedMessage}${reset}`);
    
    // Write to file in production
    if (process.env.NODE_ENV === 'production') {
      this.writeToFile(level, message);
    }
  }

  error(message, meta = {}) {
    // Handle Error objects
    if (message instanceof Error) {
      meta.stack = message.stack;
      message = message.message;
    }
    this.log('error', message, meta);
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  info(message, meta = {}) {
    this.log('info', message, meta);
  }

  debug(message, meta = {}) {
    this.log('debug', message, meta);
  }

  // HTTP request logger middleware
  httpLogger() {
    return (req, res, next) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
          userAgent: req.get('User-Agent'),
          ip: req.ip || req.connection.remoteAddress
        };

        if (res.statusCode >= 400) {
          this.warn(`HTTP ${res.statusCode} - ${req.method} ${req.url}`, logData);
        } else {
          this.info(`HTTP ${res.statusCode} - ${req.method} ${req.url}`, logData);
        }
      });

      next();
    };
  }
}

module.exports = new Logger();