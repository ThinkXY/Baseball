//initialize variables
let homeScore = 0;
let awayScore = 0;
let inning = 1;
let outs = 0;
let isBottomInning = false;
let is9thInning = false;
let bases = [0,0,0];
let gameOver = false;

//hitting parameters
//pitching parameters

//hitting logic (cpu and guess pitch)

//pitching logic (cpu and guess pitch)

//probably logic for moving runners

//check if game is over
const isGameOver = () => {

};

//function to reset game variables to initial values
const resetGame = () => {
    homeScore = 0;
    awayScore = 0;
    inning = 1;
    outs = 0;
    isBottomInning = false;
    is9thInning = false;
    bases = [0,0,0];
    gameOver = false;
};

//function to play game
const game = () => {

    //check game over
    while(is9thInning === false && gameOver === false){

        //pitch
        if(isBottomInning === false){
            while (outs < 3 && gameOver === false){
                //change to pitvh interface
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
    }
};

//play game
game();