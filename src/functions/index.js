import $ from 'jquery';
const { REACT_APP_MW_KEY } = process.env;

const axios = require('axios');

const youWin = (guessIndex) => {
  $(`.flippableG${guessIndex}`).css('transform', 'rotateY(180deg)');
  setTimeout(() => $(`.shakeableG${guessIndex}`).addClass('bounce'), 600);
};

const isAWord = (gss, ans, guessIndex) => {
  const answerArray = ans.toUpperCase().split('');
  let guessArray = [];
  const guessSplit = gss.split('');
  guessSplit.forEach((g) => {
    guessArray.push({ ltr: g, dataState: '' });
  });

  guessArray.forEach((l, i) => {
    if (answerArray[i] === l.ltr) {
      answerArray[i] = '*';
      guessArray[i].dataState = 'correct';
      $(`#Key${l.ltr}`).attr('data-state', 'correct');
      $(`#g${guessIndex}l${i}`).css('background-color', 'var(--green');
    } else {
      $(`#Key${l.ltr}`).attr('data-state', 'absent');
    }
  });

  guessArray.forEach((l, i) => {
    if (l.dataState === '') {
      const found = answerArray.find((a) => a === l.ltr);
      if (found) {
        const fIndex = answerArray.indexOf(found);
        answerArray[fIndex] = '*';
        $(`#g${guessIndex}l${i}`).css('background-color', 'var(--puke-yellow');
        $(`#Key${l.ltr}`).attr('data-state', 'present');
      }
    }
  });

  $(`.flippableG${guessIndex}`).css('transform', 'rotateY(180deg)');
};

const isNotAWord = (gss, guessIndex) => {
  console.log(`${gss} was not in the dictionary`);
  //trigger a "not a word" effect in GameBoard
  $(`.shakeableG${guessIndex}`).addClass('shake');
};

export const checkWord = (gss, ans, guessIndex, setGuessIndex) => {
  if (ans === gss) {
    youWin();
  }

  //check if in dictionary
  const config = {
    method: 'get',
    url: `https://dictionaryapi.com/api/v3/references/collegiate/json/${gss}?key=${REACT_APP_MW_KEY}`,
  };
  let data;
  try {
    axios(config)
      .then((response) => {
        data = response.data[0];
      })
      .then(() => {
        if (typeof data === 'object') {
          isAWord(gss, ans, guessIndex);
          let plusOne = guessIndex + 1;
          setGuessIndex(plusOne);
        } else {
          isNotAWord(gss, guessIndex);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};
