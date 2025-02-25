import { TUser } from './User.interface';
import { User } from './User.model';

const registerUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExits(userData.email as string)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
  return result;
};

export const UserService = {
  registerUserIntoDB,
};
