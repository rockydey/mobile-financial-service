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

export const UserController = {
  register,
  login,
};
