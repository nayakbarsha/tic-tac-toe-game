let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnof0 = true; 
let count = 0;
let draw = false;

const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box is clicked");
        if(turnof0){
            box.innerText = "0";
            box.style.color = "black";
            turnof0 = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "red";
            turnof0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }

        checkWinner(); 
        
    });
});

const disableBoxes = ()=>{
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const enableBoxes = ()=>{
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

const showWinner = (winner)=> {
    msg.innerText = "Winner is " + winner;
    // msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hidden");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winningCombos){
        let pos0 = boxes[pattern[0]].innerText;
        let pos1 = boxes[pattern[1]].innerText;
        let pos2 = boxes[pattern[2]].innerText;
        if(pos0 != "" && pos1 != "" && pos2 != ""){
            if(pos0 === pos1 && pos1=== pos2){
                showWinner(pos0);
                return true;
            }
        }
    }
}

const gameDraw = () => {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hidden");
            disableBoxes();
            console.log(count);
}

const resetGame = () => {
    turnof0 = true;
    count  = 0;
    enableBoxes();
    msgContainer.classList.add("hidden");
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);