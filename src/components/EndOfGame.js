import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { shareResults } from '../functions/ShareResults';
import './EndOfGame.css';

export default function EndOfGame({
  show,
  peep,
  setShow,
  answer,
  newGame,
  guesses,
  guessIndex,
}) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90h"
    >
      <Modal.Header closeButton>
        <span id="endGreet"></span>
        The word was {answer}
        <span id="endMiddle"></span>
        <span></span>
        <span id="endClose"></span>
      </Modal.Header>

      <Modal.Body>
        <div className="modalBody">
          <p style={{ display: guessIndex < 6 ? 'inherit' : 'none' }}>
            You got it in {guessIndex} attempts.
          </p>
          <p style={{ display: guessIndex < 3 ? 'inherit' : 'none' }}>
            That's one for the record books, {peep}!!
          </p>
          <p style={{ display: guessIndex === 3 ? 'inherit' : 'none' }}>
            Excellent Work! A true master you are.
          </p>
          <p style={{ display: guessIndex === 4 ? 'inherit' : 'none' }}>
            Good work, {peep}.
          </p>
          <p style={{ display: guessIndex === 5 ? 'inherit' : 'none' }}>
            Keep on Peepin'!
          </p>
          <p style={{ display: guessIndex === 6 ? 'inherit' : 'none' }}>
            <i className="fad fa-grimace fa-7x"></i>
          </p>
          <Button variant="secondary" onClick={() => newGame()}>
            Play Again
          </Button>
        </div>
        <div id="shareDiv"></div>
        <div id="imageCopied" className="imageCopied">
          <div id="imageCopiedText" className="imageCopiedText">
            Image Copied
          </div>
        </div>
        <div id="imageContainer"></div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => shareResults(peep, guessIndex, guesses, answer)}
        >
          Share
          <i className="far fa-share-alt"></i>
        </Button>
        <span>
          <i class="fas fa-hand-point-left"></i>&nbsp;under construction
        </span>
      </Modal.Footer>
    </Modal>
  );
}
