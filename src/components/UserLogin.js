import React from 'react';
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
        <Modal.Title>
          Guess the <strong>PEEP WORD</strong> in 6 tries.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          After each guess (unless Barry fucked it up) the color of the tiles
          will change to show how close your guess was to the word.
        </p>
        <hr style={{ borderTop: '1px solid black' }} />
        <h5 style={{ visibility: peep ? 'hidden' : 'visible' }}>Examples</h5>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            visibility: peep ? 'hidden' : 'visible',
          }}
        >
          <div style={styles.greenTile}>W</div>
          <div style={styles.tile}>H</div>
          <div style={styles.tile}>I</div>
          <div style={styles.tile}>S</div>
          <div style={styles.tile}>K</div>
        </div>
        <p style={{ visibility: peep ? 'hidden' : 'visible' }}>
          The letter <strong>W</strong> is in the word and in the correct spot.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            visibility: peep ? 'hidden' : 'visible',
          }}
        >
          {peep ? (
            <Button
              onClick={() => userTrue()}
              style={{ visibility: peep ? 'visible' : 'hidden' }}
              variant="secondary"
            >
              {peep}, Click Here To Play Peeps Wordle
            </Button>
          ) : (
            <>
              <div style={styles.tile}>D</div>
              <div style={styles.yellowTile}>A</div>
              <div style={styles.tile}>I</div>
              <div style={styles.tile}>S</div>
              <div style={styles.tile}>Y</div>{' '}
            </>
          )}
        </div>
        <p style={{ visibility: peep ? 'hidden' : 'visible' }}>
          The letter <strong>A</strong> is in the word but in the wrong spot.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            visibility: peep ? 'hidden' : 'visible',
          }}
        >
          <div style={styles.tile}>T</div>
          <div style={styles.tile}>A</div>
          <div style={styles.tile}>T</div>
          <div style={styles.grayTile}>E</div>
          <div style={styles.tile}>R</div>
        </div>
        <p style={{ visibility: peep ? 'hidden' : 'visible' }}>
          The letter <strong>E</strong> is not in the word in any spot.
        </p>
        <div style={styles.whichPeep}>
          <span>Which peep are you?</span>
          <DropdownButton
            variant="secondary"
            title={`I Am ${peep === '' ? '...' : peep}`}
            direction="up"
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
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const styles = {
  tile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: 'none',
    height: '32px',
    width: '32px',
    fontWeight: 600,
    margin: '0 3px',
  },
  greenTile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: 'none',
    height: '32px',
    width: '32px',
    fontWeight: 600,
    margin: '0 3px',
    backgroundColor: 'var(--green)',
    color: 'white',
  },
  yellowTile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: 'none',
    height: '32px',
    width: '32px',
    fontWeight: 600,
    margin: '0 3px',
    backgroundColor: 'var(--puke-yellow)',
    color: 'white',
  },
  grayTile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: 'none',
    height: '32px',
    width: '32px',
    fontWeight: 600,
    backgroundColor: 'var(--dark-gray)',
    color: 'white',
  },
  whichPeep: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};
