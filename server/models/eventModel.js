import { Document } from 'camo'

import Actor from './actorModel'
import Repo from './repoModel'

class Event extends Document {
	constructor() {
		super();

    this.type = String;
    this.actor = Actor;
    this.repo = Repo;
    this.created_at = {
      type: Date,
      default: Date()
    };    		
	}
  static collectionName() {
      return 'events';
  }	
}

export default Event
