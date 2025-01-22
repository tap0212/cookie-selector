import User from '../models/User';
import { User as UserType } from '../types';

export const updateScore = async (
  userId: number, 
  points: number, 
  prize: number
): Promise<UserType> => {
  const user = await User.findByPk(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  user.score += points;
  user.prizes += prize;
  await user.save();
  
  return user.toJSON();
};

export const getUserStats = async (userId?: number): Promise<UserType> => {
  if (userId) {
    const user = await User.findByPk(userId);
    if (user) {
      return user.toJSON();
    }
  }
  
  return (await User.create({ score: 0, prizes: 0 })).toJSON();
};

export const createUser = async (): Promise<UserType> => {
  try {
    const newUser = await User.create({
      score: 0,
      prizes: 0
    });
    return newUser.toJSON();
  } catch (error) {
    throw new Error('Failed to create new user');
  }
}; 