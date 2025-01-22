export interface User {
  id: number;
  score: number;
  prizes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClickResult {
  points: number;
  prize: number;
}

export interface ApiResponse {
  success: boolean;
  points?: number;
  prize?: number;
  totalScore?: number;
  totalPrizes?: number;
  error?: string;
} 