import config from '../../config';
import { TLoginUser, TUser } from './auth.interface';
import { User } from './auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwtToken = (
  userId: string,
  email: string,
  role: string,
): string => {
  const payload = { userId, email, role };

  const options: jwt.SignOptions = {
    expiresIn: '1h',
  };

  const token = jwt.sign(payload, config.jwt_secret as string, options);

  return token;
};

const registerUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExits(userData.email as string)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
  const token = generateJwtToken(
    result._id.toString(),
    result.email,
    result.role,
  );
  return { user: result, token };
};

const loginUserIntoDB = async (userData: TLoginUser) => {
  const { email, number, pin } = userData;

  if (!email && !number) {
    throw new Error('Please provide either email or number');
  }

  const query = email ? { email } : { number };
  const user = await User.findOne(query);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isVerified === false) {
    throw new Error('Please wait for admin approval');
  }
  const isPinValid = await bcrypt.compare(pin, user.pin);
  if (!isPinValid) {
    throw new Error('Invalid login credentials');
  }
  const token = generateJwtToken(user._id.toString(), user.email, user.role);

  return { user, token };
};

export const UserService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
