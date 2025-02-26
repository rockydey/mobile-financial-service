import express from 'express';
import { UserController } from './auth.controller';
import { authenticateToken } from './auth.middleware';

const router = express.Router();

router.post('/auth/register', UserController.register);

router.post('/auth/login', UserController.login);

router.get('/agents', authenticateToken, UserController.allAgents);

router.get('/users', authenticateToken, UserController.allUsers);

router.get('/verify-agent', authenticateToken, UserController.verifyAgent);

router.patch(
  '/verify-agent/:agentId',
  authenticateToken,
  UserController.approveAgent,
);

router.patch(
  '/block-user/:userId',
  authenticateToken,
  UserController.blockUser,
);

router.delete(
  '/delete-user/:userId',
  authenticateToken,
  UserController.deleteUser,
);

router.get('/auth/me', authenticateToken, UserController.getLoginUser);

export const UserRoutes = router;
