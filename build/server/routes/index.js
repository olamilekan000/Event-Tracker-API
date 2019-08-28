"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Actor = require("../controllers/Actor");

var _Event = require("../controllers/Event");

const router = (0, _express.Router)();
router.route('/actors').post(_Actor.ActorController.saveActor) // register an actor
.get(_Actor.ActorController.getAllActors) // rank by events
.put(_Actor.ActorController.editAnActor); // get all actor

router.route('/actors/:id').get(_Actor.ActorController.getAnActor) // get an actor
.delete(_Actor.ActorController.deleteAnActor); // delete an actor

router.route('/events').post(_Event.EventController.createEvent) // Create an event
.get(_Event.EventController.getAllEvents); // get all events

router.route('/events/actors/:actorID').get(_Event.EventController.getPostByAnActor); // Create an event

router.route('/erase').get(_Event.EventController.eraseAllEvents); // delete all events

var _default = router;
exports.default = _default;