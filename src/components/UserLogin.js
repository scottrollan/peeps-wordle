import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { peepPeepedIn, dailyWord, getPeeps } from '../firestore/index';
import { Modal, DropdownButton, Dropdown, Button } from 'react-bootstrap';

export default function UserLogin({
  show,
  setShow,
  setPeep,
  peeps,
  setAnswer,
  setPeeps,
  setPlayingDaily,
}) {
  const [playedDailyAlready, setPlayedDailyAlready] = useState(false);
  const peep = useContext(UserContext);
  const t = new Date();
  const today = parseInt(t.setHours(0, 0, 0, 0));

  const userTrue = () => {
    setShow(false);
  };
  const setMyName = (p) => {
    setPeep({ ...p });
    setPlayedDailyAlready(p.last_daily_played === today);
    peepPeepedIn(p.name);
  };

  const dailyPuzzle = async () => {
    const wordT = await dailyWord(peep); //currently lowercase
    const wordToday = wordT.word.toUpperCase();
    console.log(wordToday);
    const updatedPeep = { ...peep, last_daily_played: today };
    console.log(`today: ${today}`);
    console.log(`updatedPeep: ${JSON.stringify(updatedPeep)}`);
    if (peep.last_daily_played === today) {
      setPlayedDailyAlready(true);
    }
    setAnswer(wordToday);
    setPlayingDaily(true);
    setShow(false);
  };

  const styles = {
    instructions: {
      display: peep.name ? 'none' : 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    letters: {
      display: 'flex',
      flexDirection: 'row',
    },
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
    buttons: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      display: peep.name ? 'flex' : 'none',
    },
    peepSelect: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    whichPeep: {
      visibility: peep.name ? 'hidden' : 'visible',
    },
  };

  useEffect(() => {
    const getAllPeeps = async () => {
      const allPeeps = await getPeeps();
      setPeeps([...allPeeps]);
    };
    getAllPeeps();
  }, []);

  return (
    <Modal show={show} dialogClassName="modal-90h">
      <Modal.Header>
        <Modal.Title>
          Guess the <strong>PEEP WORD</strong> in 6 tries.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          After each guess the color of the tiles will change to show how close
          your guess was to the word.
        </p>
        <hr style={{ borderTop: '1px solid black' }} />
        <div style={styles.instructions}>
          <h5>Examples</h5>
          <div style={styles.letters}>
            <div style={styles.greenTile}>W</div>
            <div style={styles.tile}>H</div>
            <div style={styles.tile}>I</div>
            <div style={styles.tile}>S</div>
            <div style={styles.tile}>K</div>
          </div>
          <p>
            The letter <strong>W</strong> is in the word and in the correct
            spot.
          </p>
          <div style={styles.letters}>
            <>
              <div style={styles.tile}>D</div>
              <div style={styles.yellowTile}>A</div>
              <div style={styles.tile}>I</div>
              <div style={styles.tile}>S</div>
              <div style={styles.tile}>Y</div>{' '}
            </>
          </div>
          <p>
            The letter <strong>A</strong> is in the word but in the wrong spot.
          </p>
          <div style={styles.letters}>
            <div style={styles.tile}>T</div>
            <div style={styles.tile}>A</div>
            <div style={styles.tile}>T</div>
            <div style={styles.grayTile}>E</div>
            <div style={styles.tile}>R</div>
          </div>
          <p>
            The letter <strong>E</strong> is not in the word in any spot.
          </p>
        </div>
        <div style={styles.buttons}>
          <Button onClick={() => userTrue()} variant="success">
            {peep.name}, Click Here To Play Peeps Wordle
          </Button>
          <div>- OR -</div>
          <Button
            onClick={() => dailyPuzzle()}
            variant="warning"
            disabled={playedDailyAlready}
          >
            {playedDailyAlready
              ? 'Come back tomorrow for the daily word'
              : 'PLAY THE DAILY PEEP'}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={styles.peepSelect}>
          <div style={styles.whichPeep}>Which peep are you?</div>
          <DropdownButton
            variant="secondary"
            title={`I Am ${peep.name ? peep.name : '...'}`}
            drop="start"
          >
            {peeps.map((p) => {
              return (
                <Dropdown.Item
                  key={p.name}
                  eventKey={p.name}
                  value={p.name}
                  onClick={() => setMyName(p)}
                >
                  {p.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
