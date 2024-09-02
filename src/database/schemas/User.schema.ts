import mongoose, { SchemaTypes } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
  role: {
    type: SchemaTypes.Number,
    required: true,
    default: 2,
  },
});

export default mongoose.model('User', userSchema);
