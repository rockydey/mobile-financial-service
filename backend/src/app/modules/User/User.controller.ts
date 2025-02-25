import { Request, Response } from 'express';
import { userValidationSchema } from './User.validation';
import { UserService } from './User.service';

const register = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserService.registerUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: `${result.role} account created successfully`,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

export const UserController = {
  register,
};
