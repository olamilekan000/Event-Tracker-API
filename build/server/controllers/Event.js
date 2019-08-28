"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventController = void 0;

var _eventModel = _interopRequireDefault(require("../models/eventModel"));

var _actorModel = _interopRequireDefault(require("../models/actorModel"));

var _repoModel = _interopRequireDefault(require("../models/repoModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EventController = {
  createEvent: async (req, res, next) => {
    try {
      const {
        id,
        actor,
        repo
      } = req.body;
      const post = await _eventModel.default.findOne({
        _id: id
      });
      const actorMakingPost = await _actorModel.default.findOne({
        _id: actor.id
      });
      const repoUse = await _eventModel.default.findOne({
        _id: repo.id
      });

      if (post) {
        return res.status(409).json({
          error: "Event already exist"
        });
      } // if (!actorMakingPost || !repoUse) {
      // 	return res
      // 		.status(400)
      // 		.json({
      // 			error: "User or repo doesn't exist"
      // 		})		
      // }


      const newEvent = _eventModel.default.create(req.body);

      const newEventActor = _actorModel.default.create(req.body.actor);

      const newEventRepo = _repoModel.default.create(req.body.repo);

      newEvent.actor = await newEventActor.save();
      newEvent.repo = await newEventRepo.save();
      let savedEvent = await newEvent.save();
      return res.status(201).json({
        message: "User Successfully registrede",
        data: savedEvent
      });
    } catch (err) {
      next(err);
    }
  },
  getAllEvents: async (req, res, next) => {
    try {
      const events = await _eventModel.default.find({}, {
        populate: true,
        sort: '-_id'
      });
      return res.status(200).json({
        data: events
      });
    } catch (err) {
      next(err);
    }
  },
  eraseAllEvents: async (req, res, next) => {
    try {
      await _eventModel.default.deleteMany({});
      return res.status(200).json({
        data: {}
      });
    } catch (err) {
      next(err);
    }
  },
  getPostByAnActor: async (req, res, next) => {
    try {
      const {
        actorID
      } = req.params;
      const actor = await _actorModel.default.findOne({
        _id: actorID
      });

      if (!actor) {
        return res.status(404).json({
          message: "Actor doesn't exist",
          error: "Not found"
        });
      }

      const events = await _eventModel.default.find({}, {
        populate: true,
        sort: '-_id'
      });
      const eventsByAnAuthor = events.filter(event => {
        const newEvent = JSON.parse(JSON.stringify(event));
        return newEvent["actor"]["_id"] === actorID;
      });
      return res.status(200).json({
        data: eventsByAnAuthor
      });
    } catch (err) {
      next(err);
    }
  }
};
exports.EventController = EventController;