import React, { useState } from 'react';
import Keyboard from './Keyboard';
import { Form, Button } from 'react-bootstrap';
import styles from './GameBoard.module.scss';

export default function GameBoard({ guesses, setGuesses }) {
  const [currentGuess, setCurrentGuess] = useState({
    guess: 0,
    letters: ['', '', '', '', ''],
  });
  const submitGuess = (num) => {
    console.log(`Guess #${num} was just submitted!`);
  };

  const setLetter = (target, i) => {
    const idArray = target.id.split('-');
    const n = idArray[3];
    const key = n - 1;
    console.log(`Targeting ${key}`);
    let data = [...guesses];
    data[i][key] = target.value;
    console.log(data);
    setGuesses([...data]);
    console.log(guesses);
  };

  return (
    <>
      <div className={styles.board}>
        {[1, 2, 3, 4, 5].map((num, idx) => {
          return (
            <Form
              key={`${idx}${num}`}
              onSubmit={() => submitGuess(num)}
              className={styles.guessLine}
              id="form"
            >
              <div className={[`${styles.flipbox} flippableG${num}L1`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}L1`]}>
                  <Form.Group
                    controlId={`guess-${num}-letter-1`}
                    className={[`${styles.singleGuess} ${styles.flipboxFront}`]}
                  >
                    <Form.Control
                      type="text"
                      maxLength={1}
                      value={guesses[idx].letter1}
                      className={styles.guessLetter}
                      onChange={(e) => setLetter(e.target, idx)}
                    />
                  </Form.Group>
                  <div className={styles.flipboxBack}>
                    <span className={styles.backLetter}>{guesses[idx][0]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}L2`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}L2`]}>
                  <Form.Group
                    controlId={`guess-${num}-letter-2`}
                    className={[`${styles.singleGuess} ${styles.flipboxFront}`]}
                  >
                    <Form.Control
                      type="text"
                      maxLength={1}
                      value={guesses[idx].letter2}
                      className={styles.guessLetter}
                      onChange={(e) => setLetter(e.target, idx)}
                    />
                  </Form.Group>
                  <div className={styles.flipboxBack}>
                    <span className={styles.backLetter}>{guesses[idx][1]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}L3`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}L3`]}>
                  <Form.Group
                    controlId={`guess-${num}-letter-3`}
                    className={[`${styles.singleGuess} ${styles.flipboxFront}`]}
                  >
                    <Form.Control
                      type="text"
                      maxLength={1}
                      value={guesses[idx].letter3}
                      className={styles.guessLetter}
                      onChange={(e) => setLetter(e.target, idx)}
                    />
                  </Form.Group>
                  <div className={styles.flipboxBack}>
                    <span className={styles.backLetter}>{guesses[idx][2]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}L4`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}L4`]}>
                  <Form.Group
                    controlId={`guess-${num}-letter-4`}
                    className={[`${styles.singleGuess} ${styles.flipboxFront}`]}
                  >
                    <Form.Control
                      type="text"
                      maxLength={1}
                      value={guesses[idx].letter4}
                      className={styles.guessLetter}
                      onChange={(e) => setLetter(e.target, idx)}
                    />
                  </Form.Group>
                  <div className={styles.flipboxBack}>
                    <span className={styles.backLetter}>{guesses[idx][3]}</span>
                  </div>
                </div>
              </div>
              <div className={[`${styles.flipbox} flippableG${num}L5`]}>
                <div className={[`${styles.flipboxInner} flippableG${num}L5`]}>
                  <Form.Group
                    controlId={`guess-${num}-letter-5`}
                    className={[`${styles.singleGuess} ${styles.flipboxFront}`]}
                  >
                    <Form.Control
                      type="text"
                      maxLength={1}
                      value={guesses[idx].letter5}
                      className={styles.guessLetter}
                      onChange={(e) => setLetter(e.target, idx)}
                    />
                  </Form.Group>
                  <div className={styles.flipboxBack}>
                    <span className={styles.backLetter}>{guesses[idx][4]}</span>
                  </div>
                </div>
              </div>
            </Form>
          );
        })}
      </div>
      <Keyboard
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        guesses={guesses}
        setGuesses={setGuesses}
      />
    </>
  );
}
