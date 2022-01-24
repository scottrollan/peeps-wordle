import React, { useState } from 'react';
import { Modal, DropdownButton, Dropdown, Button } from 'react-bootstrap';

export default function UserLogin({ show, setShow, peep, setPeep, peeps }) {
  const userTrue = () => {
    setShow(false);
  };
  const setMyName = (name) => {
    setPeep(name);
  };
  return (
    <Modal show={show} dialogClassName="modal-90h">
      <Modal.Header>
        <Modal.Title>Peeps Wordle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Y'all already know how to play, so no instructions, just tell me who you
        are.
        <DropdownButton
          variant="secondary"
          title={`I Am ${peep === '' ? '...' : peep}`}
        >
          {peeps.map((p, idx) => {
            return (
              <Dropdown.Item
                key={p.name}
                eventKey={p.name}
                value={p.name}
                onClick={() => setMyName(p.name)}
              >
                {p.name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => userTrue()}
          style={{ visibility: peep ? 'visible' : 'hidden' }}
        >
          {peep}, Click Here To Play Peeps Wordle
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
