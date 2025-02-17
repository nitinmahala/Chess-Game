import { Square, Position, Piece } from '../types/chess';

export function getInitialBoard(): Square[][] {
  const board: Square[][] = Array(8).fill(null).map((_, row) => 
    Array(8).fill(null).map((_, col) => ({
      piece: null,
      position: { row, col }
    }))
  );

  // Set up pawns
  for (let col = 0; col < 8; col++) {
    board[1][col].piece = { type: 'pawn', color: 'black' };
    board[6][col].piece = { type: 'pawn', color: 'white' };
  }

  // Set up other pieces
  const backRowPieces: Array<Piece['type']> = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
  ];

  backRowPieces.forEach((type, col) => {
    board[0][col].piece = { type, color: 'black' };
    board[7][col].piece = { type, color: 'white' };
  });

  return board;
}

export function isValidMove(board: Square[][], from: Position, to: Position): boolean {
  const piece = board[from.row][from.col].piece;
  const targetSquare = board[to.row][to.col];

  if (!piece) return false;
  if (targetSquare.piece?.color === piece.color) return false;

  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);

  switch (piece.type) {
    case 'pawn':
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;

      // Regular move
      if (colDiff === 0 && !targetSquare.piece) {
        if (to.row - from.row === direction) return true;
        // First move can be two squares
        if (from.row === startRow && to.row - from.row === direction * 2) return true;
      }
      // Capture
      if (colDiff === 1 && to.row - from.row === direction && targetSquare.piece) {
        return true;
      }
      return false;

    case 'rook':
      return (rowDiff === 0 || colDiff === 0) && !isPathBlocked(board, from, to);

    case 'knight':
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

    case 'bishop':
      return rowDiff === colDiff && !isPathBlocked(board, from, to);

    case 'queen':
      return (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) && !isPathBlocked(board, from, to);

    case 'king':
      return rowDiff <= 1 && colDiff <= 1;

    default:
      return false;
  }
}

function isPathBlocked(board: Square[][], from: Position, to: Position): boolean {
  const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
  const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;

  while (currentRow !== to.row || currentCol !== to.col) {
    if (board[currentRow][currentCol].piece) return true;
    currentRow += rowStep;
    currentCol += colStep;
  }

  return false;
}