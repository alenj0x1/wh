import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    if (!MONGODB_URI) throw new Error('The MongoDB URI is not argumented');

    mongoose
      .connect(MONGODB_URI)
      .then(() => console.log('Connected to database correctly'))
      .catch((err) => console.log('Database connection with errors: ', err));
  }
}

export default new Database();
