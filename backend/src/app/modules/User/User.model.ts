import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  nid: {
    type: Number,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.balance =
    user.role === 'user' ? 40 : user.role === 'agent' ? 100000 : 10000000;

  user.pin = await bcrypt.hash(user.pin, Number(config.bcrypt_salt_rounds));

  next();
});

userSchema.statics.isUserExits = async function (_id: string) {
  const existingUser = await User.findOne({ _id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
