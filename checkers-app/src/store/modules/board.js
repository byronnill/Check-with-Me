export const getBoard = () => {
  const board = new Array(8).fill(null).map(() => Array(8))
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      // initialize empty cell
      const cell = {
        nRow: r + 1, // nRow number 1-8, 1 is bottom
        nCol: c + 1, // column number 1-8, 1 is leftmost
        bHasBlackChip: false, // boolean
        bHasWhiteChip: false, // boolean
        bHasBlackKing: false, // boolean
        bHasWhiteKing: false // boolean
      }

      if (cell.nRow >= 6 && ((cell.nCol % 2 === 1 && cell.nRow % 2 === 1) || (cell.nCol % 2 === 0 && cell.nRow % 2 === 0))) {
        // put black chip
        cell.bHasBlackChip = true
      } else if (cell.nRow <= 3 && ((cell.nCol % 2 === 1 && cell.nRow % 2 === 1) || (cell.nCol % 2 === 0 && cell.nRow % 2 === 0))) {
        // put white chip
        cell.bHasWhiteChip = true
      }

      board[r][c] = cell
    }
  }

  return board
}

export const getBoaaard = () => {
  const board = new Array(8).fill(null).map(() => Array(8))
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      // initialize empty cell
      let cell = {
        nRow: r + 1, // nRow number 1-8, 1 is bottom
        nCol: c + 1, // column number 1-8, 1 is leftmost
        bHasBlackChip: false, // boolean
        bHasWhiteChip: false, // boolean
        bHasBlackKing: false, // boolean
        bHasWhiteKing: false // boolean
      }
      
      if (r === 4 && c === 4) {
        cell = {
          nRow: r + 1, // nRow number 1-8, 1 is bottom
          nCol: c + 1, // column number 1-8, 1 is leftmost
          bHasBlackChip: false, // boolean
          bHasWhiteChip: true, // boolean
          bHasBlackKing: false, // boolean
          bHasWhiteKing: true // boolean
        } 
      } else if (r === 6 && c === 6) {
        cell = {
          nRow: r + 1, // nRow number 1-8, 1 is bottom
          nCol: c + 1, // column number 1-8, 1 is leftmost
          bHasBlackChip: true, // boolean
          bHasWhiteChip: false, // boolean
          bHasBlackKing: false, // boolean
          bHasWhiteKing: false // boolean
        } 
      }

      board[r][c] = cell
    }
  }

  return board
}