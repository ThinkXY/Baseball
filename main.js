/*
Strikezone:
[0][1]
[2][3]

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
let bases = [false, false, false];
let gameOver = false;
let zoneSquare = -1;
let currentPitch = -1;

//hitting parameters (if nec)
//pitching parameters (if nec)

//hitting logic (cpu and guess pitch)
const cpuGuessPitch = () => {
    return Math.floor(Math.random() * 4);
}
const cpuGuessPitchLocation = () => {
    return Math.floor(Math.random() * 4);
}
//pitching logic (cpu and guess pitch)
const cpuGetPitch = () => {
    return Math.floor(Math.random() * 4);
}
const cpuGetPitchLocation = () => {
    return Math.floor(Math.random() * 4);
}

//function to move runners and update score on single
const onSingle = () => {
    document.querySelector("#statement2").innerHTML = "Single!";

    for(let i = 0; i < 3; i++){
      if(bases[i] === true){
          if(i === 0){
              //check team and update correct score
              (isBottomInning === false) ? awayScore++ : homeScore++;
              updateScore();
              bases[i] = false;
          }
          else{
              bases[i] = false;
              bases[i-1] = true;
          }
      }
  }

  bases[2] = true;
  resetCount();
  updateBases();
}

//function to move runners and update score on double
const onDouble = () => {
    document.querySelector("#statement2").innerHTML = "Double!";
    for(let i = 0; i < 3; i++){
        if(bases[i] === true){
            if(i <= 1){
                //check team and update correct score
                (isBottomInning === false) ? awayScore++ : homeScore++;
                updateScore();
                bases[i] = false;
            }
            else{
                bases[i] = false;
                bases[i-2] = true;
            }
        }
    }
  
    bases[1] = true;
    resetCount();
    updateBases();
}

//function to move runners and update score on triple
const onTriple = () => {
    document.querySelector("#statement2").innerHTML = "Triple!";
    for(let i = 0; i < 3; i++){
        if(bases[i] === true){
            //check team and update correct score
            (isBottomInning === false) ? awayScore++ : homeScore++;
            updateScore();
            bases[i] = false;
        }
    }
  
    bases[0] = true;
    resetCount();
    updateBases();
}

//function to move runners and update score on homerun
const onHR = () => {
    document.querySelector("#statement2").innerHTML = "Home Run!";
    for(let i = 0; i < 3; i++){
        if(bases[i] === true){
            //check team and update correct score
            (isBottomInning === false) ? awayScore++ : homeScore++;
            updateScore();
            bases[i] = false;
        }
    }
    //add one more run and update score
    (isBottomInning === false) ? awayScore++ : homeScore++;
    updateScore();
    resetCount();
    updateBases();
}

const onStrike = () => {
    console.log("strike");
    strikes++;
    document.querySelector("#statement2").innerHTML = "Strike!";

    if(strikes === 3){
        onOut();
    }
    else{
        //update boardstrikes
        document.querySelector("#strikes").innerHTML = strikes;
    }
}

const onBall = () => {
    console.log("ball");
    balls++;
    document.querySelector("#statement2").innerHTML = "Ball!";

    if(balls === 4){
        onWalk();
    }
    else{
        //update boardstrikes
        document.querySelector("#balls").innerHTML = balls;
    }
}

const onWalk = () => {
    console.log("walk");
    document.querySelector("#statement2").innerHTML = "Ball 4. Take your Base!";
    if(bases[2] === false){
        bases[2] = true;
    }
    else{
        if(bases[1] === false){
            bases[1] = true;
        }
        else{
            if(bases[0] === false){
                bases[0] = true;
            }
            else{
                (isBottomInning === false) ? awayScore++ : homeScore++;
                updateScore();
            }
        }
    }
    resetCount();
    updateBases();
}
const onOut = () => {
    document.querySelector("#statement2").innerHTML = "Out";
    outs++;
    updateOuts();
    resetCount();

    if(outs === 3){
        if(isGameOver() === true){
            //do game over stuff
            console.log("Game Over");
            document.querySelector("#statement").innerHTML = "Game Over!!!";
            //game over
            disablePitches();
            disableStrikezone();
            if(awayScore > homeScore){
                document.querySelector("#statement2").innerHTML = "You Lost! :(";
            }
            else{
                document.querySelector("#statement2").innerHTML = "You Win!!! :)";
            }
        }

        else{
            newInning();
        }
    }
    
}

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
    else{
        document.querySelector("#base1").style.backgroundColor = "white";
    }

    if(bases[1] === true){
        document.querySelector("#base2").style.backgroundColor = "rgb(247, 211, 6)";
    }
    else{
        document.querySelector("#base2").style.backgroundColor = "white";
    }
    if(bases[2] === true){
        document.querySelector("#base3").style.backgroundColor = "rgb(247, 211, 6)";
    }
    else{
        document.querySelector("#base3").style.backgroundColor = "white";
    }
}

//function to update count
const updateCount = () => {
    document.querySelector("#balls").innerHTML = balls;
    document.querySelector("#strikes").innerHTML = strikes;
}

//function to update outs
const updateOuts = () => {
    (outs === 1 || outs === 2) ? document.querySelector("#out1").style.backgroundColor = "rgb(247, 211, 6, .7)" : document.querySelector("#out1").style.backgroundColor = "white";
    (outs === 2) ? document.querySelector("#out2").style.backgroundColor = "rgb(247, 211, 6, .7)" : document.querySelector("#out2").style.backgroundColor = "white";
}

//check if game is over
const isGameOver = () => {
    if(inning === 9){
        /*if(isBottomInning === true){
            if(homeScore > awayScore){
                return true;
            }
        }*/
        if(homeScore > awayScore){
            return true;
        }
    }
    else if(inning > 9){
        if(homeScore > awayScore || homeScore < awayScore){
            return true;
        }
    }

    return false;
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

//reset count
const resetCount = () => {
    balls = 0;
    strikes = 0;
    updateCount();
};

//reset outs
const resetOuts = () => {
    outs = 0;
    updateOuts();
}

//reset bases
const resetBases = () => {
    bases = [false, false, false];
    updateBases();
};

//new inning
const newInning = () => {
    resetCount();
    resetOuts();
    resetBases();

    //update inning
    if(isBottomInning === false){
        isBottomInning = true;
        //flip triangle
        document.querySelector("#inning-indicator").style.transform = "rotate(180deg)";
        document.querySelector("#statement2").innerHTML = "You are Hitting!";
    }
    else{
        inning++;
        isBottomInning = false;
        document.querySelector("#inning-number").innerHTML = inning;
        document.querySelector("#inning-indicator").style.transform = "rotate(0deg)";
        document.querySelector("#statement2").innerHTML = "You are Pitching!";
    }
};

//enable pitch buttons
const enablePitches = () => {
    let pitchesArray = document.querySelectorAll(".pitch");

    pitchesArray.forEach(btn => {
        btn.disabled = false;
    });
}

//enable pitch buttons
const disablePitches = () => {
    let pitchesArray = document.querySelectorAll(".pitch");

    pitchesArray.forEach(btn => {
        btn.disabled = true;
        btn.style.backgroundColor = "white";
    });
}

//enable strikezone buttons
const enableStrikezone = () => {
    let zoneArray = document.querySelectorAll(".square-zone");

    zoneArray.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "white";
    });
}

//enable strikezone buttons
const disableStrikezone = () => {
    let zoneArray = document.querySelectorAll(".square-zone");

    zoneArray.forEach(btn => {
        btn.disabled = true;
    });
}

//click strikezone zone 1
const onClickTopLeft = () => {
    zoneSquare = 0;
    enablePitches();
    document.querySelector("#zone1").style.backgroundColor = "red";
    disableStrikezone();
};

//click strikezone zone 2
const onClickTopRight = () => {
    zoneSquare = 1;
    enablePitches();
    document.querySelector("#zone2").style.backgroundColor = "red";
    disableStrikezone();
};

//click strikezone zone 3
const onClickBottomLeft = () => {
    zoneSquare = 2;
    enablePitches();
    document.querySelector("#zone3").style.backgroundColor = "red";
    disableStrikezone();
};

//click strikezone zone 3
const onClickBottomRight = () => {
    zoneSquare = 3;
    enablePitches();
    document.querySelector("#zone4").style.backgroundColor = "red";
    disableStrikezone();
};

//click FB button
const onClickFB = () => {
    currentPitch = 0;
    document.querySelector("#fb").style.backgroundColor = "red";
    disablePitches();
    
    
    game();

    enableStrikezone();
};

//click CB button
const onClickCV = () => {
    currentPitch = 1;
    document.querySelector("#cv").style.backgroundColor = "red";
    disablePitches();
    
    
    game();

    enableStrikezone();
};

//click CH button
const onClickCH = () => {
    currentPitch = 2;
    document.querySelector("#ch").style.backgroundColor = "red";
    disablePitches();
    
    
    game();

    enableStrikezone();
};

//click SL button
const onClickSL = () => {
    currentPitch = 3;
    document.querySelector("#sl").style.backgroundColor = "red";
    disablePitches();
    
    
    game();

    enableStrikezone();
    console.log(bases);
};

//function for pitching
const pitch = () => {
    //get cpu batters guess pitch and guess location
    let guessPitch = cpuGuessPitch();
    let guessLocation = cpuGuessPitchLocation();

    //my values are currentPitch and zoneSquare

    if(guessPitch === currentPitch && guessLocation){
        //hr
        onHR();
    }
    else{
        let random = Math.floor(Math.random() * 16);
        //single, double, triple, out, strike, ball
        //random === 0
    
        if(random === 0){
            onSingle();
        }
        else if(random === 1){
            onDouble();
        }
        else if(random === 2){
            onTriple();
        }
        else if(random < 5){
            onBall();
        }
        else if(random < 7){
            onStrike();
        }
        else{
            onOut();
        }
    }
}

//function for pitching
const bat = () => {
    //get cpu batters guess pitch and guess location
    let cpuPitch = cpuGetPitch();
    let cpuLocation = cpuGetPitchLocation();

    if(cpuPitch === currentPitch && cpuLocation){
        //hr
        onHR();
    }
    else{
        //single, double, triple, out, strike, ball
        let random = Math.floor(Math.random() * 16);
        //single, double, triple, out, strike, ball

        if(random === 0){
            onSingle();
        }
        else if(random === 1){
            onDouble();
        }
        else if(random === 2){
            onTriple();
        }
        else if(random < 5){
            onBall();
        }
        else if(random < 7){
            onStrike();
        }
        else{
            onOut();
        }
    }
}

//function to play game
const game = (zoneParam, pitchParam) => {
    
    //pitching
    if(isBottomInning === false){
        pitch();
    }
    //batting
    else{
        bat();
    }
    //display game over when game is over
   
};

const main = () => {
    document.querySelector("#zone1").addEventListener("mouseup", () => {onClickTopLeft()});
    document.querySelector("#zone2").addEventListener("mouseup", () => {onClickTopRight()});
    document.querySelector("#zone3").addEventListener("mouseup", () => {onClickBottomLeft()});
    document.querySelector("#zone4").addEventListener("mouseup", () => {onClickBottomRight()});
    document.querySelector("#fb").addEventListener("mouseup", () => {onClickFB()});
    document.querySelector("#cv").addEventListener("mouseup", () => {onClickCV()});
    document.querySelector("#ch").addEventListener("mouseup", () => {onClickCH()});
    document.querySelector("#sl").addEventListener("mouseup", () => {onClickSL()});
}

//play game
//game();
main();