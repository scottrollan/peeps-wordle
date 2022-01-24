import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './GameBoard.module.scss';

export default function GameBoard() {
  const submitGuess1 = () => {};
  return (
    <div className={styles.board}>
      <Form onSubmit={submitGuess1} className={styles.guessLine}>
        <Form.Group controlId="guess1letter1">
          <Form.Control
            type="text"
            maxLength={1}
            className={styles.guessLetter}
          />
        </Form.Group>{' '}
        <Form.Group controlId="guess1letter2">
          <Form.Control
            type="text"
            maxLength={1}
            className={styles.guessLetter}
          />
        </Form.Group>{' '}
        <Form.Group controlId="guess1letter3">
          <Form.Control
            type="text"
            maxLength={1}
            className={styles.guessLetter}
          />
        </Form.Group>{' '}
        <Form.Group controlId="guess1letter4">
          <Form.Control
            type="text"
            maxLength={1}
            className={styles.guessLetter}
          />
        </Form.Group>{' '}
        <Form.Group controlId="guess1letter5">
          <Form.Control
            type="text"
            maxLength={1}
            className={styles.guessLetter}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
