( function() {
    'use strict';
    console.log('reading JS');

    // dom / variables

    const restartGameBtn = document.querySelector('#restartGame');
    const rulesBtn = document.querySelector('#rules');
    const closeOverlayBtn = document.querySelector('#closeOverlay');
    const overlay = document.querySelector('#overlay');
    const windowed = document.querySelector('#windowed');
    const actionButtons = document.querySelector('#action-buttons');
    const diceArea = document.querySelector('#dice');
    const turnTitle = document.querySelector('#turn-title');
    const score1 = document.querySelector('#score1');
    const score2 = document.querySelector('#score2');
    const penguinImg = document.querySelector('#penguin');
    const allButtons = document.querySelectorAll('button');

    const volumeBtn = document.querySelector('#volume');
    const volumeIcon = document.querySelector('#volumeIcon');

    // sound setup

    const rollSound = new Audio('audio/roll.mp3');
    const winSound = new Audio('audio/win.mp3');
    const loseSound = new Audio('audio/lose.mp3');
    const passSound  = new Audio('audio/pass.mp3');
    const clickSound = new Audio('audio/click.mp3');

    let isMuted = false;

    // mute btn
    function playSound(sound) {
        if (isMuted) return;
        sound.currentTime = 0;
        sound.play();
    }

    volumeBtn.addEventListener('click', function () {
        isMuted = !isMuted;
        volumeIcon.src = isMuted ? 'images/volume_off.png' : 'images/volume_up.png';
        volumeIcon.alt = isMuted ? 'muted' : 'sound on';
    });

    // all buttons besides roll and pass
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function () {
            playSound(clickSound);
        });
    }

    // game data
    const gameData = {
        diceTop: ['1top.png', '2top.png', '3top.png', '4top.png', '5top.png', '6top.png'],
        diceBottom: ['1bottom.png', '2bottom.png', '3bottom.png', '4bottom.png', '5bottom.png', '6bottom.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    // penguin flipping (and background if want)
    function updateMirror() {
        if (gameData.index === 0) {
            // document.body.style.backgroundImage = "url('images/p1-background.png')";
            penguinImg.src = 'images/penguin-mirrored.png';
            diceArea.classList.remove('mirrored');
        } else {
            // document.body.style.backgroundImage = "url('images/p2-background.png')";
            penguinImg.src = 'images/penguin.png';
            diceArea.classList.add('mirrored');
        }
    }

    // opening overlay
    function openOverlay() {
        overlay.classList.remove('hidden');
        overlay.classList.add('shown');
        windowed.style.visibility = 'visible';
    }

    function closeOverlay() {
        overlay.classList.remove('shown');
        overlay.classList.add('hidden');
        windowed.style.visibility = 'hidden';
    }

    openOverlay(); // auto-open on load

    rulesBtn.addEventListener('click', openOverlay);
    closeOverlayBtn.addEventListener('click', closeOverlay);

    // restart btn
    restartGameBtn.addEventListener('click', function () {
        playSound(clickSound);
        setTimeout(() => location.reload(), 180);
    });


    // start game
    
    actionButtons.addEventListener('click', function handleStart(event) {
        if (event.target.id !== 'startGame') return;
        actionButtons.removeEventListener('click', handleStart);

        gameData.index = Math.round(Math.random());
        gameData.score = [0, 0];

        // show restart, update scores
        restartGameBtn.classList.remove('hidden');
        updateScoreDisplay();
        updateMirror();
        setUpTurn();
    });

    // set up turn
    function setUpTurn() {
        turnTitle.textContent = `${gameData.players[gameData.index]}'s Turn`;
        diceArea.innerHTML = '';

        actionButtons.innerHTML = `<button id="rollDice">Roll</button>`;
        document.querySelector('#rollDice').addEventListener('click', throwDice);
    }

    // throw dice
    function throwDice() {
        playSound(rollSound);
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        diceArea.innerHTML = `
            <img src="images/${gameData.diceTop[gameData.roll1 - 1]}" alt="die 1">
            <img src="images/${gameData.diceBottom[gameData.roll2 - 1]}" alt="die 2">
        `;

        // snake eyes
        if (gameData.rollSum === 2) {
            playSound(loseSound);
            gameData.score[gameData.index] = 0;
            updateScoreDisplay();
            turnTitle.textContent = `Wipeout! Snake Eyes — ${gameData.players[gameData.index]}'s fish all escaped`;
            actionButtons.innerHTML = '';
            switchPlayer();
            setTimeout(function() {
                updateMirror();
                playSound(passSound);
                setUpTurn();
            }, 2800);
        }

        // one die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            turnTitle.textContent = `Fish fled! Switching to ${gameData.players[gameData.index === 0 ? 1 : 0]}`;
            actionButtons.innerHTML = '';
            switchPlayer();
            setTimeout(function() {
                updateMirror();
                playSound(passSound);
                setUpTurn();
            }, 2200);
        }

        // normal roll
        else {
            gameData.score[gameData.index] += gameData.rollSum;
            updateScoreDisplay();

            if (checkWinningCondition()) return;

            actionButtons.innerHTML = `
                <button id="rollDice">Roll</button>
                <button id="passTurn">Pass</button>
            `;
            document.querySelector('#rollDice').addEventListener('click', throwDice);
            document.querySelector('#passTurn').addEventListener('click', function () {
                playSound(passSound);
                switchPlayer();
                updateMirror();
                setUpTurn();
            });
        }
    }

    // switch players
    function switchPlayer() {
        gameData.index = gameData.index === 0 ? 1 : 0;
    }

    // check win cond
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            playSound(winSound);
            turnTitle.textContent = `Victory feast!! ${gameData.players[gameData.index]} wins!`;
            actionButtons.innerHTML = '';
            diceArea.innerHTML = '';
            return true;
        }
        return false;
    }

    // update score
    function updateScoreDisplay() {
        score1.textContent = gameData.score[0];
        score2.textContent = gameData.score[1];
    }   

}());