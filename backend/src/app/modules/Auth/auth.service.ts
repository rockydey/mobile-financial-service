import mongoose from 'mongoose';
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

  if (user.isBlocked) {
    throw new Error('You have been blocked by admin');
  }

  const isPinValid = await bcrypt.compare(pin, user.pin);
  if (!isPinValid) {
    throw new Error('Invalid login credentials');
  }
  const token = generateJwtToken(user._id.toString(), user.email, user.role);

  return { user, token };
};

const getAllAgentsFromDB = async () => {
  const agents = await User.find({ role: 'agent', isVerified: true }).select(
    '-pin',
  );
  return agents;
};

const getAllUsersFromDB = async () => {
  const agents = await User.find({ role: 'user' }).select('-pin');
  return agents;
};

const updateAgentIntoDB = async (agentId: string, token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret as string) as {
      userId: string;
      email: string;
      role: string;
    };

    const updatedAgent = await User.findByIdAndUpdate(
      agentId,
      { isVerified: true, balance: 1000000 },
      { new: true },
    );

    await User.findByIdAndUpdate(
      decoded.userId,
      { $inc: { balance: -1000000 } },
      { new: true },
    );

    if (!updatedAgent) {
      throw new Error('Agent not found');
    }

    return updatedAgent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Error approving agent');
  }
};

const updateUserBlockIntoDB = async (userId: string) => {
  const updatedAgent = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  if (!updatedAgent) {
    throw new Error('Agent not found');
  }
  return updatedAgent;
};

const deleteUserFromDB = async (userId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const deletedUser = await User.deleteOne({ _id: objectId });

  if (deletedUser.deletedCount === 0) {
    throw new Error('Agent not found');
  }

  return deletedUser;
};

const getLoginUserFromDB = async (token: string) => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as {
      userId: string;
      email: string;
      role: string;
    };

    const user = await User.findById(decoded.userId).select('-pin');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Invalid or expired token');
  }
};

const getAllUnverifiedUsersFromDB = async () => {
  const agents = await User.find({ role: 'agent', isVerified: false }).select(
    'name email number isVerified _id',
  );
  return agents;
};

export const UserService = {
  registerUserIntoDB,
  loginUserIntoDB,
  getAllAgentsFromDB,
  updateAgentIntoDB,
  getLoginUserFromDB,
  getAllUnverifiedUsersFromDB,
  getAllUsersFromDB,
  updateUserBlockIntoDB,
  deleteUserFromDB,
};
