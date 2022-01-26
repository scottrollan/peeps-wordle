import React from 'react';
import Keyboard from './Keyboard';
import './GameBoard.css';
import styles from './GameBoard.module.scss';

export default function GameBoard({
  guesses,
  setGuesses,
  guessIndex,
  makeGuess,
}) {
  return (
    <>
      <div className={styles.board}>
        {[0, 1, 2, 3, 4].map((num, idx) => {
          return (
            <div
              key={`${idx}${num}`}
              className={[`${styles.guessLine} shakeableG${num}`]}
              style={{ animation: 'shake' }}
            >
              <div className={[`${styles.flipbox} flippableG${num}`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}`]}>
                  <div
                    className={[`${styles.guessLetter} ${styles.flipboxFront}`]}
                  >
                    {guesses[num][0]}
                  </div>
                  <div className={styles.flipboxBack} id={`g${num}l0`}>
                    <span className={styles.backLetter}>{guesses[idx][0]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}`]}>
                  <div
                    className={[`${styles.guessLetter} ${styles.flipboxFront}`]}
                  >
                    {guesses[idx][1]}
                  </div>
                  <div className={styles.flipboxBack} id={`g${num}l1`}>
                    <span className={styles.backLetter}>{guesses[idx][1]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}`]}>
                  <div
                    className={[`${styles.guessLetter} ${styles.flipboxFront}`]}
                  >
                    {guesses[idx][2]}
                  </div>
                  <div className={styles.flipboxBack} id={`g${num}l2`}>
                    <span className={styles.backLetter}>{guesses[idx][2]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}`]}>
                  <div
                    className={[`${styles.guessLetter} ${styles.flipboxFront}`]}
                  >
                    {guesses[idx][3]}
                  </div>
                  <div className={styles.flipboxBack} id={`g${num}l3`}>
                    <span className={styles.backLetter}>{guesses[idx][3]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}`]}>
                  <div
                    className={[`${styles.guessLetter} ${styles.flipboxFront}`]}
                  >
                    {guesses[idx][4]}
                  </div>
                  <div className={styles.flipboxBack} id={`g${num}l4`}>
                    <span className={styles.backLetter}>{guesses[idx][4]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Keyboard
        guesses={guesses}
        setGuesses={setGuesses}
        guessIndex={guessIndex}
        makeGuess={makeGuess}
      />
    </>
  );
}
