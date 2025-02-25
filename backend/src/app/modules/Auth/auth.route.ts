import express from 'express';
import { UserController } from './auth.controller';
import { authenticateToken } from './auth.middleware';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/agents', authenticateToken, UserController.allAgents);

router.patch('/agent/:agentId', authenticateToken, UserController.approveAgent);

export const UserRoutes = router;
