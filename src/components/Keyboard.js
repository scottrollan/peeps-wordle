import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './Keyboard.module.scss';

export default function Keyboard() {
  const topRow = [
    { val: 'q' },
    { val: 'w' },
    { val: 'e' },
    { val: 'r' },
    { val: 't' },
    { val: 'y' },
    { val: 'u' },
    { val: 'i' },
    { val: 'o' },
    { val: 'p' },
  ];
  const middleRow = [
    { val: 'a' },
    { val: 's' },
    { val: 'd' },
    { val: 'f' },
    { val: 'g' },
    { val: 'h' },
    { val: 'j' },
    { val: 'k' },
    { val: 'l' },
  ];
  const bottomRow = [
    {
      val: 'enter',
      html: (
        <span style={{ maxWidth: '100%', fontSize: '2vw', padding: '0' }}>
          ENTER
        </span>
      ),
    },
    { val: 'z' },
    { val: 'x' },
    { val: 'c' },
    { val: 'v' },
    { val: 'b' },
    { val: 'n' },
    { val: 'm' },
    {
      val: 'backspace',
      html: <i className="far fa-backspace" style={{ padding: '0' }}></i>,
    },
  ];
  return (
    <div className={styles.keyboad}>
      <div className={styles.keyboardRow}>
        {topRow.map((btn, idx) => {
          return (
            <Button
              key={`${btn.vla}${idx}`}
              value={btn.val}
              className={styles.button}
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
            >
              {btn.html ? btn.html : btn.val}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
