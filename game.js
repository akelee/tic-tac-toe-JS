window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    //variables in the game. creat array w 9 empty strings for the board

    let board = ['','','','','','','','',''];
    let currentPlayer = 'x';
    let isGameActive = true;

    //announce end-game state with variables

    const winnerX = 'winnerX';
    const winnerO = 'winnerO';
    const tie = 'tie';

    //store all winning condition states in an array of arrays

    /* 
    Visualization of board tile index

    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    //implement handle result validation function. check for winner by looping thru winConditions array 

    function handleResultValidation() {
        let roundWon = false;
        for(let i = 0; i <= 7; i++) {
            const winConditions = winningConditions[i];
            const a = board[winConditions[0]];
            const b = board[winConditions[1]];
            const c = board[winConditions[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }    
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
        
    }
// if there's a winner:
    if (roundWon) {
        announce(currentPlayer === 'x' ? winnerX : winnerO);
        isGameActive = false;
        return;
    }

    //if it's a tie and no empty strings left:
    
    if(!board.includes(''))
    announce(tie);
}

//have to announce winner or end-game result w helper function through a string called 'type'

const announce = (type => {
    switch(type) {
        case winnerO:
            announcer.innerHTML = 'winner: o';
            break;
    
        case winnerX:
            announcer.innerHTML = 'winner: x';
            break;

        case tie:
            announcer.innerHTML = 'tie';
            break;   
    }
    announcer.classList.remove('hide');
});

//isValid action function to check if tile has value already. If it does, returns false. Otherwise, returns true. this function makes sure players play empty tiles only on their turn

const isValidAction = (tile) => {
    if(tile.innerText === 'x' || tile.innerText === 'o'){
        return false;
    }
    return true;
};

//updateBoard function- sets value of element in the board array in given position to the value of currentPlayer variable

const updateBoard = (index) => {
    board[index] = currentPlayer;
}

    //remove classList of current player and change from X to O or O to X
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

    //implement userAction function that represents a turn in the game. Function will be called when user clicks a tile
        const userAction = (tile, index) => {
            if(isValidAction(tile) && isGameActive) {
                tile.innerText = currentPlayer;
                tile.classList.add(`player${currentPlayer}`);
                updateBoard(index);
                handleResultValidation();//check if there's winner or not
                changePlayer();//call this method after
            }
        }

    //implement resetBoard function
    
    const resetBoard = () => {
        board =['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');
        //player x starts game each time
        
        if(currentPlayer === 'o') {
            changePlayer();
        }

    //update ui. set innertext to empty string and remove any player-related classes

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerx');
        tile.classList.remove('playero');
    });
    }

    //go to tiles array and attach an eventlistener to every tile on board

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
