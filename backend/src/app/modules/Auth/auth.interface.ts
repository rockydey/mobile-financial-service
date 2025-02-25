import { Model } from 'mongoose';

export type TLoginUser = {
  email?: string;
  number?: number;
  pin: string;
};

export type TUser = {
  name: string;
  pin: string;
  number: number;
  balance?: number;
  email: string;
  role: string;
  nid: number;
  isVerified?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExits(email: string): Promise<TUser | null>;
}
