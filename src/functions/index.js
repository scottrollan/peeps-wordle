import html2canvas from 'html2canvas';
import { copyImageToClipboard } from 'copy-image-clipboard';
import { peepWon, peepLost } from '../firestore/index';
import $ from 'jquery';
// import { words } from '../data/Words';

const { REACT_APP_MW_KEY } = process.env;

const axios = require('axios');

const n = new Date();
var month = n.getUTCMonth() + 1; //months from 1-12
var day = n.getUTCDate();
var year = n.getUTCFullYear();
const todaysDate = `${month}/${day}/${year}`;

const populateEndModal = (params, iWon) => {
  const {
    peep,
    answer,
    guessIndex,
    guesses,
    setShareableImage,
    playingDaily,
    setIWon,
  } = params;
  setIWon(iWon);
  switch (true) {
    case iWon && playingDaily:
      $('#shareDiv').append(
        `<p style='display: flex; justify-content: space-between;'><span>${
          guessIndex + 1
        }/6</span><span>${todaysDate}</span></p>`
      );
      break;
    case iWon:
      $('#shareDiv').append(
        `<p>${peep} got '${answer}' in ${guessIndex + 1} attempts.</p>`
      );
      break;
    case !iWon && playingDaily:
      $('#shareDiv').append(`<p>${peep} bombed on today's PeepsWord.</p>`);
      break;
    default:
      $('#shareDiv').append(`<p>${peep} bombed on "${answer}".</p>`);
      break;
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
      `<img src=${imageSrc} alt='nothing to see' id='shareMe' style="max-width: 200px;"/>`
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
  peepWon(params.peep, params.guessIndex);
};

const youLose = (params) => {
  setTimeout(() => params.setEndModalShow(true), 2000);
  $('#tooltipText').text('Shucks!');
  setTimeout(() => $('#tooltip').css('display', 'flex'), 900);
  setTimeout(() => {
    $('#tooltip').css('display', 'none');
    populateEndModal(params, false);
  }, 2000);
  peepLost(params.peep);
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
  const gss = params.playerGuess;
  const guessIndex = params.guessIndex;
  console.log(`${gss} was not in the dictionary`);
  //trigger a "not a word" effect in GameBoard
  $('#tooltipText').text('...Not a MW word...');
  $(`.shakeableG${guessIndex}`).addClass('shake');
  $('#tooltip').css('display', 'flex');
  setTimeout(() => $('#tooltip').css('display', 'none'), 1600);
};

const isAWord = (params) => {
  const guessIndex = params.guessIndex;
  let thisRow = {};
  for (let i = 1; i <= 5; i++) {
    let sq = `r${guessIndex + 1}L${i}`;
    thisRow = { ...thisRow, [sq]: 'dark' };
  }
  params.setSquares({ ...params.squares, ...thisRow });
  const gss = params.playerGuess;
  const guessSplit = gss.split('');
  let guessArray = [];
  guessSplit.forEach((g) => {
    guessArray.push({ ltr: g, dataState: '' });
  });
  const ans = params.answer;
  const answerArray = ans.toUpperCase().split('');

  guessArray.forEach((l, i) => {
    const thisSquare = `r${guessIndex + 1}L${i + 1}`; //ex: 1_3 or 4_1
    //find all "correct letters in correct position"
    const currentState = $(`#Key${l.ltr}`).attr('data-state');
    if (answerArray[i] === l.ltr) {
      // newCorrectLetters.push(l.ltr);
      thisRow = { ...thisRow, [thisSquare]: 'green' };
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
    const thisSquare = `r${guessIndex + 1}L${i + 1}`; //ex: 1_3 or 4_1
    if (l.dataState === '') {
      const found = answerArray.find((a) => a === l.ltr);
      if (found) {
        // newCorrectLetters.push(l.ltr);
        const fIndex = answerArray.indexOf(found);
        answerArray[fIndex] = '*';
        $(`#g${guessIndex}l${i}`).css('background-color', 'var(--puke-yellow');
        guessArray[i].dataState = 'present';
        thisRow = { ...thisRow, [thisSquare]: 'yellow' };

        if (currentState !== 'correct') {
          $(`#Key${l.ltr}`).attr('data-state', 'present');
          $(`#Key${l.ltr}`).css('background-color', 'var(--puke-yellow');
        }
      }
    }
    // newSquares = { ...params.squares, ...thisRow };
    params.setSquares({ ...params.squares, ...thisRow });
  });

  const iWon = ans === gss;
  let iLost;
  if (!iWon && guessIndex === 5) {
    iLost = true;
  }
  vannaWhite(params, iWon, iLost);
};

export const checkWord = (params) => {
  switch (true) {
    //if player guess is the correct answer
    case params.playerGuess === params.answer:
      isAWord(params);
      let plusOne = params.guessIndex + 1;
      params.setGuessIndex(plusOne);
      break;
    default:
      //otherwise, check if in dictionary then proceed
      const config = {
        method: 'get',
        url: `https://dictionaryapi.com/api/v3/references/collegiate/json/${params.playerGuess}?key=${REACT_APP_MW_KEY}`,
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
