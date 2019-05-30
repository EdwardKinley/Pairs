document.addEventListener('DOMContentLoaded', () => {

  cardNumberOptions = [8, 12, 16, 20, 24, 28, 32, 36, 40];
  colours = ['red', 'yellow', 'green', 'blue', 'white', 'magenta', 'silver', 'dimgray', 'black', 'purple', 'salmon', 'maroon', 'darkorange', 'darkkhaki', 'lime', 'cyan', 'navy', 'mediumpurple', 'deeppink', 'sienna'];

  n = 0;
  nSoFar = 0;
  r = 0;
  c = 0;
  nCardsShowing = 0;
  ourColours = [];
  cardsShowing = [];

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
    // cardsSpace.textContent = n;
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
    newCard.addEventListener('click', showCard);
  }

  function showCard() {
    if (nCardsShowing <2) {
      this.removeEventListener('click', showCard);
      nCardsShowing ++;
      const cardColour = document.createElement('div');
      cardColour.className = 'cardColour';
      this.appendChild(cardColour);
      this.style.backgroundColor = 'black';
      cardColour.style.backgroundColor = `${this.colour}`;
      cardsShowing.push(this)
    }
    if (nCardsShowing == 2) {
      setTimeout(hideCards, 2000);
    }
  }

  function hideCards() {
    cardsShowing[0].style.backgroundColor = 'white';
    cardsShowing[1].style.backgroundColor = 'white';
    cardsShowing[0].childNodes[0].style.backgroundColor = 'white';
    cardsShowing[1].childNodes[0].style.backgroundColor = 'white';
  };


})
