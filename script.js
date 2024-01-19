const boxes = document.querySelectorAll(".box");
let playerTurn = document.querySelector("#player-turn");
let popup = document.querySelector(".popup");
let winningMessage = document.querySelector("#winningMessage");
let newGame = document.querySelector("#new-game");

let turnX = true;  // playerX, playerO
let count = 0;     // To track Draw

// Winning pattern array
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/* ======================
   Box: Hover and onClick
   ====================== */

boxes.forEach((box) => {

    //Hover
    box.addEventListener('mouseover', () => {
        if(!box.classList.contains('disabled')) {
            box.innerHTML = turnX === true ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-o"></i>' ;
        }
    });

    box.addEventListener('mouseout', () => {
        if(!box.classList.contains('disabled')) {
            if(box.innerHTML !== '') {
                box.innerHTML = ''; 
            }
        }
    });

    // Click
    box.addEventListener('click', () => {
        if(turnX) {
            turnX = false;

            // Change player turn text
            playerTurn.innerText = "Player 2's Turn (O)";

            // Display X
            box.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            box.classList.remove('box-hover');
            box.classList.add('player-1');

        } else {
            turnX = true;

            // Change player turn text
            playerTurn.innerText = "Player 1's Turn (X)";

            // Display O
            box.innerHTML = '<i class="fa-solid fa-o"></i>';
            box.classList.remove('box-hover');
            box.classList.add('player-2');
        }

        //Disable button on click and increment count
        box.classList.add('disabled');
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            drawGame();
        }
    });
});

/* ======================
   Game Win or Draw
   ====================== */


// Disable all boxes once winner is found or when game is draw
const disableBoxes = () => {
    for(let box of boxes){
        box.classList.add('disabled');
    }
}

// Player Win Message
const showWinner = (winner) => {
    disableBoxes();
    winningMessage.innerText = winner;
    popup.classList.remove('hide');
}

// Draw Game Message 
const drawGame = () => {
    disableBoxes();
    winningMessage.innerText = "It is a tie!";
    popup.classList.remove('hide');
}

// Win Logic
const checkWinner = () => {

    //Loops through all Winning patterns
    for(let pattern of winPatterns){

        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        // Check if boxes are filled
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {

            // Check if all boxes have same value
            if(pos1Val === pos2Val && pos1Val === pos3Val) {

                // Player who played last move will be winner
                // If Player 1 (X) played last move turnX will be false, so winner is Player 1
                turnX == false ? showWinner("Player 1 Wins!") : showWinner("Player 2 Wins!");
                return true;
            }
        }
    }
    return false;
};


/* =====================================
   Restart Game (Restart button onclick)
   ===================================== */

//Enable and reset boxes to default values (for new game)
const enableBoxes = () => {
    for(let box of boxes){
        box.classList.remove('disabled');
        box.innerHTML = "";
        box.classList.remove('player-1');
        box.classList.remove('player-2');
    }
}

newGame.addEventListener('click', () => {
    turnX = true;
    count = 0;
    enableBoxes();
    popup.classList.add('hide');
});