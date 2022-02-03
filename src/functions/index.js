import $ from 'jquery';
import { OverlayTrigger } from 'react-bootstrap';
const { REACT_APP_MW_KEY } = process.env;

const axios = require('axios');

const youWin = (guessIndex) => {
  console.log('WINNER!!!!!!!!!!');
};

const vannaWhite = (guessIndex, isWinner) => {
  $(`.flippableG${guessIndex}L0`).css('transform', 'rotateY(180deg)');
  setTimeout(
    () => $(`.flippableG${guessIndex}L1`).css('transform', 'rotateY(180deg)'),
    200
  );
  setTimeout(
    () => $(`.flippableG${guessIndex}L2`).css('transform', 'rotateY(180deg)'),
    400
  );
  setTimeout(
    () => $(`.flippableG${guessIndex}L3`).css('transform', 'rotateY(180deg)'),
    600
  );
  setTimeout(
    () => $(`.flippableG${guessIndex}L4`).css('transform', 'rotateY(180deg)'),
    800
  );
  if (isWinner) {
    youWin(guessIndex);
  }
};

const isNotAWord = (gss, guessIndex) => {
  console.log(`${gss} was not in the dictionary`);
  //trigger a "not a word" effect in GameBoard
  setTimeout(() => $(`.shakeableG${guessIndex}`).addClass('shake'), 800);
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
  const iWon = ans === gss;
  vannaWhite(guessIndex, iWon);
};

export const checkWord = (gss, ans, guessIndex, setGuessIndex) => {
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
