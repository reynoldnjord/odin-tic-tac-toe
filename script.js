const player = (xo) => {
    function accessXO(){
        return xo;
    }

    return {accessXO};
}

const gameBoard = (() => {
    const board= ["","","","","","","","",""];

    const setGameBoard= (index, xo) => {
        if (index > board.length) return;
        board[index] = xo;
    }

    const getXO = (index) => {
        if (index > board.length) return;
        return board[index];
    }

    function resetGameBoard(){
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        }
    }

    return {setGameBoard, getXO, resetGameBoard};
})();

const displayGame = (() => {
    const squares = document.querySelectorAll('.square');
    const display = document.querySelector('.display');
    const restartButton = document.querySelector('button');

    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            if (gameLogic.returnIsOver() || e.target.textContent !== "") return;
            gameLogic.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
        })
    })

    restartButton.addEventListener('click', () => {
        gameBoard.resetGameBoard();
        gameLogic.resetGameLogic();
        updateGameBoard();
        displayDisplay("X's move");
    })
    
    function updateGameBoard(){
        for (let i = 0; i < squares.length; i++){
            squares[i].textContent = gameBoard.getXO(i);
        }
    }

    function displayResult(result){
        if (result === "Tie"){
            displayDisplay("It's a Tie!");
            return;
        }
        if (result === "X"){
            displayDisplay("X has won!");
            return;
        }
        if (result === "O"){
            displayDisplay('O has won!');
            return;
        }
    }
    
    function displayDisplay(text){
        display.innerText = text; 
    }
    return {displayResult, displayDisplay};
})();

const gameLogic = (() => { 
    const playerX = player('X');
    const playerO = player('O');
    let round = 1;
    let isOver = false;

    function playRound(index){
        gameBoard.setGameBoard(index, getCurrentPlayer());
        if (decideWinner(index)){
            displayGame.displayResult(getCurrentPlayer());
            isOver = true;
            return;
        }
        if (round === 9){
            displayGame.displayDisplay("It's a tie");
            isOver = true;
            return;
        }
        round++;
        displayGame.displayDisplay(`${getCurrentPlayer()}'s move`);
    } 

    function getCurrentPlayer(){ //took hint
        return round % 2 === 1 ? playerX.accessXO() : playerO.accessXO();
    }

    function decideWinner(index){ //took hint
        const win = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        return win.filter(instance => instance.includes(index)) //took hint
            .some(mightInstance => mightInstance.every(
                index => gameBoard.getXO(index) === getCurrentPlayer()
            ));
    }

    function resetGameLogic(){
        round = 1;
        isOver = false
    }

    function returnIsOver(){
        return isOver;
    }

    return {playRound, returnIsOver, resetGameLogic};
})();