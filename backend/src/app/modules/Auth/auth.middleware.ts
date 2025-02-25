import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

// Middleware to authenticate JWT
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(403).json({ message: 'Access denied, token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret as string) as {
      id: string;
      role: string;
    };
    req.user = decoded;
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Invalid token' });
  }
};

// // Middleware to authorize role-based access
// export const authorizeRole = (roles: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user || !roles === req.user.role) {
//       return res.status(403).json({
//         message: 'Forbidden: You do not have access to this resource.',
//       });
//     }
//     next();
//   };
// };
