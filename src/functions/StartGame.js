import $ from 'jquery';
import { regularPlay, peepStartedGame } from '../firestore/index';

export const startGame = async (
  peep,
  setAnswer,
  setGuesses,
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
  const secretWord = await regularPlay();
  const wordle = secretWord.toUpperCase();
  console.log(wordle);
  setAnswer(wordle);
  setGuessIndex(0);
  peepStartedGame(peep.name);
};
