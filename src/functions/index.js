export const isAWord = (gss, ans, guessIndex) => {
  let answerArray = ans.toUpperCase().split('');
  let guessArray = gss.split('');

  guessArray.forEach((l, i) => {
    const keyHit = window.document.getElementById(`Key${l}`);
    keyHit.setAttribute(
      'style',
      'background-color: var(--dark-gray); color: white;'
    );
    if (answerArray[i] === l) {
      answerArray[i] = '!';
      keyHit.setAttribute('style', 'background-color: var(--green);');
      const isCorrect = window.document.getElementById(`g${guessIndex}l${i}`);
      isCorrect.setAttribute('style', 'background-color: var(--green);');
    }
  });
  guessArray.forEach((l, i) => {
    const keyHit = window.document.getElementById(`Key${l}`);
    if (answerArray.includes(l) && answerArray[i] !== l) {
      keyHit.setAttribute('style', 'background-color: var(--puke-yellow);');
      const isPresent = window.document.getElementById(`g${guessIndex}l${i}`);
      isPresent.setAttribute('style', 'background-color: var(--puke-yellow);');
    }
  });
  let elements = window.document.getElementsByClassName(
    `flippableG${guessIndex}`
  );
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute('style', 'transform: rotateY(180deg);');
  }
};

export const isNotAWord = (gss, guessIndex) => {
  console.log(`${gss} was not in the dictionary`);
  //trigger a "not a word" effect in GameBoard
  let elements = window.document.getElementsByClassName(
    `shakeableG${guessIndex}`
  );
  console.log(`Found ${elements.length} shakeable lines`);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add('shake');
    // elements[i].setAttribute('style', 'animation: shake;');
  }
};
