import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Keyboard.module.scss';

export default function Keyboard({
  guesses,
  setGuesses,
  guessIndex,
  setGuessIndex,
  letterIndex,
  setLetterIndex,
}) {
  const topRow = [
    { val: 'q', code: 'KeyQ' },
    { val: 'w', code: 'Keyw' },
    { val: 'e', code: 'KeyE' },
    { val: 'r', code: 'KeyR' },
    { val: 't', code: 'KeyT' },
    { val: 'y', code: 'KeyY' },
    { val: 'u', code: 'KeyU' },
    { val: 'i', code: 'KeyI' },
    { val: 'o', code: 'KeyO' },
    { val: 'p', code: 'KeyP' },
  ];
  const middleRow = [
    { val: 'a', code: 'KeyA' },
    { val: 's', code: 'KeyS' },
    { val: 'd', code: 'KeyD' },
    { val: 'f', code: 'KeyF' },
    { val: 'g', code: 'KeyG' },
    { val: 'h', code: 'KeyH' },
    { val: 'j', code: 'KeyJ' },
    { val: 'k', code: 'KeyK' },
    { val: 'l', code: 'KeyL' },
  ];
  const bottomRow = [
    {
      val: 'enter',
      html: (
        <span style={{ maxWidth: '100%', fontSize: '2vw', padding: '0' }}>
          ENTER
        </span>
      ),
      code: 'Enter',
    },
    { val: 'z', code: 'KeyZ' },
    { val: 'x', code: 'KeyX' },
    { val: 'c', code: 'KeyC' },
    { val: 'v', code: 'KeyV' },
    { val: 'b', code: 'KeyB' },
    { val: 'n', code: 'KeyN' },
    { val: 'm', code: 'KeyM' },
    {
      val: 'backspace',
      html: <i className="far fa-backspace" style={{ padding: '0' }}></i>,
      code: 'Backspace',
    },
  ];

  const handleChange = (target, code) => {
    let allGuesses = [...guesses];
    const guessAtCurrentIndex = guesses[guessIndex];
    let currentGuess = [...guessAtCurrentIndex];
    if (code === 'Backspace' && currentGuess.length) {
      newGuess.pop();
    } else {
      currentGuess.push(target.value);
    }
    allGuesses[thisGuessIndex] = [...newGuess];
    console.log(allGuesses);
    setGuesses([...allGuesses]);
  };

  return (
    <div className={styles.keyboad}>
      <div className={styles.keyboardRow}>
        {topRow.map((btn, idx) => {
          return (
            <Button
              key={`${btn.vla}${idx}`}
              value={btn.val}
              className={styles.button}
              onClick={(e) => handleChange(e.target, btn.code)}
            >
              {btn.val}
            </Button>
          );
        })}
      </div>
      <div className={styles.keyboardRow}>
        {middleRow.map((btn, idx) => {
          return (
            <Button
              key={`${btn.val}${idx}`}
              value={btn.val}
              className={styles.button}
              onClick={(e) => handleChange(e.target, btn.code)}
            >
              {btn.val}
            </Button>
          );
        })}
      </div>
      <div className={styles.keyboardRow}>
        {bottomRow.map((btn, idx) => {
          return (
            <Button
              key={`${btn.val}${idx}`}
              value={btn.val}
              className={styles.button}
              onClick={(e) => handleChange(e.target, btn.code)}
            >
              {btn.html ? btn.html : btn.val}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
