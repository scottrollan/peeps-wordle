import $ from 'jquery';
import { words } from '../data/Words';

export const startOver = (
  setAnswer,
  setGuesses,
  guessIndex,
  setGuessIndex,
  setEndModalShow
) => {
  $('.tile').css('background-color', 'var(--dark-gray)');
  $(`.flippable`).css('transform', 'initial');
  $('.key').attr('data-state', '');
  $('.key').css('background-color', 'var(--light-gray)');
  setEndModalShow(false);
  setGuesses([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const maxIdx = words.length - 1;
  const wordIndex = Math.floor(Math.random() * maxIdx);
  const secretWord = words[wordIndex];
  const wordle = secretWord.toUpperCase();
  setAnswer(wordle);
  console.log(wordle);
  setGuessIndex(0);
};
