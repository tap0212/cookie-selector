import { ClickResult } from '../types';

export const calculateClick = (): ClickResult => {
  const bonusPoints = Math.random() < 0.5 ? 10 : 1;
  const prize = Math.random() < 0.25 ? 1 : 0;
  
  return { points: bonusPoints, prize };
}; 