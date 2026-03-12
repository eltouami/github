( function() {
    'use strict';
    console.log('reading JS');

    const body = document.querySelector('body');
    const controlArea = document.querySelector('#controlArea');
    const startGame = document.querySelector('#startGame');

    const penguin = document.querySelector('#penguin');

    const gameData = {
        // FINISH DICE PICS
        // dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'], 
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    // body.style.backgroundImage = "url('images/p2\ background.png')";    

    // setup plan:
    // finish consts
    // open on rules
    // start game clicked -> chooses starting player, changes html to have roll and pass buttons (in same place)
    // adds to control area, restart button, if pressed location.reload() ; when click rules open overlay ; when mute then mute volume
    // have dice show up next to penguin - absolute pos, fade in between?
    // when 0, empty bucket ; if total != 0 && > 6, fish pic 1 (1 fish) ; else if > 12, fish pic 2 (2 fish) ; else if > 18, fish pic 3 (3 fish) ; else if > 24 fish pic 4 ; else fish pic 5 (or can be in actual loop)
    // set up turn -> throw dice - if for all scenarios --> set up turn each time --> check winning cond --> show current score = change number


}());