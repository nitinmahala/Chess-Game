import React, { useState } from 'react';
import { Square, Position, Piece } from '../types/chess';
import { isValidMove, getInitialBoard } from '../utils/chess';

interface ChessBoardProps {
  players: {
    white: string;
    black: string;
  };
}

export default function ChessBoard({ players }: ChessBoardProps) {
  const [board, setBoard] = useState<Square[][]>(getInitialBoard());
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');

  const handleSquareClick = (position: Position) => {
    if (!selectedSquare) {
      const piece = board[position.row][position.col].piece;
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare(position);
      }
      return;
    }

    if (selectedSquare.row === position.row && selectedSquare.col === position.col) {
      setSelectedSquare(null);
      return;
    }

    if (isValidMove(board, selectedSquare, position)) {
      const newBoard = [...board.map(row => [...row])];
      newBoard[position.row][position.col].piece = board[selectedSquare.row][selectedSquare.col].piece;
      newBoard[selectedSquare.row][selectedSquare.col].piece = null;
      
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }
    
    setSelectedSquare(null);
  };

  const currentPlayerName = currentPlayer === 'white' ? players.white : players.black;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="glass-dark rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
        <div className="mb-6 text-3xl font-bold text-purple-300 text-center">
          <span className="animate-pulse inline-block">
            {currentPlayerName}'s Turn
          </span>
        </div>
        <div className="grid grid-cols-8 gap-0 border-2 border-purple-500/20 rounded-lg overflow-hidden shadow-inner">
          {board.map((row, rowIndex) => (
            row.map((square, colIndex) => {
              const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
              const isLight = (rowIndex + colIndex) % 2 === 0;
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-16 h-16 flex items-center justify-center cursor-pointer
                    transition-all duration-300 relative
                    ${isLight ? 'bg-gray-200/90' : 'bg-gray-800/90'}
                    ${isSelected ? 'ring-4 ring-purple-400/50' : ''}
                    hover:opacity-90 group
                  `}
                  onClick={() => handleSquareClick({ row: rowIndex, col: colIndex })}
                >
                  {square.piece && (
                    <div 
                      className={`
                        text-4xl transform transition-all duration-300
                        group-hover:scale-125 group-hover:rotate-3
                        ${square.piece.color === 'white' ? 'text-purple-300' : 'text-purple-900'}
                        hover:drop-shadow-lg
                      `}
                    >
                      {getPieceSymbol(square.piece)}
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 bg-purple-400/20 animate-pulse" />
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
      <div className="glass-dark rounded-lg p-4 text-purple-300">
        <p className="text-center">
          White: <span className="font-bold">{players.white}</span> | 
          Black: <span className="font-bold">{players.black}</span>
        </p>
      </div>
    </div>
  );
}

function getPieceSymbol(piece: Piece): string {
  const symbols: Record<string, string> = {
    'white-king': '♔',
    'white-queen': '♕',
    'white-rook': '♖',
    'white-bishop': '♗',
    'white-knight': '♘',
    'white-pawn': '♙',
    'black-king': '♚',
    'black-queen': '♛',
    'black-rook': '♜',
    'black-bishop': '♝',
    'black-knight': '♞',
    'black-pawn': '♟'
  };
  
  return symbols[`${piece.color}-${piece.type}`];
}