import html2canvas from 'html2canvas';
import { copyImageToClipboard } from 'copy-image-clipboard';
import $ from 'jquery';
import { words } from '../data/Words';

const { REACT_APP_MW_KEY } = process.env;

const axios = require('axios');

const populateEndModal = (params, iWon) => {
  const { peep, answer, guessIndex, guesses, setShareableImage } = params;

  if (iWon) {
    $('#shareDiv').append(
      `<p>${peep}&nbsp;got&nbsp;"${answer}"</p><p>in&nbsp;${
        guessIndex + 1
      }&nbsp;attempts.</p>`
    );
  } else {
    $('#shareDiv').append(
      `<p>${peep}&nbsp;bombed&nbsp;on&nbsp;"${answer}".</p>`
    );
  }
  const ans = answer.split('');
  for (let i = 0; i < guessIndex + 1; i++) {
    $('#shareDiv').append(`<div id="row${i}" class="shareRow"></div>`);
    let answerArray = [...ans];
    guesses[i].forEach((g, idx) => {
      switch (true) {
        case answerArray[idx] === g:
          answerArray[idx] = '*';
          $(`#row${i}`).append(`<div class='square correct'></div>`);
          break;
        case answerArray.includes(g):
          const fIndex = answerArray.findIndex((a) => a === g);
          answerArray[fIndex] = '*';
          $(`#row${i}`).append("<div class='square present'></div>");
          break;
        default:
          $(`#row${i}`).append("<div class='square absent'></div>");
          break;
      }
    });
  }
  const src = document.getElementById('shareDiv');
  html2canvas(src).then((canvas) => {
    const imageSrc = canvas.toDataURL('image/png', 1.0);
    setShareableImage(imageSrc);
    $('#shareDiv').hide();
    $('#imageContainer').append(
      `<img src=${imageSrc} alt='nothing to see' id='shareMe' style="max-width: 80vw;"/>`
    );
  });
};

export const shareResults = (canWrite, imageSrc) => {
  if (canWrite) {
    try {
      copyImageToClipboard(imageSrc);
      console.log('Image copied to clipboard.');
      setTimeout(() => $('#imageCopied').css('display', 'flex'), 600);
      setTimeout(() => $('#imageCopied').css('display', 'none'), 1800);
      $('#shareButton').hide();
    } catch (error) {
      console.log(error.message);
    }
  }
};

const youWin = (params) => {
  setTimeout(() => params.setEndModalShow(true), 2000);
  $('#tooltipText').text('...YOU WIN...');
  setTimeout(() => $('#tooltip').css('display', 'flex'), 900);
  setTimeout(() => {
    $('#tooltip').css('display', 'none');
    populateEndModal(params, true);
  }, 2000);
};

const youLose = (params) => {
  setTimeout(() => params.setEndModalShow(true), 2000);
  $('#tooltipText').text('Shucks!');
  setTimeout(() => $('#tooltip').css('display', 'flex'), 900);
  setTimeout(() => {
    $('#tooltip').css('display', 'none');
    populateEndModal(params, false);
  }, 2000);
};

const vannaWhite = (params, isWinner, isLoser) => {
  $(`.flippableG${params.guessIndex}L0`).css('transform', 'rotateY(180deg)');
  setTimeout(
    () =>
      $(`.flippableG${params.guessIndex}L1`).css(
        'transform',
        'rotateY(180deg)'
      ),
    200
  );
  setTimeout(
    () =>
      $(`.flippableG${params.guessIndex}L2`).css(
        'transform',
        'rotateY(180deg)'
      ),
    400
  );
  setTimeout(
    () =>
      $(`.flippableG${params.guessIndex}L3`).css(
        'transform',
        'rotateY(180deg)'
      ),
    600
  );
  setTimeout(
    () =>
      $(`.flippableG${params.guessIndex}L4`).css(
        'transform',
        'rotateY(180deg)'
      ),
    800
  );
  if (isWinner) {
    youWin(params);
  }
  if (isLoser) {
    youLose(params);
  }
};

const isNotAWord = (params) => {
  const gss = params.gss;
  const guessIndex = params.guessIndex;
  console.log(`${gss} was not in the dictionary`);
  //trigger a "not a word" effect in GameBoard
  $('#tooltipText').text('...Not a word...');
  $(`.shakeableG${guessIndex}`).addClass('shake');
  $('#tooltip').css('display', 'flex');
  setTimeout(() => $('#tooltip').css('display', 'none'), 1600);
};

const isAWord = (params) => {
  const gss = params.playerGuess;
  const ans = params.answer;
  const guessIndex = params.guessIndex;

  const answerArray = ans.toUpperCase().split('');
  let guessArray = [];
  const guessSplit = gss.split('');
  guessSplit.forEach((g) => {
    guessArray.push({ ltr: g, dataState: '' });
  });

  guessArray.forEach((l, i) => {
    //find all "correct"
    const currentState = $(`#Key${l.ltr}`).attr('data-state');
    if (answerArray[i] === l.ltr) {
      answerArray[i] = '*';
      guessArray[i].dataState = 'correct';
      $(`#Key${l.ltr}`).attr('data-state', 'correct');
      $(`#Key${l.ltr}`).css('background-color', 'var(--green)');
      $(`#g${guessIndex}l${i}`).css('background-color', 'var(--green)');
    } else if (currentState !== 'correct' && currentState !== 'present') {
      $(`#Key${l.ltr}`).css('background-color', 'var(--dark-gray)');
    }
  });
  //then find "present"
  guessArray.forEach((l, i) => {
    const currentState = $(`#Key${l.ltr}`).attr('data-state');
    if (l.dataState === '') {
      const found = answerArray.find((a) => a === l.ltr);
      if (found) {
        const fIndex = answerArray.indexOf(found);
        answerArray[fIndex] = '*';
        $(`#g${guessIndex}l${i}`).css('background-color', 'var(--puke-yellow');
        guessArray[i].dataState = 'present';
        if (currentState !== 'correct') {
          $(`#Key${l.ltr}`).attr('data-state', 'present');
          $(`#Key${l.ltr}`).css('background-color', 'var(--puke-yellow');
        }
      }
    }
  });
  const iWon = ans === gss;
  let iLost;
  if (!iWon && guessIndex === 5) {
    iLost = true;
  }
  vannaWhite(params, iWon, iLost);
};

export const checkWord = (params) => {
  switch (params.gss) {
    case params.ans:
      isAWord(params);
      let plusOne = params.guessIndex + 1;
      params.setGuessIndex(plusOne);
      break;
    default:
      //check if in dictionary
      const config = {
        method: 'get',
        url: `https://dictionaryapi.com/api/v3/references/collegiate/json/${params.gss}?key=${REACT_APP_MW_KEY}`,
      };
      let data;
      try {
        axios(config)
          .then((response) => {
            data = response.data[0];
          })
          .then(() => {
            if (typeof data === 'object') {
              isAWord(params);
              let plusOne = params.guessIndex + 1;
              params.setGuessIndex(plusOne);
            } else {
              isNotAWord(params);
            }
          });
      } catch (error) {
        console.log(error.message);
      }
  }
};

export const randomWord = () => {
  const maxIdx = words.length - 1;
  const wordIndex = Math.floor(Math.random() * maxIdx);
  return words[wordIndex];
};
