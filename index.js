let game = new Game(
    // update view
    (cell) => {
        let element = document.getElementById(cell)
        let child = document.createElement('img');
            let img;
            if (game.turn == states.X) img = "x.png"; else img = "o.png"
            child.src = img
            child.classList.add("pin")
            element.appendChild(child)
    },
    // on win or draw
    (state) => {
        let caption = document.getElementById("caption")
        if (state != states.EMPTY) {
            caption.textContent = state + " won"
        } else {
            caption.textContent = "draw"
        }
    },
    // wrong cell
    (cell) => {
        let element = document.getElementById(cell)
        element.classList.add("err")
            setTimeout(() => {
                element.classList.remove("err")
            }, 500)
    }
)

const grid = document.getElementById('board').children
for (let el of grid) {
    let element = document.getElementById(el.id)
    element.addEventListener('click', () => {
        game.makeTurn(el.id)
    })
}

document.getElementById("button_refresh").addEventListener('click', () => {
    game.reset()
    caption.textContent = ""
    for (let el of grid) {
        let element = document.getElementById(el.id)
        element.innerHTML = ""
    }
})