import Event from '../models/eventModel'
import Actor from '../models/actorModel'
import Repo from '../models/repoModel'


export const EventController = {
	createEvent: async (req, res, next) => {
		try {
			const { id, actor, repo } = req.body
			const post = await Event.findOne({_id: id})
			const actorMakingPost = await Actor.findOne({_id: actor.id})
			const repoUse = await Event.findOne({_id: repo.id})

			if (post) {
				return res
					.status(409)
					.json({
						error: "Event already exist"
					})					
			}

			// if (!actorMakingPost || !repoUse) {
			// 	return res
			// 		.status(400)
			// 		.json({
			// 			error: "User or repo doesn't exist"
			// 		})		
			// }

			const newEvent = Event.create(req.body)
			const newEventActor = Actor.create(req.body.actor)
			const newEventRepo = Repo.create(req.body.repo)

			newEvent.actor = await newEventActor.save()
			newEvent.repo = await newEventRepo.save()

			let savedEvent = await newEvent.save()

			return res
				.status(201)
				.json({
					message: "User Successfully registrede",
					data: savedEvent
				})			
			
		} catch(err) {
			next(err)
		}
	},
	getAllEvents: async (req, res, next) => {
		try {
			const events = await Event
				.find({}, {populate: true, sort: '-_id'})

			return res
				.status(200)
				.json({
					data: events
				})	

		} catch(err) {
			next(err);
		}
	},
	eraseAllEvents: async (req, res, next) => {
		try {
			await Event.deleteMany({})
			return res
				.status(200)
				.json({
					data: {}
				})			
		} catch(err) {
			next(err)
		}
	},
	getPostByAnActor: async (req, res, next) => {
		try {
			const { actorID } = req.params

			const actor = await Actor.findOne({_id: actorID})
			if (!actor) {
				return res
					.status(404)
					.json({
						message: "Actor doesn't exist",
						error: "Not found"
					})				
			}

			const events = await Event
				.find({}, {populate: true, sort: '-_id'})

			const eventsByAnAuthor = events.filter((event) => {
				const newEvent = JSON.parse(JSON.stringify(event))
				return newEvent["actor"]["_id"] === actorID
			})

			return res
				.status(200)
				.json({
					data: eventsByAnAuthor
				})				

		} catch(err) {
			next(err)
		}
	}
}