"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _camo = require("camo");

class Actor extends _camo.Document {
  constructor() {
    super();
    this.name = String;
    this.email = String;
    this.login = String;
    this.avatar_url = String;
    this.created_at = {
      type: Date,
      default: Date()
    };
  }

  static collectionName() {
    return 'actors';
  }

}

var _default = Actor;
exports.default = _default;