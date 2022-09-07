const states = { X: 'X' ,  O: 'O', EMPTY: ""}

function createTicTacToe(onWin, onDraw)  {
    return {
        grid: [
            [states.EMPTY, states.EMPTY, states.EMPTY],
            [states.EMPTY, states.EMPTY, states.EMPTY],
            [states.EMPTY, states.EMPTY, states.EMPTY]
        ],
        turn: states.X,
        turnCount: 0,
        winner: states.EMPTY,
        makeTurn: function(x, y, updateView, onWrongCell) {
            // check if the game is finished and coords is ok
            if (this.winner !== states.EMPTY) return
            if (x > 3 || x < 0 || y > 3 || y < 0)  {
                console.log("Wrong coordinates")
                return
            }

            // check if the cell is already taken
            if (this.grid[x][y] == states.EMPTY) {
                // make turn
                this.grid[x][y] = this.turn
                updateView(this.turn)

                // check win or draw
                if (check(x, y, this.turn, this.grid)) {
                    this.winner = this.turn
                    onWin(this.turn)
                    return
                } else {
                    if (this.turnCount == 8) {
                        onDraw()
                        return
                    }
                }
                
                // prepare for next turn
                this.turn = this.turn == states.X ? states.O : states.X
                this.turnCount++
            } else {
                onWrongCell()
            }
        }
    }
}

function check(x, y, turn, state) {
    for (let i = 0; i < 3; i++) {
        if (state[x][i] != turn) break
        if (i == 2) {
            return true
        }
    }

    for(let i = 0; i < 3; i++){
        if(state[i][y] != turn) break
        if (i == 2) {
            return true
        }
    }

    if (x == y) {
        for (let i = 0; i < 3; i++) {
            if(state[i][i] != turn) break
            if(i == 2){
                return true
            }
        }
    }

    if(x + y == 2){
        for (let i = 0; i < 3; i++) {
            if(state[i][2-i] != turn) break
            if(i == 2){
                return true
            }
        }
    }

    return false
}

const caption = document.getElementById("caption")
let ttt = createTicTacToe(
    (state) => {
        caption.textContent = state + " won"
    },
    () => {
        caption.textContent = "Draw"
    }
)

// setting listeners
const board = document.getElementById("board").children
for (let element of board) {
    const item = document.getElementById(element.id)
    const x  = item.id[0]
    const y  = item.id[1]
    item.addEventListener("click", () => {
        ttt.makeTurn(x, y, (turn) => {
            console.log("update")
            let element = document.createElement('img');
            let img;
            if (turn == states.X) img = "x.png"; else img = "o.png" 
            element.src = img
            element.classList.add("pin")
            item.appendChild(element)
        }, () => {
            item.classList.add("err")
            setTimeout(() => {
                item.classList.remove("err")
                }, 500)
        })
    })
}

document.getElementById("button_refresh").addEventListener('click', () => {
    location.reload()
})