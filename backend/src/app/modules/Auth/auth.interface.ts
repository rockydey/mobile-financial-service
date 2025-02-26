import { Model } from 'mongoose';

export type TTransaction = {
  transactionId: string;
  transactionAmount: number;
  chargeAmount?: number;
  agentNumber: number;
  reference?: string;
  transactionType?: string;
};

export type TSendMoney = {
  receiverNumber: number;
  amount: number;
  reference?: string;
};

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
  isBlocked?: boolean;
  transactions?: TTransaction[];
};

export interface UserModel extends Model<TUser> {
  isUserExits(email: string): Promise<TUser | null>;
}
