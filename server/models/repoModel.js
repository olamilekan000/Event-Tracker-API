import { Document } from 'camo'

class Repo extends Document {
  constructor() {
    super();

    this.name = String;
    this.url = String
    this.created_at = {
      type: Date,
      default: Date()
    };    
  }

  static collectionName() {
    return 'repos';
  }
}

export default Repo