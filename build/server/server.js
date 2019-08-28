"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _nedb = _interopRequireDefault(require("nedb"));

var _camo = require("camo");

var _routes = _interopRequireDefault(require("./routes"));

var _winston = _interopRequireDefault(require("./config/winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const app = (0, _express.default)();
const BASE_URI = '/api/v1';
const URI = 'nedb://Users\ASUS\Desktop\Repos\Event-Tracker-API\server\db';
(0, _camo.connect)(URI).then(function (db) {
  _winston.default.info(`Now connected to the database ${db}`);
});
app.use((0, _morgan.default)('dev'));
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use(_bodyParser.default.json({
  limit: '50mb'
}));
app.use(_bodyParser.default.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(BASE_URI, _routes.default);
app.get('/', (req, res) => {
  res.json({
    message: 'app now live'
  });
});
app.use((err, req, res, next) => {
  _winston.default.info(`${err}`);

  res.status(500).json({
    error: err,
    message: 'Internal server error!'
  });
});
var _default = app;
exports.default = _default;