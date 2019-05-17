document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');

  cardNumberOptions = [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52];

  showCardNumberOptions();

  function showCardNumberOptions() {
    const main = document.querySelector('.main');
    const optionsSpace = document.createElement('div');
    optionsSpace.className = 'optionsSpace';
    main.appendChild(optionsSpace);
    for (i=0; i<cardNumberOptions.length; i++) {
      const option = document.createElement('div');
      option.className = 'cardNumberOption';
      option.textContent = cardNumberOptions[i];
      optionsSpace.appendChild(option);
      option.addEventListener('click', () => {
        console.log(option.textContent);
      })
    }
  }

})
