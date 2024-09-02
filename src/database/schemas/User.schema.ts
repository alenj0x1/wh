import mongoose, { SchemaTypes } from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
    validate: (value: string) => {
      return validator.isStrongPassword(value);
    },
  },
});

export default mongoose.model('User', userSchema);
