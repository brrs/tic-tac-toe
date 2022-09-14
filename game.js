const states = { X: 'X', O: 'O', EMPTY: "" }

class Game extends HTMLElement {
    constructor() {
        super()
        this.turn = states.X
        this.turnCount = 0
        this.winner = states.EMPTY
        this.board = this.getEmptyBoard()
        this.initHtml(document.body)
    }

    initHtml(parent) {
        const grid = document.createElement('div')
        grid.classList.add('grid-container')
        grid.id = 'board'
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div')
            cell.classList.add('grid-item')
            cell.id = i
            cell.addEventListener('click', () => { this.makeTurn(i) })
            grid.appendChild(cell)
        }
        parent.appendChild(grid)
        this.grid = grid

        const caption = document.createElement('h1')
        caption.classList.add('caption')
        caption.id = 'caption'
        parent.appendChild(caption)
        this.caption = caption

        const button = document.createElement('div')
        button.classList.add('button')
        button.id = 'button_refresh'
        button.addEventListener('click', () => { this.reset() })
        const buttonCaption = document.createElement('span')
        buttonCaption.classList.add('button_text')
        buttonCaption.textContent = 'Refresh'
        button.appendChild(buttonCaption)
        parent.appendChild(button)
        this.button = button
    }

    getEmptyBoard() {
        return Array(9).fill(states.EMPTY)
    }

    reset() {
        this.turn = states.X
        this.turnCount = 0
        this.winner = states.EMPTY
        this.board = this.getEmptyBoard()
        this.caption.textContent = ''
        for (const cell of this.grid.children) { cell.innerHTML = '' }
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
            this.onWinOrDraw()
            return
        } else {
            if (this.turnCount == 8) {
                this.onWinOrDraw()
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

    onWrongCell(cell) {
        this.grid.children[cell].classList.add("err")
        setTimeout(() => { this.grid.children[cell].classList.remove("err") }, 500)
    }

    onBoardChange(cell) {
        const child = document.createElement('img');
        const img = this.turn == states.X ? "x.png" : "o.png"
        child.src = img
        child.classList.add("pin")
        this.grid.children[cell].appendChild(child)
    }

    onWinOrDraw() {
        if (this.winner == states.EMPTY) {
            this.caption.textContent = "draw"
        } else {
            this.caption.textContent = this.winner + " won"
        }
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
        const c1 = this.board[p1]
        const c2 = this.board[p2]
        const c3 = this.board[p3]

        if (c1 == states.EMPTY || c2 == states.EMPTY || c3 == states.EMPTY) return false
        if (c1 == c2 && c2 == c3) return true

        return false
    }
}
