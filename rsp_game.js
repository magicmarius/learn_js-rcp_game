let psr = ["paper", "scissors", "rock"];
let userScore = 0;
let compScore = 0;

/*
    Prompts user to select rock,paper,scissors, or quit.
    Runs each round of play.
*/
function promptSelection() {

    while (true) {

        let input = prompt("Make your move by typing: rock or paper or scissors or quit...");

        // in case user presses cancel for prompt, we simply quit
        if (input === null) {
            return -1;
        }

        input = input.toLowerCase();

        if (psr.includes(input)) {
            return psr.indexOf(input); 
        }
        else if (input === "quit") {
            return -1;
        }
        else {
            console.log(`${input} is not a valid selection.`);
        }
    }

}

/* 
    Prompts if the user wants to play again
    Runs at the end of five rounds of play.
*/
function promptPlayAgain() {

    while (true) {

        let input = prompt("Do you want to play again? (y/n)");

        // in case user presses cancel for prompt, we simply quit
        if (input === null) {
            return false;
        }

        input = input.toLowerCase();

        if (input === "y") {
            return true;
        }
        else if (input === "n") {
            console.log("Quitting game...");
            return false;
        }
        else {
            console.log(`${input} is invalid.  Please type 'y' or 'n'`);
        }
    }

}


/*
    Computer plays by returning a random integer between 0 and 3(not inclusive)
*/
function computerPlay() {

    let sel = Math.random();
    sel = Math.floor(sel*3);
    return sel;
    
}


/*
    Returns -1 for a tie 
            0 for user loss
            1 for user win
*/
function calcResults(compPlay, userPlay){

    if (compPlay === userPlay) {
        return -1;
    }
    else {
        return compPlay === ((userPlay+1) % 3) ? 0 : 1;
    }

}


/*
    Prints the results from a single round to the console.
*/
function printResults(result, compPlay, userPlay) {

    if (result === -1) {
        console.log(`It's a tie! You both played ${psr[compPlay]}`);
    }
    else if (result === 0) {
        console.log(`Computer wins!  ${psr[compPlay]} beats ${psr[userPlay]}`);
    }
    else {
        console.log(`You win! ${psr[userPlay]} beats ${psr[compPlay]}`);
    }
    console.log(`Current Score: User - ${userScore}...Computer - ${compScore}`);  
    console.log("\n\n");
}


/*
    Prints final results from five rounds to the console.
*/
function printFinalResults() {

    console.log("FINAL RESULTS");

    if (compScore < userScore) {
        console.log("You win!")
    }
    else if (compScore > userScore) {
        console.log("You lose!");
    }
    else {
        console.log("It's tie!");
    }
    console.log(`Final Score: User - ${userScore}...vs...Computer - ${compScore}`); 
}


/*
    Main function that just let's the user play five rounds.
    The user can play as many five rounds as they like.
    At the end of each five rounds, the scores and console are cleared.
*/
function playFiveRounds() {
    let playAgain = true;
    while (playAgain) {

        // play five rounds
        for (let i = 0; i < 5; i++) {

            let compPlay = computerPlay();
            let userPlay = promptSelection();
            
            if (userPlay === -1) {
                console.log("Quitting game...");
                return;
            }

            let result = calcResults(compPlay, userPlay);

            if (result === 0) {
                compScore++;
            }
            else if (result === 1) {
                userScore++;
            }
            
            printResults(result, compPlay, userPlay);
        }

        printFinalResults();
    
        // check if user wants to play again
        playAgain = promptPlayAgain();
        if (playAgain) {
            compScore = 0;
            userScore = 0;
            console.clear();
        }

    }        
}


playFiveRounds();