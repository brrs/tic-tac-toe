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
        winner: "",
        makeTurn: function(x, y, updateView, onWrongCell) {
            // check if the game is finished and coords is ok
            if (this.winner !== "") return
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
                if (this.turn == states.X) this.turn = states.O; else this.turn = states.X
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
    function(state) {
        caption.textContent = state + " won"
    },
    function() {
        caption.textContent = "Draw"
    }
)

// setting listeners
const board = document.getElementById("board").children
for (let i = 0; i < board.length; i++) {    
    const item = document.getElementById(board[i].id)
    const x  = item.id[0]
    const y  = item.id[1]
    item.addEventListener("click", function() {
        ttt.makeTurn(x, y, function(turn) {
            console.log("update")
            let element = document.createElement('img');
            let img;
            if (turn == states.X) img = "x.png"; else img = "o.png" 
            element.src = img
            element.classList.add("pin")
            item.appendChild(element)
        }, function(){
            item.classList.add("err")
            setTimeout(function(){
                item.classList.remove("err")
                }, 500)
        })
    })
}

document.getElementById("button_refresh").addEventListener('click', function() {
    location.reload()
})