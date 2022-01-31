import $ from 'jquery';

const youWon = (i) => {
  let ordinal = '';
  switch (i) {
    case 0:
      ordinal = 'first';
      break;
    case 1:
      ordinal = 'second';
      break;
    case 2:
      ordinal = 'third';
      break;
    default:
      ordinal = `${i + 1}th`;
  }
  console.log(`YOU WON on the ${ordinal} try!!!!`);
};

export const isAWord = (gss, ans, guessIndex) => {
  console.log(`ans: ${ans},  gss: ${gss}`);
  switch (true) {
    case gss === ans:
      youWon(guessIndex);
      break;
    default:
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
      console.log(`after green: ${answerArray}`);

      guessArray.forEach((l, i) => {
        if (l.dataState === '') {
          const found = answerArray.find((a) => a === l.ltr);
          if (found) {
            const fIndex = answerArray.indexOf(found);
            answerArray[fIndex] = '*';
            $(`#g${guessIndex}l${i}`).css(
              'background-color',
              'var(--puke-yellow'
            );
            $(`#Key${l.ltr}`).attr('data-state', 'present');
          }
        }
      });
      console.log(`after yellow: ${answerArray}`);

      $(`.flippableG${guessIndex}`).css('transform', 'rotateY(180deg)');
  }
};

export const isNotAWord = (gss, guessIndex) => {
  console.log(`${gss} was not in the dictionary`);
  //trigger a "not a word" effect in GameBoard
  $(`.shakeableG${guessIndex}`).addClass('shake');
};
