import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const transactionSchema = new Schema({
  transactionId: { type: String, required: true },
  transactionAmount: { type: Number, required: true },
  chargeAmount: { type: Number, default: 0, required: false },
  agentNumber: { type: Number, required: true },
  reference: { type: String, required: false },
  transactionType: { type: String, required: false },
});

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
  isVerified: {
    type: Boolean,
    required: false,
  },
  isBlocked: {
    type: Boolean,
    required: false,
  },
  transactions: [transactionSchema],
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.balance = user.role === 'user' ? 40 : 0;

  user.isBlocked = false;

  user.isVerified = user.role === 'agent' ? false : true;

  user.pin = await bcrypt.hash(user.pin, Number(config.bcrypt_salt_rounds));

  next();
});

userSchema.statics.isUserExits = async function (number: string) {
  const value = Number(number);
  const existingUser = await User.findOne({
    number: value,
  });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
