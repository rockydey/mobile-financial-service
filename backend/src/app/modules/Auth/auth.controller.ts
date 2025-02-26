import { Request, Response } from 'express';
import { userValidationSchema } from './auth.validation';
import { UserService } from './auth.service';

const register = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserService.registerUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: `${result.user.role} account created successfully`,
      data: { user: result.user, token: result.token },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, number, pin } = req.body;

    const userData = { email, number, pin };
    const result = await UserService.loginUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: { user: result.user, token: result.token },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error.message || 'Something went wrong';

    // Check if the error is user-related and set the appropriate status code
    const statusCode =
      errorMessage === 'User not found' ||
      errorMessage === 'Invalid login credentials'
        ? 400
        : 500;

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

const allAgents = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      throw new Error('Forbidden: You do not have the necessary permissions');
    }

    const agents = await UserService.getAllAgentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Agents fetched successfully',
      data: agents,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const allUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      throw new Error('Forbidden: You do not have the necessary permissions');
    }

    const users = await UserService.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Agents fetched successfully',
      data: users,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const approveAgent = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      throw new Error('Forbidden: You do not have the necessary permissions');
    }
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token is required');
    }

    const agentId = req.params.agentId;
    const updatedAgent = await UserService.updateAgentIntoDB(agentId, token);

    res.status(200).json({
      success: true,
      message: 'Agent approved successfully',
      data: updatedAgent,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const verifyAgent = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      throw new Error('Forbidden: You do not have the necessary permissions');
    }

    const agents = await UserService.getAllUnverifiedUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Agents fetched successfully',
      data: agents,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const getLoginUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token is required');
    }

    const user = await UserService.getLoginUserFromDB(token);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
      data: null,
    });
  }
};

const blockUser = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      throw new Error('Forbidden: You do not have the necessary permissions');
    }
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token is required');
    }

    const userId = req.params.userId;
    const updatedAgent = await UserService.updateUserBlockIntoDB(userId);

    res.status(200).json({
      success: true,
      message: 'Agent blocked successfully',
      data: updatedAgent,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      throw new Error('Forbidden: You do not have the necessary permissions');
    }
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token is required');
    }

    const userId = req.params.userId;
    const deleteUser = await UserService.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deleteUser,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const sendMoney = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token is required');
    }

    const { userId, amount, receiverNumber, reference } = req.body;

    if (!userId || !receiverNumber || !amount || amount <= 0) {
      throw new Error('Invalid parameters');
    }

    const result = await UserService.sendMoneyIntoDB(
      userId,
      receiverNumber,
      amount,
      reference,
    );

    res.status(200).json({
      success: true,
      message: 'Send Money successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const cashOut = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token is required');
    }

    const { userId, amount, receiverNumber } = req.body;

    if (!userId || !receiverNumber || !amount || amount <= 0) {
      throw new Error('Invalid parameters');
    }

    const result = await UserService.cashOutIntoDB(
      userId,
      receiverNumber,
      amount,
    );

    res.status(200).json({
      success: true,
      message: 'Send Money successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

const cashIn = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token is required');
    }

    const { userId, amount, receiverNumber } = req.body;

    if (!userId || !receiverNumber || !amount || amount <= 0) {
      throw new Error('Invalid parameters');
    }

    const result = await UserService.cashInIntoDB(
      userId,
      receiverNumber,
      amount,
    );

    res.status(200).json({
      success: true,
      message: 'Send Money successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
};

export const UserController = {
  register,
  login,
  allAgents,
  approveAgent,
  getLoginUser,
  verifyAgent,
  allUsers,
  blockUser,
  deleteUser,
  sendMoney,
  cashOut,
  cashIn,
};
