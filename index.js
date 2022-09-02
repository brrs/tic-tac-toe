const states = { X: 'x' ,  O: 'o', EMPTY: ""}

function createTicTacToe(onWin, onDraw)  {
    return {
        grid: [ 
            [states.EMPTY, states.EMPTY, states.EMPTY],
            [states.EMPTY, states.EMPTY, states.EMPTY], 
            [states.EMPTY, states.EMPTY, states.EMPTY] 
        ],
        turn: states.X,
        turnCount: 0,
        makeTurn: function(x, y, updateView) {
            if (x > 3 || x < 0 || y > 3 || y < 0)  {
                console.log("Wrong coordinates")
                return
            }
            if (this.grid[x][y] == states.EMPTY) {
                this.grid[x][y] = this.turn
                updateView(this.turn)

                // check 
                for (let i = 0; i < 3; i++) {
                    if (this.grid[x][i] != this.turn) break
                    if (i == 2) {
                        onWin(this.turn)
                    }
                }

                for(let i = 0; i < 3; i++){
                    if(this.grid[i][y] != this.turn) break
                    if (i == 2) {
                        onWin(this.turn)
                    }
                }

                if (x == y) {
                    for (let i = 0; i < 3; i++) {
                        if(this.grid[i][i] != this.turn) break
                        if(i == 2){
                            onWin(this.turn)
                        }
                    }
                }

                if(x + y == 2){
                    for (let i = 0; i < 3; i++) {
                        if(this.grid[i][2-i] != this.turn) break
                        if(i == 2){
                            onWin(this.turn)
                        }
                    }
                }
                
                if (this.turnCount == 8) onDraw()
                if (this.turn == states.X) this.turn = states.O; else this.turn = states.X
                this.turnCount++
            } else {
                console.log("This cell is already taken")
            }
        }
    }
}

const caption = document.getElementById("caption")
caption.textContent = ""

let ttt = createTicTacToe(
    function(state) {
        caption.textContent = state + " won"
    },
    function() {
        caption.textContent = "Draw"
    }
)

const board = document.getElementById("board").children
for (let i = 0; i < board.length; i++) {    
    board[i].addEventListener("click", function() {
        let coords;
        switch (i) {
            case 0: coords = {x: 0, y: 0}; break
            case 1: coords = {x: 1, y: 0}; break
            case 2: coords = {x: 2, y: 0}; break
            case 3: coords = {x: 0, y: 1}; break
            case 4: coords = {x: 1, y: 1}; break
            case 5: coords = {x: 2, y: 1}; break
            case 6: coords = {x: 0, y: 2}; break
            case 7: coords = {x: 1, y: 2}; break
            case 8: coords = {x: 2, y: 2}; break
        }
        console.log(coords.x + " " + coords.y)

        ttt.makeTurn(coords.x, coords.y, function(state){ 
            console.log(state)
            let element = document.createElement("p1")
            element.textContent = state
            board[i].appendChild(element)
        })
    })
}

document.getElementById("button_refresh").addEventListener('click', function() {
    location.reload()
})
