/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// each cell on the board is assigned a y and x value that represents their position on the board,
// y is the column, x is the row

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // make empty arrays inside board array and fill each array with null
  for (let y = 0; y < HEIGHT; y++) {
    board.push([]);
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null);
    }
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code
  // create table row and give it variable name of top
  const top = document.createElement("tr");
  // give the `column-top` ID to the new <tr>
  top.setAttribute("id", "column-top");
  // listen for a click event on the <tr> (top)
  top.addEventListener("click", handleClick);

  // for loop to create cells (<td>s), these are the column tops
  for (var x = 0; x < WIDTH; x++) {
    // create a new <td> when headCell is called
    const headCell = document.createElement("td");
    // set id of x to new <td> (headCell)
    headCell.setAttribute("id", x);
    // append the <td> (headCell) to the <tr> (top)
    top.append(headCell);
  }
  // append the <tr> (top) to the board
  htmlBoard.append(top);

  // TODO: add comment for this code
  // for loops to create table rows and cells in the rows, this is the main part of the board
  for (let y = 0; y < HEIGHT; y++) {
    // create a new <tr> when row is called
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // create new <td> when cell is called
      const cell = document.createElement("td");
      // give new <td> (cell) the id "y-x"
      cell.setAttribute("id", `${y}-${x}`);
      // append cell (<td>) to row (<tr>)
      row.append(cell);
    }
    // append row (<tr>) to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // Fix this function so that it finds the lowest empty spot in the game board and returns the y coordinate (or null if the column is filled).
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);

  const loc = document.getElementById(`${y}-${x}`);
  loc.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // update the board with the player number
  board[y][x] = currPlayer;

  // create oppositePlayer to fix bug of game telling that the wrong player won
  let oppositePlayer;
  if (currPlayer === 1) {
    oppositePlayer = 1;
  } else {
    oppositePlayer = 2;
  }

  // check for win
  if (checkForWin()) {
    // use setTimeout so that piece drops before message displaying who wins
    setTimeout(() => {
      return endGame(`Player ${oppositePlayer} won!`);
    }, 100);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    setTimeout(() => {
      return endGame("It's a Tie!");
    }, 100);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    return (currPlayer = 2);
  } else {
    return (currPlayer = 1);
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
