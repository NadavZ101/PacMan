'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER = '🌟'
const CHERRY = '🍒'

// Model
const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gIsWin = false
var gIsWinInterval
var gCherryIntervalID

// ---------------------------- onInit - Game Handler ---------------------------- //

function onInit() {
    hideModal()
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true


    gCherryIntervalID = setInterval(addCherry, 15000)
    gIsWinInterval = setInterval(checkWin, 1000)

    // moveGhosts()
}

// ---------------------------- buildBoard ---------------------------- //

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }

            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8) {
                board[i][j] = SUPER
            }
        }

    }
    return board
}

// ---------------------------- renderBoard ---------------------------- //

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {

    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

// ---------------------------- addCherry ---------------------------- //

function addCherry() {
    const emptyPos = getEmptyPos()
    if (emptyPos.length === 0) {
        return
    }
    const randIdx = Math.floor(Math.random() * emptyPos.length)
    const chosenPos = emptyPos[randIdx]

    gBoard[chosenPos.i][chosenPos.j] = CHERRY
    renderCell(chosenPos, CHERRY)
}

// ---------------------------- updateScore ---------------------------- //

function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

// ---------------------------- gameOver ---------------------------- //

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gIsWinInterval)
    if (!gIsWin) {
        renderCell(gPacman.location, '🪦')
    }
    showModal()
    gGame.isOn = false
}

// ---------------------------- checkWin ---------------------------- //

function checkWin() {
    //maybe better to check it with max score

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell !== FOOD) {
                gIsWin = true
            } else {
                return gIsWin = false
            }
        }
    }

    //checking the cells with ghost - for non additional food
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].currCellContent === FOOD)
            return gIsWin = false
    }

    // console.log('gIsWin = ', gIsWin)

    if (gIsWin === true) {
        gameOver()
    }
}

// ---------------------------- showModal ---------------------------- //

function showModal() { // when the player won Or end of game
    if (gIsWin) { // TODO: if gIsWin = gGame.isOn = false
        var userMsg = 'You Won!!!'
    } else {
        userMsg = 'You Lost - GAME OVER!!!'
    }
    const elUserMsg = document.querySelector('.user-msg')
    elUserMsg.innerText = userMsg
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

// ---------------------------- hideModal ---------------------------- //

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}
