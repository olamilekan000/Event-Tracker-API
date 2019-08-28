import { Router } from 'express'

import { ActorController } from '../controllers/Actor'
import { EventController } from '../controllers/Event'

const router = Router()

router.route('/actors')
	.post(ActorController.saveActor)  // register an actor
	.get(ActorController.getAllActors)  // rank by events
	.put(ActorController.editAnActor)  // get all actor

router.route('/actors/:id')	
	.get(ActorController.getAnActor)  // get an actor
	.delete(ActorController.deleteAnActor)  // delete an actor

router.route('/events')	
	.post(EventController.createEvent)  // Create an event
	.get(EventController.getAllEvents)  // get all events

router.route('/events/actors/:actorID')
	.get(EventController.getPostByAnActor)  // Create an event

router.route('/erase')	
	.get(EventController.eraseAllEvents)  // delete all events

export default router
