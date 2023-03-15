import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { shareResults } from '../functions/index';
// import { peepPeepedIn } from '../firestore/index';
import './EndOfGame.css';

export default function EndOfGame(props) {
  const {
    show,
    setShow,
    answer,
    newGame,
    canWrite,
    shareableImage,
    playingDaily,
    setPlayingDaily,
  } = props;

  const startNewGame = () => {
    if (playingDaily) {
      setPlayingDaily(false);
    }
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
            Play {playingDaily ? 'Regular Peep Wordle' : 'Again'}
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
        <span style={{ display: canWrite ? 'none' : 'flex' }}>
          Long press the image above to save and share it
        </span>
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
