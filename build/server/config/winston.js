"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define custom settings for each transport file (file,console);
const options = {
  file: {
    filename: `${_appRootPath.default}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}; // instantiate a new Winston Logger with the settings defined above

const logger = _winston.default.createLogger({
  transports: [new _winston.default.transports.File(options.file), new _winston.default.transports.Console(options.console)],
  exitOnError: false // do not exit on handled exceptions

}); // create a stream object with a 'write' function


logger.stream = {
  write(message) {
    /** use the 'info' log level so the output will be
        picked up by both transports (file and console) * */
    logger.info(message);
  }

};
var _default = logger;
exports.default = _default;