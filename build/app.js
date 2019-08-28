"use strict";

var _server = _interopRequireDefault(require("./server/server"));

var _winston = _interopRequireDefault(require("./server/config/winston"));

var _port = _interopRequireDefault(require("./server/config/port"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server.default.listen(_port.default, () => {
  _winston.default.info(`Server now listening for requests at port ${_port.default}`);
});