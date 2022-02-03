import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './EndOfGame.module.scss';

export default function EndOfGame({ show, peep, setShow, answer }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90h"
    >
      <Modal.Header closeButton>
        <span id="endGreet"></span>
        {peep}, the word was {answer}
        <span id="endMiddle"></span>
        <span></span>
        <span id="endClose"></span>
      </Modal.Header>

      <Modal.Body>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            Later on, I'll make a stats thingie that we can all share with each
            other and restart the game for you. For now, just close this modal
            and refresh the page to play again.
          </p>
          <p>... but if you want to share, just screenshoot (?) for now.</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}