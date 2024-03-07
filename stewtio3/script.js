(function(){
    'use strict';
    console.log('reading JS');

    // variables for interface elements
    const bttn = document.querySelector('#action a');
    const game = document.querySelector('#game');
    const message = document.querySelector('#message');
    const action = document.querySelector('#action');
    const currentScore = document.querySelector('#score span');
    /* The variable below uses let because these elements are going to be
    removed from the page and added back in, so that event listeners can be
    removed and added back on to them. */
    let pads = document.querySelectorAll('#game div');
    //counter is used to determine if we are done with the sequence
    let counter = 0;

    // object keeps track of data within the game
    const gameData = {
        count: 3,
        increment: 3,
        score: 0,
        speed: 2000,
        sequence: [0, 0, 0],
        match: [1, 1, 1]
    }

    // Gets the game started
    bttn.addEventListener('click', function(event){
        event.preventDefault();
        gameData.sequence = [];
        callSequence(gameData.count, gameData.speed);
    });

    // A recursive function for creating the call sequence
    function callSequence(sequenceLength, sequenceSpeed){
        /* reassigning padds because after the first round they will be
        removed from the DOM and re-added in the setupNextRound function */
        pads = document.querySelectorAll('#game div');
        // This settimeOut is set for 600ms so the animation on the pad can finish.
        setTimeout( function(){
            //removes the .on class which has the animation for all the pads
            for( const eachPad of pads ){
                eachPad.removeAttribute('class');
            }
            // generate a random number between 1 & 9...
            const num = Math.floor(Math.random()*9)+1;
            // push the random number in the gameData.sequence object
            gameData.sequence.push(num);
            // animate the corresponding pad
            document.querySelector(`#pad${num}`).className = 'on';
            // increment the counter 
            counter++;
            /* If the sequence is not finishd, run the function again and
            animate the next pad in the sequence */ 
            if(counter < sequenceLength){
                /* this settimeOut runs for different lengths of time,
                as determined by the program. As the game continues the wait time 
                is shorter and shorter*/
                setTimeout(function(){
                    for( const eachPad of pads ){
                        eachPad.removeAttribute('class');
                    }
                    callSequence(sequenceLength, sequenceSpeed);
                }, sequenceSpeed);
                
            }

            /* If the sequence is complete, wait the programmed amount of
            time, then remove the .on class from all pads, clear out the gameData.match
            array and capture the response. */
            else {
                setTimeout(function(){
                    for( const eachPad of pads ){
                        eachPad.removeAttribute('class');
                    }
                    gameData.match = [];
                    captureResponse();
                }, sequenceSpeed);
                console.log(gameData.sequence);
            }
       }, 600);
    }

    /* This is the function that captures responses from the user, and
    checks to see if they have pressed the pads in the correct order. */
    function captureResponse(){
        action.innerHTML = '';
        message.innerHTML = 'Can you match the pattern?'
        /* The status variable is used to check the status of the game. Should it
        continue, or should it end because the player got the pattern wrong? */
        let status = 0;
        // looping through the array of pads...
        for( const eachPad of pads){
            // add an event listener to each pad
            eachPad.addEventListener('click', function(event){
                //when the player clicks a pad, get it's ID and update it's class so it animates
                const id = event.target.id;
                event.target.className = 'on';
                //after the animation has completed, remove the 'on' class from that pad.
                setTimeout(function(){
                    event.target.removeAttribute('class');
                }, 1000);
                /* The following line pulls out the number at the end of the ID for the
                pad that was clicked (charAt()), converts it into an integer (parseInt()) 
                Then pushes it into the gameData.match array (push())*/
                gameData.match.push(parseInt(id.charAt(3)));

                /* This if statement checks to see if the length of the two
                arrays is the same */ 
                if( gameData.match.length == gameData.sequence.length){
                    console.log(gameData.match);
                    /* This loops through the match array and checks
                    to see if each element matches the corresponding element in the 
                    sequence array. */
                    for( let i=0; i<gameData.match.length; i++){
                        /* if any of the elements in the array do not match, then status
                        is set to zero and the player loses the game */
                        if( gameData.match[i] != gameData.sequence[i]){
                            status = 0;
                            message.innerHTML = "Sorry you lose. Better luck next time!";
                        }
                        /* If none of the matches in the loop trigger an error, status
                        is set to 1 and that value will be used to continue the game */
                        else {
                            status = 1;
                        }
                    }
                    //this only runs if the game continues...
                    if(status){
                        /* settimeOut is used here just to provide a little time for the game to continue.SetupNextRound sets up the game for the next sequence*/
                        setTimeout(setupNextRound, 2000);
                    }
                }
                
            });
        }
    }

    /* This function sets up the game for the next sequence and updates the game variables
    and interface. */
    function setupNextRound(){
        //reset the counter for the next sequence
        counter = 0;
        // update the score
        gameData.score = gameData.score + gameData.count*3;
        /* the increment variable is used to determine how many rounds have each count.
        Currently, the game is set to three rounds of three pads, three rounds of four pads, etc. */
        gameData.increment = gameData.increment -1;
        /* if the player completed three rounds, increase the count and reset the incrementer */
        /* TODO: introduce "levels", increase levels for the player every time the count goes up */
        if(gameData.increment == 0){
            gameData.count = gameData.count+1;
            gameData.increment = 3;
        }
        // clear out the sequence array. The match one is cleared out at the end of the sequence.
        gameData.sequence = [];
        // Increase the game speed, as long as it is not any faster than 600ms.
        if( gameData.speed > 600 ){
            gameData.speed = gameData.speed-200;
        }
        // set the new score
        currentScore.innerHTML = gameData.score;
        message.innerHTML = "Great job! You got that one ready for the next one?";
        action.innerHTML = '<a href="#">Start Next Round</a>';
        /* This replaces all the pads with new ones. This is necessary otherwise the old pads will
        get additional event listeners added to them in the captureResponse() function. There is the added
        benefit of not having event listeners on the pads during the callSequence phase of the game. */
        game.innerHTML = '<div id="pad1"></div><div id="pad2"></div><div id="pad3"></div><div id="pad4"></div><div id="pad5"></div><div id="pad6"></div><div id="pad7"></div><div id="pad8"></div><div id="pad9"></div>';

        /* This event listener kicks off the start of the next callSequence function and continues 
        the game. */
        document.querySelector('#action a').addEventListener('click', function(event){
            event.preventDefault();
            callSequence(gameData.count, gameData.speed);
            setTimeout(function(){
                message.innerHTML = '';
                action.innerHTML = '';
            }, 1000);
        } );
    }

})();

//<img src="https://placekitten.com/200/200" int="kitten">