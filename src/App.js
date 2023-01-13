import React, { useState } from 'react';
import './App.css';

function App() {
  const [player1, setPlayer1] = useState({
    name: '',
    gender: '',
    score: 0,
    wins: 0,
    losses: 0
  });
  const [player2, setPlayer2] = useState({
    name: '',
    gender: '',
    score: 0,
    wins: 0,
    losses: 0
  });
const [player1Name, setPlayer1Name] = useState('');
const [player1Gender, setPlayer1Gender] = useState('');
const [player2Name, setPlayer2Name] = useState('');
const [player2Gender, setPlayer2Gender] = useState('');

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const handleRoll = (player) => {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (player === 1) {
      setPlayer1({ ...player1, score: player1.score + roll });
    } else {
      setPlayer2({ ...player2, score: player2.score + roll });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayer1({ ...player1, name: player1Name, gender: player1Gender });
    setPlayer2({ ...player2, name: player2Name, gender: player2Gender });
  };

  const handleEndTurn = () => {
    if (currentPlayer === 1) {
      if (player1.score >= 20) {
        setGameOver(true);
        setWinner('Player 1');
        setPlayer1({ ...player1, wins: player1.wins + 1 });
        setPlayer2({ ...player2, losses: player2.losses + 1 });
      } else {
        setCurrentPlayer(2);
      }
    } else {
      if (player2.score >= 20) {
        setGameOver(true);
        setWinner('Player 2');
        setPlayer2({ ...player2, wins: player2.wins + 1 });
        setPlayer1({ ...player1, losses: player1.losses + 1 });
      } else {
        setCurrentPlayer(1);
      }
    }
  };

  const handleRestart = () => {
    setPlayer1({ name: '', gender: '', score: 0, wins: player1.wins, losses: player1.losses });
    setPlayer2({ name: '', gender: '', score: 0, wins: player2.wins, losses: player2.losses });
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner('');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Player 1 Name:
          <input type="text" name="player1Name" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)}/>
        </label>
        <label>
          Player 1 Gender:
          <input type="text" name="player1Gender" value={player1Gender} onChange={(e) => setPlayer1Gender(e.target.value)} />
        </label>
        <br />
        <label>
          Player 2 Name:
          <input type="text" name="player2Name" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} />
        </label>
        <label>
          Player 2 Gender:
          <input type="text" name="player2Gender" value={player2Gender} onChange={(e) => setPlayer2Gender(e.target.value)} />
        </label>
        <br />
        <button type="submit" className='submit_button'>Start Game</button>
      </form>
      {player1.name !== '' && player2.name !== '' ? (
        <div >
         <div className='playerBoard'>
         <div>
         <h2>Player 1</h2>
          <p>Name: {player1.name}</p>
          <p>Gender: {player1.gender}</p>
          <p>Score: {player1.score}</p>
          <p>Wins: {player1.wins}</p>
          <p>Losses: {player1.losses}</p>
          <button className='roll_dice' onClick={() => handleRoll(1)} disabled={currentPlayer !== 1 || gameOver}>
            Roll Dice
          </button>
         </div>
          <div>
          <h2>Player 2</h2>
          <p>Name: {player2.name}</p>
          <p>Gender: {player2.gender}</p>
          <p>Score: {player2.score}</p>
          <p>Wins: {player2.wins}</p>
          <p>Losses: {player2.losses}</p>
          <button className='roll_dice'onClick={() => handleRoll(2)} disabled={currentPlayer !== 2 || gameOver}>
            Roll Dice
          </button>
          </div>
         </div>
          <button className='end_turn' onClick={handleEndTurn} disabled={gameOver}>
            End Turn
          </button>
          {gameOver && <h2>{winner} wins!</h2>}
          <button className='submit_button' onClick={handleRestart}>Restart Game</button>
        </div>
      ) : (
        <p>Enter player details to start the game</p>
      )}
    </div>
  );
}

export default App;

