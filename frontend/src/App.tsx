import React from 'react';
import ClickButton from './components/ClickButton';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cookie Clicker Game</h1>
        <p>Click the button to earn points and win prizes!</p>
      </header>
      <main className="App-main">
        <ClickButton />
      </main>
      <footer className="App-footer">
        <p>Keep clicking to earn more rewards!</p>
      </footer>
    </div>
  );
};

export default App; 