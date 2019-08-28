import Actor from '../models/actorModel'
import Event from '../models/eventModel'

export const ActorController = {
	saveActor: async (req, res, next) => {
		try {

			const user = await Actor
				.findOne({ email: req.body.email })

			if (user) {
				return res
					.status(409)
					.json({
						message: "User already exists",
						error: "Conflict"
					})
			}

			const newActor = Actor.create(req.body)
			const savedActor = await newActor.save()
			return res
				.status(200)
				.json({
					message: "User Successfully registrede",
					data: savedActor
				})
		} catch(err) {
			next(err)
		}
	},
	getAllActors: async (req, res, next) => {
		try{
			const actors = await Actor.find({}, {sort: '-_id'})
			const events = await Event
				.find({}, {populate: true})

			const parsedEvents = JSON.parse(JSON.stringify(events))
			const parsedActors = JSON.parse(JSON.stringify(actors))

			for (let a = 0; a < parsedActors.length; a+=1) {
				const eventsByAnAuthor = parsedEvents.filter((event) => {
					return event["actor"]["_id"] === parsedActors[a]["_id"]
				})
				parsedActors[a].numberOfPosts = eventsByAnAuthor.length
			}

			const sortedUsers = parsedActors.sort((a, b) => {
				return b.numberOfPosts - a.numberOfPosts
			})

			return res
				.status(200)
				.json({
					data: sortedUsers
				})			
		}catch(err) {
			next(err)
		}
	},
	deleteAnActor: async (req, res, next) => {
		try {
			const { id } = req.params
			await Actor.deleteOne({_id: id})
			return res
				.status(200)
				.json({
					message: "Actor deleted Successfully",
					data: {}
				})				
		} catch(err) {
			next(err)
		}
	},
	getAnActor: async (req, res, next) => {
		try {
			const { id } = req.params
			console.log(id)
			const actor = await Actor
				.findOne({ _id: id })
			if (!actor) {
				return res
					.status(404)
					.json({
						message: "Actor doesn't exist",
						error: "Not found"
					})				
			}
			return res
				.status(200)
				.json({
					data: actor
				})		
		} catch(err) {
			next(err)
		}
	},
	editAnActor: async (req, res, next) => {
		try {
			const { email } = req.body
			const user = 	await Actor
				.findOneAndUpdate({ email }, req.body)

			if (!user) {
				return res
					.status(404)
					.json({
						message: "Actor doesn't exist",
						error: "Not found"
					})				
			}

			return res
				.status(200)
				.json({
					message: "User updated Successfully!",
					data: {}
				})			

		} catch(err) {
			next(err)
		}
	}	

}
