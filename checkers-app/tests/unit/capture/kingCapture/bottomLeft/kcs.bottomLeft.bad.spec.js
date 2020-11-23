/**
 * Tests for invalid king capture attempts
 */

import {
  bOtherExistsOnBottomLeft,
  bPieceExistsOnTargetBottomLeft,
  bOtherExistsAfterSource,
  bPieceExistsBetweenTargetAndDest,
  bIsValidCapture
} from '@/store/services/kingCaptureService'

import {
  bSourceHasBlack,
  bSourceHasWhite
} from '@/store/services/moveCaptureService'

const getBoard = () => {
  const board = new Array(5).fill(null).map(() => Array(5))
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      // initialize empty cell
      const cell = {
        nRow: r + 1, // nRow number 1-8, 1 is bottom
        nCol: c + 1, // column number 1-8, 1 is leftmost
        bHasBlackChip: false, // boolean
        bHasWhiteChip: false // boolean
      }

      board[r][c] = cell
    }
  }
  return board
}


describe('bOtherExistsOnBottomLeft', () => {
  it('returns an object { targetPiece: null, pieceExists: false } \
    if no piece exists on the bottom left diagonal from a given source', () => {
    // Arrange
    const board = getBoard()
    const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
    board[4][4] = {
      nRow: 5, nCol: 5, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: true, bHasBlackKing: false
    }
    
    const expected = {
      targetPiece: null,
      pieceExists: false
    }

    // Act
    const result = bOtherExistsOnBottomLeft(board, coords, bSourceHasWhite, bSourceHasBlack)

    // Assert
    expect(result).toStrictEqual(expected)
  })

  describe('White Source Piece', () => {
    it('returns an object { targetPiece: null, pieceExists: false } \
      if the first piece seen on the bottom left diagonal from a given source is white.', () => {
      // Arrange
      const board = getBoard()
      const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
      board[4][4] = {
        nRow: 5, nCol: 5, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: true, bHasBlackKing: false
      }

      board[2][2] = {
        nRow: 3, nCol: 3, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: false, bHasBlackKing: false
      }

      const expected = {
        targetPiece: null,
        pieceExists: false
      }

      // Act
      const result = bOtherExistsOnBottomLeft(board, coords, bSourceHasWhite, bSourceHasBlack)

      // Assert
      expect(result).toStrictEqual(expected)
    })
  })

  describe('Black Source Piece', () => {
    it('returns an object { targetPiece: null, pieceExists: false } \
      if the first piece seen on the bottom left diagonal from a given source is black.', () => {
      // Arrange
      const board = getBoard()
      const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
      board[4][4] = {
        nRow: 5, nCol: 5, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: true
      }

      board[2][2] = {
        nRow: 3, nCol: 3, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
      }

      const expected = {
        targetPiece: null,
        pieceExists: false
      }

      // Act
      const result = bOtherExistsOnBottomLeft(board, coords, bSourceHasBlack, bSourceHasWhite)

      // Assert
      expect(result).toStrictEqual(expected)
    })
  })
}) 

describe('bOtherExistsAfterSource', () => {
  describe('White Source', () => {
    it('returns an object { targetPiece: null, pieceExists: false } \
      if the first piece seen on the bottom left diagonal from a given source is white.', () => {
      // Arrange
      const board = getBoard()
      const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
      board[4][4] = {
        nRow: 5, nCol: 5, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: true, bHasBlackKing: false
      }

      board[2][2] = {
        nRow: 3, nCol: 3, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: false, bHasBlackKing: false
      }

      const expected = {
        targetPiece: null,
        pieceExists: false
      }

      // Act
      const result = bOtherExistsAfterSource(board, coords, bSourceHasWhite, bSourceHasBlack)

      // Assert
      expect(result).toStrictEqual(expected)
    })
  }) 

  describe('Black Source', () => {
    it('returns an object { targetPiece: null, pieceExists: false } \
      if the first piece seen on the bottom left diagonal from a given source is black.', () => {
      // Arrange
      const board = getBoard()
      const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
      board[4][4] = {
        nRow: 5, nCol: 5, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: true
      }

      board[2][2] = {
        nRow: 3, nCol: 3, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
      }

      const expected = {
        targetPiece: null,
        pieceExists: false
      }

      // Act
      const result = bOtherExistsAfterSource(board, coords, bSourceHasBlack, bSourceHasWhite)

      // Assert
      expect(result).toStrictEqual(expected)
    })
  }) 
})

/**
 * _ _ _
 * _ w _
 * b _ _
 */

describe('bPieceExistsOnTargetBottomLeft', () => {
  it('returns true if a piece exists between the target piece and the destination square', () => {
    // Arrange
    const board = getBoard()
    const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
    const targetPiece = { nRow: 3, nCol: 3 } 

    // target
    board[2][2] = {
      nRow: 3, nCol: 3, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
    }
    
    // between
    board[1][1] = {
      nRow: 2, nCol: 2, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
    }

    // dest
    board[0][0] = {
      nRow: 1, nCol: 1, bHasWhiteChip: false, bHasBlackChip: false, bHasWhiteKing: false, bHasBlackKing: false
    }

    const expected = true
    
    // Act
    const result = bPieceExistsOnTargetBottomLeft(board, coords, targetPiece)

    // Assert
    expect(result).toBe(expected)
  })
}) 


describe('bPieceExistsBetweenTargetAndDest', () => {
  it('returns true if a piece exists between the target piece and the destination square', () => {
    // Arrange
    const board = getBoard()
    const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
    const targetPiece = { nRow: 3, nCol: 3 } 

    // target
    board[2][2] = {
      nRow: 3, nCol: 3, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
    }
    
    // between
    board[1][1] = {
      nRow: 2, nCol: 2, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
    }

    // dest
    board[0][0] = {
      nRow: 1, nCol: 1, bHasWhiteChip: false, bHasBlackChip: false, bHasWhiteKing: false, bHasBlackKing: false
    }

    const expected = true
    
    // Act
    const result = bPieceExistsBetweenTargetAndDest(board, coords, targetPiece)

    // Assert
    expect(result).toBe(expected)
  }),

  it('returns true if a piece exists at the destination square', () => {
    // Arrange
    const board = getBoard()
    const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }
    const targetPiece = { nRow: 3, nCol: 3 } 

    // target
    board[2][2] = {
      nRow: 3, nCol: 3, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
    }
    
    // between
    board[1][3] = {
      nRow: 2, nCol: 4, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
    }

    // dest
    board[0][0] = {
      nRow: 1, nCol: 5, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
    }

    const expected = true

    // Act
    const result = bPieceExistsBetweenTargetAndDest(board, coords, targetPiece)

    // Assert
    expect(result).toBe(expected)
  })
}) 

describe('bIsValidCapture', () => {
  describe('Friendly piece exists between source and target', () => {
    it('returns false if the first piece encountered from the source is a friendly piece', () => {
      // Arrange
      const board = getBoard()
      const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }

      // source
      board[4][4] = {
        nRow: 5, nCol: 5, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: true, bHasBlackKing: false
      }


      board[3][3] = {
        nRow: 4, nCol: 4, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: false, bHasBlackKing: false
      }

      // target
      board[2][2] = {
        nRow: 3, nCol: 3, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
      }

      const expected = false

      // Act
      const result = bIsValidCapture(board, coords, 'white')

      // Assert
      expect(result).toBe(expected)
    })
  }),

  describe('Piece between target and destination', () => {
    it('returns false if there exists a piece between the target and destination', () => {
      // Arrange
      const board = getBoard()
      const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }

      // target
      board[2][2] = {
        nRow: 3, nCol: 3, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
      }

      board[1][1] = {
        nRow: 2, nCol: 2, bHasWhiteChip: false, bHasBlackChip: true, bHasWhiteKing: false, bHasBlackKing: false
      }

      // dest
      board[0][0] = {
        nRow: 1, nCol: 1, bHasWhiteChip: false, bHasBlackChip: false, bHasWhiteKing: false, bHasBlackKing: false
      }

      const expected = false

      // Act
      const result = bIsValidCapture(board, coords, 'white')

      // Assert
      expect(result).toBe(expected)
    })
  }),

  describe('Destination already occupied', () => {
    it('returns false if there exists a piece at the destination square', () => {
      // Arrange
      const board = getBoard()
      const coords = { nRow: 5, nCol: 5, nDestRow: 1, nDestCol: 1 }

      // dest
      board[0][0] = {
        nRow: 1, nCol: 1, bHasWhiteChip: true, bHasBlackChip: false, bHasWhiteKing: false, bHasBlackKing: false
      }

      const expected = false

      // Act
      const result = bIsValidCapture(board, coords, 'white')

      // Assert
      expect(result).toBe(expected)
    })
  })
})
