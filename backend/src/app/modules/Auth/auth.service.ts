import mongoose from 'mongoose';
import config from '../../config';
import { TLoginUser, TUser } from './auth.interface';
import { User } from './auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

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
  if (await User.isUserExits(userData.number.toString())) {
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

const sendMoneyIntoDB = async (
  userId: string,
  receiverNumber: number,
  amount: number,
  reference: string,
) => {
  const user = await User.findById(userId);
  const receiver = await User.findOne({
    number: receiverNumber,
    isVerified: true,
  });
  const admin = await User.findOne({ role: 'admin' });

  if (!user || !receiver || !admin) {
    throw new Error('User, agent, or admin not found');
  }

  // Use nullish coalescing to ensure balance is not undefined
  const userBalance = user.balance ?? 0;

  // Check if user has enough balance
  if (userBalance < amount) {
    throw new Error('Insufficient balance');
  }

  // Initialize charge to 0 and check if amount is >= 100 for the charge
  let charge = 0;
  if (amount >= 100) {
    charge = 5;
  }

  const transactionId = uuidv4();

  // Update balances for user, receiver, and admin
  const userUpdate = await User.updateOne(
    { _id: user._id },
    {
      $inc: { balance: -amount - charge }, // Deduct amount and charge from user balance
      $push: {
        transactions: {
          transactionType: 'send money',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: charge,
          agentNumber: receiver.number,
          reference,
        },
      },
    },
  );

  const receiverUpdate = await User.updateOne(
    { _id: receiver._id },
    {
      $inc: { balance: amount }, // Add amount to receiver balance
      $push: {
        transactions: {
          transactionType: 'send money',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: charge,
          agentNumber: receiver.number,
          reference,
        },
      },
    },
  );

  const adminUpdate = await User.updateOne(
    { _id: admin._id },
    {
      $inc: { balance: charge }, // Add charge to admin balance if applicable
      $push: {
        transactions: {
          transactionType: 'send money',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: charge,
          agentNumber: receiver.number,
          reference,
        },
      },
    },
  );

  // Check if all updates were successful
  if (
    !userUpdate.modifiedCount ||
    !receiverUpdate.modifiedCount ||
    !adminUpdate.modifiedCount
  ) {
    throw new Error('Failed to update balances');
  }

  // Return the transaction details
  return {
    transactions: {
      transactionId: transactionId,
      transactionAmount: amount,
      chargeAmount: charge,
      agentNumber: receiver.number,
      reference,
      transactionType: 'send money',
    },
  };
};

const cashOutIntoDB = async (
  userId: string,
  receiverNumber: number,
  amount: number,
) => {
  const user = await User.findById(userId);
  const receiver = await User.findOne({
    number: receiverNumber,
    isVerified: true,
    role: 'agent',
  });
  const admin = await User.findOne({ role: 'admin' });

  if (!user || !receiver || !admin) {
    throw new Error('User, agent, or admin not found');
  }

  // Use nullish coalescing to ensure balance is not undefined
  const userBalance = user.balance ?? 0;

  // Check if user has enough balance
  if (userBalance < amount) {
    throw new Error('Insufficient balance');
  }

  // Calculate charges for cashout
  const userCharge = amount * 0.015; // 1.5% charge on user for cashout
  const agentCharge = amount * 0.01; // 1% of amount is added to agent's balance
  const adminCharge = amount * 0.005; // 0.5% of amount is added to admin's balance

  // Generate a unique transaction ID
  const transactionId = uuidv4();

  // Update balances for user, receiver (agent), and admin
  const userUpdate = await User.updateOne(
    { _id: user._id },
    {
      $inc: { balance: -(amount + userCharge) }, // Deduct amount + user charge from user balance
      $push: {
        transactions: {
          transactionType: 'cash out',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: userCharge,
          agentNumber: receiver.number,
        },
      },
    },
  );

  const receiverUpdate = await User.updateOne(
    { _id: receiver._id },
    {
      $inc: { balance: agentCharge }, // Add agent's charge (1% of amount)
      $push: {
        transactions: {
          transactionType: 'cash out',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: agentCharge,
          agentNumber: receiver.number,
        },
      },
    },
  );

  const adminUpdate = await User.updateOne(
    { _id: admin._id },
    {
      $inc: { balance: adminCharge }, // Add admin's charge (0.5% of amount)
      $push: {
        transactions: {
          transactionType: 'cash out',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: adminCharge,
          agentNumber: receiver.number,
        },
      },
    },
  );

  // Check if all updates were successful
  if (
    !userUpdate.modifiedCount ||
    !receiverUpdate.modifiedCount ||
    !adminUpdate.modifiedCount
  ) {
    throw new Error('Failed to update balances');
  }

  // Return the transaction details
  return {
    transactions: {
      transactionId: transactionId,
      transactionAmount: amount,
      chargeAmount: userCharge, // User's charge is returned
      agentChargeAmount: agentCharge, // Agent's charge is returned
      adminChargeAmount: adminCharge, // Admin's charge is returned
      agentNumber: receiver.number,
      transactionType: 'cash out',
    },
  };
};

const cashInIntoDB = async (
  userId: string,
  receiverNumber: number,
  amount: number,
) => {
  const user = await User.findById(userId);
  const receiver = await User.findOne({
    number: receiverNumber,
    isVerified: true,
    role: 'user',
  });
  const admin = await User.findOne({ role: 'admin' });

  if (!user || !receiver || !admin) {
    throw new Error('User, receiver, or admin not found');
  }

  // Use nullish coalescing to ensure balance is not undefined
  const userBalance = user.balance ?? 0;

  // Check if user has enough balance (in case you're using this for a deduction system)
  if (userBalance < amount) {
    throw new Error('Insufficient balance');
  }

  // No charges for cash-in transaction
  const transactionId = uuidv4();

  // Update balances for user, receiver, and admin (without any charges)
  const userUpdate = await User.updateOne(
    { _id: user._id },
    {
      $inc: { balance: -amount }, // Add amount to user's balance
      $push: {
        transactions: {
          transactionType: 'cash in',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: 0, // No charge for cash in
          agentNumber: receiver.number,
        },
      },
    },
  );

  const receiverUpdate = await User.updateOne(
    { _id: receiver._id },
    {
      $inc: { balance: amount }, // No change to receiver's balance for cash-in
      $push: {
        transactions: {
          transactionType: 'cash in',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: 0, // No charge for receiver in cash-in
          agentNumber: receiver.number,
        },
      },
    },
  );

  const adminUpdate = await User.updateOne(
    { _id: admin._id },
    {
      $inc: { balance: 0 }, // No charge for admin in cash-in
      $push: {
        transactions: {
          transactionType: 'cash in',
          transactionId: transactionId,
          transactionAmount: amount,
          chargeAmount: 0, // No charge for admin in cash-in
          agentNumber: receiver.number,
        },
      },
    },
  );

  // Check if all updates were successful
  if (
    !userUpdate.modifiedCount ||
    !receiverUpdate.modifiedCount ||
    !adminUpdate.modifiedCount
  ) {
    throw new Error('Failed to update balances');
  }

  // Return the transaction details
  return {
    transactions: {
      transactionId: transactionId,
      transactionAmount: amount,
      chargeAmount: 0, // No charge for cash-in
      agentNumber: receiver.number,
      transactionType: 'cash in',
    },
  };
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
  sendMoneyIntoDB,
  cashOutIntoDB,
  cashInIntoDB,
};
