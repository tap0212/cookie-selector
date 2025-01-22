import React, { useState, useEffect } from 'react';
import '../styles/ClickButton.css';
import { usePersistedState } from '../utils/usePersistedState';

interface GameState {
  score: number;
  prizes: number;
}

interface ApiResponse {
  success: boolean;
  points?: number;
  prize?: number;
  totalScore?: number;
  totalPrizes?: number;
  error?: string;
}

const ClickButton: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    prizes: 0
  });
  const [userId, setUserId] = usePersistedState<number | null>('userId', null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeGameState = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (userId) {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          await initializeNewUser();
          return;
        }
        
        const data = await response.json().catch(() => null);
        
        if (data && 'id' in data) {
          setUserId(data.id);
          setGameState({
            score: data.score ?? 0,
            prizes: data.prizes ?? 0
          });
        } else {
          await initializeNewUser();
        }
      } else {
        await initializeNewUser();
      }
    } catch (error) {
      await initializeNewUser();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {    
    initializeGameState();
  }, []);


  const initializeNewUser = async (): Promise<void> => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to create new user');
      }

      const data = await response.json();
      
      if (data && 'id' in data) {
        setUserId(data.id);
        setGameState({
          score: data.score ?? 0,
          prizes: data.prizes ?? 0
        });
      }
    } catch (error) {
      console.error('Error initializing new user:', error);
    }
  };

  const handleClick = async (): Promise<void> => {
    if (!userId) return;
    
    try {
      const response = await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      const data: ApiResponse = await response.json().catch(() => ({ success: false }));
      
      if (data.success && typeof data.totalScore === 'number' && typeof data.totalPrizes === 'number') {
        setGameState({
          score: data.totalScore,
          prizes: data.totalPrizes
        });
        
        if (data.points === 10) {
          alert('Bonus! +10 points!');
        } else if (data.prize === 1) {
          alert('Congratulations! You won a prize!');
        }
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  return (
    <div className="click-button-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="stats">
            <p>Score: {gameState.score}</p>
            <p>Prizes: {gameState.prizes}</p>
          </div>
          <button 
            onClick={handleClick}
            disabled={isLoading}
            className="click-button"
          >
            Click Me!
          </button>
        </>
      )}
    </div>
  );
};

export default ClickButton; 