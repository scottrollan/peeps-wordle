import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Modal, Button } from 'react-bootstrap';
import { shareResults } from '../functions/index';
import { peepPeepedIn } from '../firestore/index';
import './EndOfGame.css';

export default function EndOfGame(props) {
  const {
    show,
    setShow,
    answer,
    guessIndex,
    newGame,
    canWrite,
    shareableImage,
  } = props;

  const peep = useContext(UserContext);

  const startNewGame = () => {
    peepPeepedIn(peep);
    newGame();
  };

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
          <Button variant="secondary" onClick={() => startNewGame()}>
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
          id="shareButton"
          variant="success"
          onClick={() => shareResults(canWrite, shareableImage)}
          style={{ display: canWrite ? 'flex' : 'none' }}
        >
          Share
          <i className="far fa-share-alt"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
