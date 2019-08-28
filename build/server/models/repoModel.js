"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _camo = require("camo");

class Repo extends _camo.Document {
  constructor() {
    super();
    this.name = String;
    this.url = String;
    this.created_at = {
      type: Date,
      default: Date()
    };
  }

  static collectionName() {
    return 'repos';
  }

}

var _default = Repo;
exports.default = _default;