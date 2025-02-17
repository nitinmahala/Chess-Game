import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import { Crown, User } from 'lucide-react';

function App() {
  const [players, setPlayers] = useState<{ white: string; black: string } | null>(null);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1Name && player2Name) {
      // Randomly assign colors to players
      const isPlayer1White = Math.random() > 0.5;
      setPlayers({
        white: isPlayer1White ? player1Name : player2Name,
        black: isPlayer1White ? player2Name : player1Name
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 animate-gradient flex flex-col">
      <header className="w-full py-6 glass-dark">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Crown className="w-8 h-8 text-purple-300 mr-3 animate-bounce" />
          <h1 className="text-3xl font-bold text-purple-300">Chess Game</h1>
        </div>
      </header>
      
      <div className="flex-grow flex items-center justify-center p-4">
        {!players ? (
          <div className="glass-dark p-8 rounded-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-purple-300 mb-6 text-center">Enter Player Names</h2>
            <form onSubmit={handleStartGame} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-300 mb-2">Player 1</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="text"
                      value={player1Name}
                      onChange={(e) => setPlayer1Name(e.target.value)}
                      className="w-full bg-gray-800/50 text-purple-300 border border-purple-500/30 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="Enter name..."
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-purple-300 mb-2">Player 2</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="text"
                      value={player2Name}
                      onChange={(e) => setPlayer2Name(e.target.value)}
                      className="w-full bg-gray-800/50 text-purple-300 border border-purple-500/30 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="Enter name..."
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Start Game
              </button>
            </form>
          </div>
        ) : (
          <ChessBoard players={players} />
        )}
      </div>
      
      <footer className="w-full py-6 glass-dark">
        <p className="text-center text-purple-300 font-medium">
          Chess Made by <span className="font-bold hover:text-purple-400 transition-colors duration-300">Nitin Mahala</span>
        </p>
      </footer>
    </div>
  );
}

export default App;