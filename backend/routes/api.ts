import { Router, Request, Response } from 'express';
import { calculateClick } from '../jobs/clickHandler';
import { updateScore, getUserStats, createUser } from '../jobs/scoreHandler';
import { ApiResponse, User } from '../types';

const router = Router();

router.post('/click', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { userId } = req.body;
    const { points, prize } = calculateClick();
    const updatedUser = await updateScore(userId, points, prize);
    
    res.json({
      success: true,
      points,
      prize,
      totalScore: updatedUser.score,
      totalPrizes: updatedUser.prizes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

router.get('/user/:userId?', async (req: Request, res: Response<User | ApiResponse>) => {
  try {
    const userId = req.params.userId ? parseInt(req.params.userId) : undefined;
    const user = await getUserStats(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

router.post('/user', async (_req: Request, res: Response<User | ApiResponse>) => {
  try {
    const newUser = await createUser();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router; 