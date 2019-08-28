"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _camo = require("camo");

var _actorModel = _interopRequireDefault(require("./actorModel"));

var _repoModel = _interopRequireDefault(require("./repoModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Event extends _camo.Document {
  constructor() {
    super();
    this.type = String;
    this.actor = _actorModel.default;
    this.repo = _repoModel.default;
    this.created_at = {
      type: Date,
      default: Date()
    };
  }

  static collectionName() {
    return 'events';
  }

}

var _default = Event;
exports.default = _default;