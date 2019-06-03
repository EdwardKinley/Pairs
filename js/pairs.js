document.addEventListener('DOMContentLoaded', () => {

  playerNumberOptions = [1, 2, 3, 4];
  cardNumberOptions = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
  colours = ['red', 'yellow', 'green', 'blue', 'white', 'magenta', 'dimgray', 'black', 'purple', 'salmon', 'maroon', 'darkorange', 'darkkhaki', 'lime', 'cyan', 'navy', 'mediumpurple', 'deeppink', 'sienna', 'silver'];

  numberOfPlayers = 0;
  players = [];
  currentPlayer = 1;
  n = 0;
  nSoFar = 0;
  r = 0;
  c = 0;
  ourColours = [];
  cardsShowing = [];
  cardsToBeFound = [];
  numberOfMoves = 0;

  const main = document.querySelector('.main');

  showCardNumberOptions();

  function showCardNumberOptions() {
    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = 'Select number of cards:';
    main.appendChild(instruction);
    const optionsSpace = document.createElement('div');
    optionsSpace.className = 'optionsSpace';
    main.appendChild(optionsSpace);
    for (i=0; i<cardNumberOptions.length; i++) {
      const option = document.createElement('div');
      option.className = 'cardNumberOption';
      option.textContent = cardNumberOptions[i];
      optionsSpace.appendChild(option);
      option.addEventListener('click', () => {
        n = parseInt(option.textContent);
        halfColours = colours.splice(0,n/2);
        ourColours = halfColours.concat(halfColours);
        selectNumberOfPlayers();
      })
    }
  }

  function selectNumberOfPlayers() {
    main.innerHTML = '';
    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = 'Select number of players:';
    main.appendChild(instruction);
    const optionsSpace = document.createElement('div');
    optionsSpace.className = 'optionsSpace';
    main.appendChild(optionsSpace);
    for (i=0; i<playerNumberOptions.length; i++) {
      const option = document.createElement('div');
      option.className = 'cardNumberOption';
      option.textContent = playerNumberOptions[i];
      optionsSpace.appendChild(option);
      option.addEventListener('click', () => {
        numberOfPlayers = parseInt(option.textContent);
        startGame();
      })
    }
  }

  function startGame() {
    main.innerHTML = '';

    r = Math.ceil( (n*5/8)**0.5 );
    c = Math.ceil( n/r );

    addPlayersSpace();
    addButtonsSpace();
    addCardsSpace();
    if (numberOfPlayers > 1) {
      document.querySelector(`#player${currentPlayer}name`).style.color = 'black';
    }
  }

  function addPlayersSpace() {
    const playersSpace = document.createElement('div');
    playersSpace.className = 'playersSpace';
    main.style.flexDirection = 'row';
    main.appendChild(playersSpace);

    for (j=0; j<numberOfPlayers; j++) {
      const newPlayer = document.createElement('div');
      newPlayer.className = 'player';
      newPlayer.id = `player${j+1}`;
      newPlayer.style.height = `${98/(numberOfPlayers+1)}vh`;
      newPlayer.style.fontSize = `${20/(numberOfPlayers+1)}vh`;
      if (j>0) { newPlayer.style.color = 'grey'; }

      if (numberOfPlayers > 1) {
        const newPlayerName = document.createElement('input');
        newPlayerName.className = 'playerName';
        newPlayerName.id = `player${j+1}name`;
        newPlayerName.style.width = `${120/(numberOfPlayers+1)}vh`;
        newPlayerName.style.fontSize = `${20/(numberOfPlayers+1)}vh`;
        newPlayerName.value = `Player ${j+1}`;
        newPlayer.appendChild(newPlayerName);
      }

      playersSpace.appendChild(newPlayer);
      const playerScore = document.createElement('div');
      playerScore.className = 'playerScore';
      playerScore.id = `player${j+1}score`;
      playerScore.style.fontSize = `${40/(numberOfPlayers+1)}vh`;
      playerScore.textContent = '0';
      newPlayer.appendChild(playerScore);
    }
  }

  function addButtonsSpace() {
    const playersSpace = document.querySelector('.playersSpace');
    const buttonsSpace = document.createElement('div');
    buttonsSpace.className = 'player';
    buttonsSpace.id = 'buttonsSpace';
    buttonsSpace.style.height = `${98/(numberOfPlayers+1)}vh`;
    playersSpace.appendChild(buttonsSpace);

    const numberOfMovesSpace = document.createElement('div');
    numberOfMovesSpace.id = 'numberOfMovesSpace';
    numberOfMovesSpace.style.color = 'black';
    if (numberOfPlayers ==1) {
      numberOfMovesSpace.style.fontSize = `${6/(numberOfPlayers+1)}vh`
    } else {
      numberOfMovesSpace.style.fontSize = `${10/(numberOfPlayers+1)}vh`
    }
    buttonsSpace.appendChild(numberOfMovesSpace);
    numberOfMovesSpace.textContent = 'Total moves: 0';

    const anotherButton = document.createElement('button');
    anotherButton.textContent = 'Another';
    anotherButton.style.fontSize = `${12/(numberOfPlayers+1)}vh`;
    buttonsSpace.appendChild(anotherButton);
    anotherButton.addEventListener('click', () => {
      nSoFar = 0;
      cardsShowing = 0;
      cardsShowing = [];
      cardsToBeFound = [];
      numberOfMoves = 0;
      document.querySelector('#numberOfMovesSpace').textContent = `Total moves: ${numberOfMoves}`;
      for (i=0; i<numberOfPlayers; i++) {
        document.querySelector(`#player${i+1}`).score = 0;
        document.querySelector(`#player${i+1}score`).textContent = '0';
      }
      replaceCardsSpace();
    })

    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New';
    newGameButton.style.fontSize = `${12/(numberOfPlayers+1)}vh`;
    buttonsSpace.appendChild(newGameButton);
    newGameButton.addEventListener('click', () => {
      console.log('new game starting...');
      location.reload();
    })
  }

  function replaceCardsSpace() {
    const cardsSpace = document.querySelector('.cardsSpace');
    cardsSpace.innerHTML = '';
    colours = ['red', 'yellow', 'green', 'blue', 'white', 'magenta', 'dimgray', 'black', 'purple', 'salmon', 'maroon', 'darkorange', 'darkkhaki', 'lime', 'cyan', 'navy', 'mediumpurple', 'deeppink', 'sienna', 'silver'];
    halfColours = colours.splice(0,n/2);
    ourColours = halfColours.concat(halfColours);
    for (k=0; k<r; k++) {
      addRowToCardsSpace(cardsSpace, k);
    }
  }

  function addCardsSpace() {
    const cardsSpace = document.createElement('div');
    cardsSpace.className = 'cardsSpace';
    main.appendChild(cardsSpace);
    for (i=0; i<r; i++) {
      addRowToCardsSpace(cardsSpace, i);
    }
  }

  function addRowToCardsSpace(cardsSpace, currentRow) {
    const newRow = document.createElement('div');
    newRow.className = 'row';
    cardsSpace.appendChild(newRow);
    newRow.style.height = `${100/r}%`;
    newRow.style.fontSize = `${100/r}vh`
    newRow.style.lineHeight = '100%';
    for (j=0; j<c; j++) {
      nSoFar ++;
      if (nSoFar <= n) {
        addCardSpaceToRow(newRow, j);
      }
    }
  }

  function addCardSpaceToRow(row, j) {
    const newCardSpace = document.createElement('div');
    newCardSpace.className = 'cardSpace';
    row.appendChild(newCardSpace);
    newCardSpace.style.width = `${(5/8)*100/r}vh`
    addCardToCardSpace(newCardSpace);
  }

  function addCardToCardSpace(cardSpace) {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    cardSpace.appendChild(newCard);
    newCard.style.height = '95%';
    newCard.style.width = '90%';
    const randomNumber = Math.floor(Math.random() * ourColours.length);
    newCard.colour = ourColours.splice(randomNumber, 1)[0];
    cardsToBeFound.push(newCard);
    newCard.addEventListener('click', showCard);
  }

  function showCard() {
    if (cardsShowing.length <2) {
      this.removeEventListener('click', showCard);
      const cardColour = document.createElement('div');
      cardColour.className = 'cardColour';
      this.appendChild(cardColour);
      this.style.backgroundColor = 'black';
      cardColour.style.backgroundColor = `${this.colour}`;
      cardsShowing.push(this)
    }
    if (cardsShowing.length == 2) {
      numberOfMoves ++;
      document.querySelector('#numberOfMovesSpace').textContent = `Total moves: ${numberOfMoves}`;
      for (i=0; i<cardsToBeFound.length; i++) {
        cardsToBeFound[i].removeEventListener('click', showCard);
      }
      if (cardsShowing[0].colour != cardsShowing[1].colour) {
        document.querySelector(`#player${currentPlayer}`).style.color = 'grey';
        if (numberOfPlayers > 1) {
          document.querySelector(`#player${currentPlayer}name`).style.color = 'grey';
        }
        if (currentPlayer == numberOfPlayers) {
          currentPlayer = 1;
        } else {
          currentPlayer ++;
        }
        setTimeout(makeStyleColorBlackAfterDelay, 1000);
        setTimeout(hideCards, 1000);
      } else {
        cardsToBeFound.splice(cardsToBeFound.indexOf(cardsShowing[0]),1);
        cardsToBeFound.splice(cardsToBeFound.indexOf(cardsShowing[1]),1);
        cardsShowing = [];
        document.querySelector(`#player${currentPlayer}score`).textContent ++;
        makeCardsTurnable();
      }
    }
  }

  function makeStyleColorBlackAfterDelay() {
    document.querySelector(`#player${currentPlayer}`).style.color = 'black';
    if (numberOfPlayers > 1) {
      document.querySelector(`#player${currentPlayer}name`).style.color = 'black';
    }
  }

  function hideCards() {
    cardsShowing[0].removeChild(cardsShowing[0].childNodes[0]);
    cardsShowing[1].removeChild(cardsShowing[1].childNodes[0]);
    cardsShowing[0].style.backgroundColor = 'white';
    cardsShowing[1].style.backgroundColor = 'white';
    makeCardsTurnable();
  };

  function makeCardsTurnable() {
    cardsShowing = [];
    for (i=0; i<cardsToBeFound.length; i++) {
      cardsToBeFound[i].addEventListener('click', showCard);
    }
  }

})
