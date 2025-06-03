import { Router, Request, Response } from 'express';
import userRoutes from './user.routes';

const router = Router();

const welcomeHandler = (req: Request, res: Response): void => {
  res.json({
    status: 'success',
    message: 'Welcome to the API'
  });
};

// Routes
router.get('/', welcomeHandler);
router.use('/users', userRoutes);

export default router; 