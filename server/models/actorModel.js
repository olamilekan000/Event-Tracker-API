import { Document } from 'camo'

class Actor extends Document {
  constructor() {
    super();

    this.name = String;
    this.email = String;
    this.login = String;
    this.avatar_url = String
    this.created_at = {
      type: Date,
      default: Date()
    };
  }

  static collectionName() {
    return 'actors';
  }
}

export default Actor