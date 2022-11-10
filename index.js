const playerOne = {
   name: 'Player 1',
   type: 'x'
}

const playerTwo = {
   name: 'Player 2',
   type: 'o'
}

let plays = 0
let currentPlayer = playerOne
let startingPlayer = playerOne
let winner = ''

// Change Player 1 name
document.getElementById('playerOneName').addEventListener("input", (e) => {
   e.currentTarget.setAttribute('maxlength', '12')

   playerOne.name = e.currentTarget.value
})

// Change Player 2 name
document.getElementById('playerTwoName').addEventListener("input", (e) => {
   e.currentTarget.setAttribute('maxlength', '12')

   playerTwo.name = e.currentTarget.value
})

// Functions for the boardButtons
document.querySelectorAll('.board .boardButton').forEach(button => {

   button.addEventListener('click', () => {
      if (currentPlayer == playerOne) {
         button.innerText = 'X'
         button.classList.add('x')
         button.classList.remove('o')

         plays++
      } else {
         button.innerText = 'O'
         button.classList.add('o')
         button.classList.remove('x')

         plays++
      }

      button.disabled = true
      checkForWin()
      changePlayer()
   })

})

// Set inital currentPlayer
const currentPlayerField = document.getElementById("currentPlayer")
currentPlayerField.innerText = `X plays first`
currentPlayerField.classList.add('x')

function changePlayer() {
   currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne
   let playerNotPlaying = currentPlayer == playerOne ? playerTwo : playerOne

   // Styling
   currentPlayerField.innerText = `${currentPlayer.name} plays`
   currentPlayerField.classList.add(currentPlayer.type)
   currentPlayerField.classList.remove(playerNotPlaying.type)
}

const tileOne = document.getElementById('1')
const tileTwo = document.getElementById('2')
const tileThree = document.getElementById('3')
const tileFour = document.getElementById('4')
const tileFive = document.getElementById('5')
const tileSix = document.getElementById('6')
const tileSeven = document.getElementById('7')
const tileEight = document.getElementById('8')
const tileNine = document.getElementById('9')

const tilesArray = [tileOne, tileTwo, tileThree, tileFour, tileFive, tileSix, tileSeven, tileEight, tileNine]

function checkForWin() {
   const rowOne = {
      tiles: [tileOne, tileTwo, tileThree],
      comparasion: eval('tileOne.innerText == tileTwo.innerText && tileTwo.innerText == tileThree.innerText')
   }
   const rowTwo = {
      tiles: [tileFour, tileFive, tileSix],
      comparasion: eval('tileFour.innerText == tileFive.innerText && tileFive.innerText == tileSix.innerText')
   }
   const rowThree = {
      tiles: [tileSeven, tileEight, tileNine],
      comparasion: eval('tileSeven.innerText == tileEight.innerText && tileEight.innerText == tileNine.innerText')
   }

   const columnOne = {
      tiles: [tileOne, tileFour, tileSeven],
      comparasion: eval('tileOne.innerText == tileFour.innerText && tileFour.innerText == tileSeven.innerText')
   }
   const columnTwo = {
      tiles: [tileTwo, tileFive, tileEight],
      comparasion: eval('tileTwo.innerText == tileFive.innerText && tileFive.innerText == tileEight.innerText')
   }
   const columnThree = {
      tiles: [tileThree, tileSix, tileNine],
      comparasion: eval('tileThree.innerText == tileSix.innerText && tileSix.innerText == tileNine.innerText')
   }

   const diagonalOne = {
      tiles: [tileOne, tileFive, tileNine],
      comparasion: eval('tileOne.innerText == tileFive.innerText && tileFive.innerText == tileNine.innerText')
   }
   const diagonalTwo = {
      tiles: [tileThree, tileFive, tileSeven],
      comparasion: eval('tileThree.innerText == tileFive.innerText && tileFive.innerText == tileSeven.innerText')
   }

   const comparasionsArray = [rowOne, rowTwo, rowThree, columnOne, columnTwo, columnThree, diagonalOne, diagonalTwo]

   // Check if anyone won
   if (rowOne.comparasion || rowTwo.comparasion || rowThree.comparasion || columnOne.comparasion || columnTwo.comparasion || columnThree.comparasion || diagonalOne.comparasion || diagonalTwo.comparasion) {

      // Get the winner line
      let winnerLine
      comparasionsArray.forEach(element => {
         if (element.comparasion === true) {
            winnerLine = element
         }
      })

      // Check if the winner is X or O
      if (winnerLine.tiles[0].innerText === 'X') {
         winner = `${playerOne.name}`

         // Identify winner tiles
         winnerLine.tiles.forEach(tile => {
            tile.classList.add('xWin')
         })

         // Disable tiles to finish the game
         tilesArray.forEach(tile => {
            tile.disabled = true
         })

         setResults()
      } else {
         winner = `${playerTwo.name}`

         // Identify winner tiles
         winnerLine.tiles.forEach(tile => {
            tile.classList.add('oWin')
         })

         // Disable tiles to finish the game
         tilesArray.forEach(tile => {
            tile.disabled = true
         })

         setResults()
      }

   } else if (plays == 9) { // Tie

      winner = 'Tie'

      setResults()
   } else { // No tie and no win; keep playing
      return
   }
}

const resultsBox = document.getElementById('result')
const playAgainButton = document.getElementById('playAgain')

function setResults() {
   switch (winner) {
      case `${playerOne.name}`:
         resultsBox.innerText = `${winner} Wins!`
         resultsBox.classList.add('xWin')
         playAgainButton.style.opacity = '1'
         break
      case `${playerTwo.name}`:
         resultsBox.innerText = `${winner} Wins!`
         resultsBox.classList.add('oWin')
         playAgainButton.style.opacity = '1'
         break
      case 'Tie':
         resultsBox.innerText = `It is a Tie!`
         resultsBox.classList.add('tie')
         playAgainButton.style.opacity = '1'
         break
      default:
   }
}

// Reset Everything
playAgainButton.addEventListener('click', () => {
   playAgainButton.style.opacity = '0'
   resultsBox.innerText = ''
   resultsBox.classList.remove('xWin')
   resultsBox.classList.remove('oWin')
   resultsBox.classList.remove('tie')

   tilesArray.forEach(tile => {
      tile.disabled = false
      tile.innerText = tile.id
      tile.classList.remove('oWin')
      tile.classList.remove('xWin')
      tile.classList.remove('o')
      tile.classList.remove('x')
   })

   currentPlayerField.classList.remove('o')
   currentPlayerField.classList.remove('x')
   let playerToStart = startingPlayer == playerOne ? playerTwo : playerOne
   currentPlayerField.innerText = `${playerToStart.name} plays first`
   currentPlayerField.classList.add(`${playerToStart.type}`)
   currentPlayer = playerToStart

   plays = 0
   winner = ""
   startingPlayer = startingPlayer == playerOne ? playerTwo : playerOne
})
