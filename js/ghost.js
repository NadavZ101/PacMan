'use strict'

const GHOST = '👻'
var gGhosts = []

var gIntervalGhosts

// ---------------------------- createGhosts ---------------------------- //

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)

    console.table('gGhosts ', gGhosts)
}

// ---------------------------- createGhost ---------------------------- //

function createGhost(board) {
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

// ---------------------------- moveGhosts ---------------------------- //

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

// ---------------------------- moveGhost ---------------------------- //

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // hitting a pacman? call gameOver
    if (nextCell === PACMAN && gPacman.isSuper) {
        return
    }

    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    // Moving from CURRENT location:
    // Update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // Update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // Move the ghost to NEW location:
    // Update the model 
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // Update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

// ---------------------------- getMoveDiff ---------------------------- //

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)
    //can only move 4 directions: up, down, left, right

    switch (randNum) {
        case 1: return { i: 0, j: 1 }   // right
        case 2: return { i: 1, j: 0 }   // down
        case 3: return { i: 0, j: -1 }  // left
        case 4: return { i: -1, j: 0 }  // up
    }
}

// ---------------------------- getGhostHTML ---------------------------- //

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span style="background-color: salmon">${GHOST}</span>`
    } else {
        return `<span style="background-color:${ghost.color}">${GHOST}</span>`
    }
}



