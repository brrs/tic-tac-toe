const states = { X: 'X', O: 'O', EMPTY: "" }

class Game {
    constructor(_onBoardChange, _onWinOrDraw, _onWrongCell) {
        this.turn = states.X
        this.turnCount = 0
        this.winner = states.EMPTY
        this.board = this.getEmptyBoard()
        // callbacks
        this.onBoardChange = _onBoardChange
        this.onWinOrDraw = _onWinOrDraw
        this.onWrongCell = _onWrongCell
    }

    getEmptyBoard() {
        return Array(9).fill(states.EMPTY)
    }

    reset() {
        this.turn = states.X
        this.turnCount = 0
        this.winner = states.EMPTY
        this.board = this.getEmptyBoard()
    }

    makeTurn(cell) {
        // check if the game is finished and coords is ok
        if (this.winner !== states.EMPTY) return
        if (cell < 0 || cell > 8) return
        
        // check if the cell is not yet taken
        if (this.isTaken(cell)) {
            this.onWrongCell(cell)
            return
        }

        // make turn
        this.board[cell] = this.turn
        this.onBoardChange(cell)

        // check win or draw
        if (this.checkWinner()) {
            this.winner = this.turn
            this.onWinOrDraw(this.turn)
            return
        } else {
            if (this.turnCount == 8) {
                this.onWinOrDraw(states.EMPTY)
                return
            }
        }

        // prepare for the next turn
        this.turn = this.turn == states.X ? states.O : states.X
        this.turnCount++
    }

    isTaken(cell) {
        return this.board[cell] != states.EMPTY
    }

    checkWinner() {
        return this.check(0, 1, 2)
            || this.check(3, 4, 5)
            || this.check(6, 7, 8)
            || this.check(0, 3, 6)
            || this.check(1, 4, 7)
            || this.check(2, 5, 8)
            || this.check(0, 4, 8)
            || this.check(6, 4, 2)
    }

    check(p1, p2, p3) {
        let c1 = this.board[p1]
        let c2 = this.board[p2]
        let c3 = this.board[p3]

        if (c1 == states.EMPTY || c2 == states.EMPTY || c3 == states.EMPTY) return false
        if (c1 == c2 && c2 == c3) return true

        return false
    }
}
