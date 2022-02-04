import $ from 'jquery';
import { words } from '../data/Words';
const { REACT_APP_MW_KEY } = process.env;

const axios = require('axios');

const youWin = (guessIndex, setEndModalShow) => {
  setTimeout(() => setEndModalShow(true), 2000);
  //trigger a "not a word" effect in GameBoard
  $('#tooltipText').text('...YOU WIN...');
  setTimeout(() => $('#tooltip').css('display', 'flex'), 900);
  setTimeout(() => $('#tooltip').css('display', 'none'), 2000);
};

const youLose = (setEndModalShow) => {
  $('#endGreet').text('Shucks, ');
  setTimeout(() => setEndModalShow(true), 2000);
};

const vannaWhite = (guessIndex, isWinner, isLoser, setEndModalShow) => {
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
    youWin(guessIndex, setEndModalShow);
  }
  if (isLoser) {
    youLose(setEndModalShow);
  }
};

const isNotAWord = (gss, guessIndex) => {
  console.log(`${gss} was not in the dictionary`);
  //trigger a "not a word" effect in GameBoard
  $('#tooltipText').text('...Not a word...');
  $(`.shakeableG${guessIndex}`).addClass('shake');
  $('#tooltip').css('display', 'flex');
  setTimeout(() => $('#tooltip').css('display', 'none'), 1600);
};

const isAWord = (gss, ans, guessIndex, setEndModalShow) => {
  const answerArray = ans.toUpperCase().split('');
  let guessArray = [];
  const guessSplit = gss.split('');
  guessSplit.forEach((g) => {
    guessArray.push({ ltr: g, dataState: '' });
  });

  guessArray.forEach((l, i) => {
    //find all "correct"
    const currentBG = $(`#Key${l.ltr}`).css('background-color');
    if (answerArray[i] === l.ltr) {
      answerArray[i] = '*';
      guessArray[i].dataState = 'correct';
      $(`#Key${l.ltr}`).attr('data-state', 'correct');
      $(`#g${guessIndex}l${i}`).css('background-color', 'var(--green');
    } else if (
      //else if the background is not already green or yellow
      currentBG !== 'rgb(201, 180, 88)' &&
      currentBG !== 'rgb(106, 170, 100)'
    ) {
      $(`#Key${l.ltr}`).attr('data-state', 'absent');
    }
  });
  //then find "present"
  guessArray.forEach((l, i) => {
    if (l.dataState === '') {
      const found = answerArray.find((a) => a === l.ltr);
      if (found) {
        const fIndex = answerArray.indexOf(found);
        answerArray[fIndex] = '*';
        $(`#g${guessIndex}l${i}`).css('background-color', 'var(--puke-yellow');
        const currentBG = $(`#Key${l.ltr}`).css('background-color');
        if (currentBG !== 'rgb(106, 170, 100)') {
          $(`#Key${l.ltr}`).attr('data-state', 'present');
        }
      }
    }
  });
  const iWon = ans === gss;
  let iLost;
  if (!iWon && guessIndex === 5) {
    iLost = true;
  }
  vannaWhite(guessIndex, iWon, iLost, setEndModalShow);
};

export const checkWord = (
  gss,
  ans,
  guessIndex,
  setGuessIndex,
  setEndModalShow
) => {
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
          isAWord(gss, ans, guessIndex, setEndModalShow);
          let plusOne = guessIndex + 1;
          setGuessIndex(plusOne);
        } else {
          isNotAWord(gss, guessIndex, setEndModalShow);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const randomWord = () => {
  const maxIdx = words.length - 1;
  const wordIndex = Math.floor(Math.random() * maxIdx);
  return words[wordIndex];
};

export const startOver = (
  setAnswer,
  setGuesses,
  guessIndex,
  setGuessIndex,
  setEndModalShow
) => {
  $('.tile').css('background-color', 'var(--dark-gray)');
  // $(`.flippable`).css('transform', 'rotateY(-180deg)');
  $(`.flippable`).css('transform', 'initial');
  $('.key').attr('data-state', '');
  $('.key').css('background-color', 'var(--light-gray');
  setEndModalShow(false);
  setGuesses([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const secretWord = randomWord();
  const wordle = secretWord.toUpperCase();
  setAnswer(wordle);
  console.log(wordle);
  setGuessIndex(0);
};
