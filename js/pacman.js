'use strict'

const PACMAN = '😀'
var gPacman
var gSuperIntervalID
var gEatenGhosts = []


// ---------------------------- createPacman ---------------------------- //

function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}


// ---------------------------- onMovePacman ---------------------------- //

function onMovePacman(ev) {
    if (!gGame.isOn) return

    // Use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // Return if cannot move
    if (nextCell === WALL) return

    if (nextCell === FOOD) updateScore(1)

    if (nextCell === CHERRY) updateScore(10)

    if (nextCell === SUPER) {
        if (gPacman.isSuper) return
        handleSuper()
    }

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            eatGhosts(nextLocation)
        } else {
            gameOver()
            return
        }
    }

    // Moving from current location:
    // Update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // Update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // Update the model
    gPacman.location = nextLocation

    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // Update the DOM
    renderCell(nextLocation, PACMAN)


}

// ---------------------------- handleSuper ---------------------------- //

function handleSuper() {
    gPacman.isSuper = true
    setTimeout(endSuperMode, 5000)
}

// ---------------------------- eatGhosts ---------------------------- //

function eatGhosts(ghostPos) {

    for (var i = 0; i < gGhosts.length; i++) {
        const ghostCurrPos = gGhosts[i].location // the ghost curr position

        //Pac pos is equal to ghost pos?
        if (ghostCurrPos.i === ghostPos.i && ghostCurrPos.j === ghostPos.j) {
            const eatenGhost = gGhosts.splice(i, 1)[0]  //the first index from the array
            gEatenGhosts.push(eatenGhost)
        }
    }
}

// ---------------------------- endSuperMode ---------------------------- //

function endSuperMode() {
    gPacman.isSuper = false

    for (var i = 0; i < gEatenGhosts.length; i++) {
        const currGhost = gEatenGhosts[i]
        gGhosts.push(currGhost)
    }
    gEatenGhosts = []
}

// ---------------------------- getNextLocation ---------------------------- //

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}