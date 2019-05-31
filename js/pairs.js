document.addEventListener('DOMContentLoaded', () => {

  cardNumberOptions = [8, 12, 16, 20, 24, 28, 32, 36, 40];
  colours = ['red', 'yellow', 'green', 'blue', 'white', 'magenta', 'silver', 'dimgray', 'black', 'purple', 'salmon', 'maroon', 'darkorange', 'darkkhaki', 'lime', 'cyan', 'navy', 'mediumpurple', 'deeppink', 'sienna'];

  n = 0;
  nSoFar = 0;
  r = 0;
  c = 0;
  cardsShowing = 0;
  ourColours = [];
  cardsShowing = [];
  cardsToBeFound = [];

  const main = document.querySelector('.main');

  showCardNumberOptions();

  function showCardNumberOptions() {
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
        startGame();
      })
    }
  }

  function startGame() {
    main.innerHTML = '';

    r = Math.ceil( (n*5/8)**0.5 );
    c = Math.ceil( n/r );

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
    newCardSpace.style.width = `${(5/8)*100/r}%`
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
    console.log('cards showing:', cardsShowing);
    if (cardsShowing.length == 2) {
      if (cardsShowing[0].colour != cardsShowing[1].colour) {
        setTimeout(hideCards, 1000);
      }
    }
  }

  function hideCards() {
    console.log(cardsShowing[0].childNodes[0]);
    cardsShowing[0].removeChild(cardsShowing[0].childNodes[0]);
    cardsShowing[1].removeChild(cardsShowing[1].childNodes[0]);
    console.log(cardsShowing[0].childNodes[0]);
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
