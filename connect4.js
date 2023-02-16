/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


//Global Variables
const WIDTH = 7;
const HEIGHT = 6;
let currentPlayer =1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


  function makeBoard() { //generates board variable in JS memory to an array with 6 subarrays with 7 properties within each subarray. Each y is an array, each x is an array with 7 empty slots
  for(let y=0; y<HEIGHT; y++){
    for(let x=0; x<WIDTH; x++){
      board.push([undefined,undefined,undefined,undefined,undefined,undefined,undefined])
    }
    // board.push(Array.from ({length:WIDTH}))

    //  board.push([null,null,null,null,null,null,null]) //my not so elegant solution
    // QUESTION#1 board.push(Array.from ({length:WIDTH})) Springboard's answer, not sure how it works! ASK!!! using array.from to make an array where were assigning the length to the width constant, just don't quite understand the syntax
  }
}

function makeHtmlBoard() {
  // TODO: add comment for this code (DONE)
  // this code generates the html game board! First it generates a top table row (tr element) with the ID of column-top. it also adds an eventlistener to this top column that will 
  //be the method we use to play a game piece.

  let htmlBoard=document.getElementById('board')
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

// loops/iterates through the top collumn and generates 7 TD's (using the width constant) to make individual cells within the top row (variable top)
//for each TD created by this loop, we set the ID to be x (which will just be the loop increment/number 0-6). These cells are then appended to the TOP variable AKA the table row with the evt listener. 
//Lastly we append the top row to the htmlBoard DIV. In total, we added a top table tow to the Html board div with an ID number 1-6 with a click event listener

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code (DONE)
  // Per the height constant, we create 6 table rows below the top row containing the event listener using a for loop. We set them to the variable ROW. We also run a second for loop that generates the TDs/table cells
  // which we set to the variable CELL. we set the attributes of each cell to have a coordinate-like ID system where Y is a y axis coordinate (height) and X and is the x-axis coordinate (width). We append each cell to a row and each row to the htmlBoard DIV element.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
//I know this is a lot of comments! I am placing them here to show my work!
//version 1 doesn't work because I can't call .includes on board[y][x] cause it isn't an array

// function findSpotForCol(x) {
//   for(let y=HEIGHT-1; y>=0;y--){
//   if(board[y][x].includes(1 || 2)){
//     return null
//   }
//   else if (!board[y][x].includes(1 || 2)){
//     return y;
// }
// }
// }

//version 2 does not work! doesn't work because y is undefined? prolly because the if statement is not in the scope of the loop?
// function findSpotForCol(x){
//   for(let y=HEIGHT-1; y>=0; y--){
//     if(board[y][x]){
//       return null
//     }
//     }
//     if(!board[y][x]){
//       return y
//   }}
//working version

function findSpotForCol(x){
  for(let y=HEIGHT-1; y>=0; y--){ //starting at bottom row first which is the highest Y coordinate. then we are decrementing to go up in the grid if a piece fills a Y at a given X
    if(!board[y][x]){
      return y
    }
    }
   return null // returns null if we go through each array and find no spot
  }

  


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let piece=document.createElement('div')
  piece.classList.add("piece")
  piece.classList.add(`player${currentPlayer}`)
  let position=document.getElementById(`${y}-${x}`)
  position.append(piece)
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
 return alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x]=currentPlayer //updates board variable
  placeInTable(y, x);

  // check for win (Question should I have written another function to append the playAgain button to the DOM) nevermind i did it anyways
  if (checkForWin()) {
    let htmlBoard=document.getElementById('board')
    let playAgainButton=document.createElement('button')
    playAgainButton.classList.add('playAgainButton')
    playAgainButton.innerText='Play Again'
    playAgainButton.addEventListener('click', resetBoard)
    htmlBoard.append(playAgainButton)
    
    return endGame(`Player ${currentPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currentPlayer 1 <-> 2


currentPlayer =currentPlayer===1 ? 2 : 1 
let playerHTML=document.getElementById("current-player")
if (currentPlayer===1){
  playerHTML.innerText=' Player 1'
  playerHTML.style.color='orange'
}
else{playerHTML.innerText=' Player 2'
playerHTML.style.color='green'
}
  // if(currentPlayer==='player1'){
  //   let playerHTML=document.getElementById("current-player")
  //   currentPlayer==='player2'
  //   playerHTML.innerText='2'
  // }
  // if(currentPlayer==='player2'){
  //   let playerHTML=document.getElementById("current-player")
  //   currentPlayer==='player1'
  //   playerHTML.innerText='1'
  // }
  
  
  
}
//handles the play again functionality. resets board memory, resets html, regenerates table.
function resetBoard(evt){
  board = [];
  if(evt.target.tagName==='BUTTON'){
    evt.target.parentElement.remove();
}
let gameDiv=document.getElementById('game')
let htmlBoard=document.createElement('table')
htmlBoard.setAttribute('id','board')
gameDiv.append(htmlBoard)

makeHtmlBoard();
makeBoard();
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currentPlayer

    return cells.every( //checking to see if the coordinates are legal! y and x should be greater or equal to zero but not greater than the constant's value that defines the grid. They should also match the current player
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currentPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you. nested for loop! for every Y column we check the x array's with in it for a win. There are 4 ways to win, if one line up 4 
  // horiz, vert, diagonal right or diagonal left. we then check if a certain player fills the right y,x combinations to fill these. For horizontal wins at a starting point X , 4 in a row would be X, X+1, x+2 etc, 
  //so if a given set of arrays evaulates positive to a player that is a horiz win. 

  for (let y = 0; y < HEIGHT; y++) { 
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // this code is a bunch of OR statments since there are 4 possibly win conditions. if any are met we return true on checkForWin
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
