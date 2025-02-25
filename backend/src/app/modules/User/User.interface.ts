import { Model } from 'mongoose';

export type TUser = {
  name: string;
  pin: string;
  number: number;
  balance?: number;
  email: string;
  role: string;
  nid: number;
};

export interface UserModel extends Model<TUser> {
  isUserExits(_id: string): Promise<TUser | null>;
}
