/*
Strikezone:
[00][01] = [0][1]
[10][11]   [2][3]

Pitches:
FB : 0
CB : 1
CH : 2
SL : 3

Bases:
                [2]
[3, 2, 1] => [3]   [1]

false = not on base
true = on base
*/


//initialize variables
let homeScore = 0;
let awayScore = 0;
let inning = 1;
let balls = 0;
let strikes = 0;
let outs = 0;
let isBottomInning = false;
let is9thInning = false;
let bases = [false, false, true];
let gameOver = false;
let zoneSquare = -1;
let currentPitch = -1;

//hitting parameters
//pitching parameters

//hitting logic (cpu and guess pitch)

//pitching logic (cpu and guess pitch)

//probably logic for moving runners

//

//update score function (based on home and away score)
const updateScore = () => {
    document.querySelector("#away-score").innerHTML = awayScore;
    document.querySelector("#home-score").innerHTML = homeScore;
};

//update bases function
const updateBases = () => {
    if(bases[0] === true){
        document.querySelector("#base1").style.backgroundColor = "rgb(247, 211, 6)";
    }
    if(bases[1] === true){
        document.querySelector("#base2").style.backgroundColor = "rgb(247, 211, 6)";
    }
    if(bases[2] === true){
        document.querySelector("#base3").style.backgroundColor = "rgb(247, 211, 6)";
    }
}

//function to update count
const updateCount = () => {
    document.querySelector("#balls").innerHTML = balls;
    document.querySelector("#strikes").innerHTML = strikes;
}

//check if game is over
const isGameOver = () => {

};

//function to reset game variables to initial values
const resetGame = () => {
    homeScore = 0;
    awayScore = 0;
    inning = 1;
    balls = 0;
    strikes = 0;
    outs = 0;
    isBottomInning = false;
    is9thInning = false;
    bases = [false,false,false];
    gameOver = false;
    zoneSquare = -1;
    currentPitch = -1;
};

//function to play game
const game = () => {
    updateCount();
    //check game over
    /*while(is9thInning === false && gameOver === false){

        //pitch
        if(isBottomInning === false){
            while (outs < 3 && gameOver === false){
                //change to pitch interface
                //pitch logic
            }
        }
        else{
            while (outs < 3 && gameOver === false){
                //change to hit interface
                //hit logic
            }
        }
        //display game over when game is over
    }*/
};

//play game
game();