import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firestore/index';
import styles from './Stats.module.scss';

export default function Stats(props) {
  const { me, show, setShow } = props;
  const [peep, setPeep] = useState({ ...me });

  const handleClose = () => setShow(false);

  useEffect(() => {
    const q = query(
      collection(db, 'peeps')
      // where('name', '==', peep.name || 'Guest')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const newStats = change.doc.data();
        setPeep({ ...newStats });
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} id="statsModal">
        <Modal.Header closeButton>
          <Modal.Title>{peep.name}'s Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.summaryLine}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{peep.games_played}</div>
              <div>Played</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>
                {((peep.games_won / peep.games_played) * 100).toFixed()}
              </div>
              <div>Win %</div>
            </div>
          </div>
          <div className={styles.distributionDiv}>
            <h6>GUESS DISTRIBUTION</h6>
            {[1, 2, 3, 4, 5, 6].map((number) => {
              const dataKey = `games_won_in_${number}`;
              const guessDists = [
                peep.games_won_in_1,
                peep.games_won_in_2,
                peep.games_won_in_3,
                peep.games_won_in_4,
                peep.games_won_in_5,
                peep.games_won_in_6,
              ];
              const topGuessNum = Math.max(...guessDists);
              return (
                <div className={styles.barLine} key={number}>
                  <div className={styles.label}>{number}</div>
                  <div className={styles.barWrapper}>
                    <div
                      className={styles.bar}
                      style={{
                        width: `${(peep[dataKey] / topGuessNum) * 100}%`,
                        backgroundColor:
                          number === peep.most_recent_guess_number
                            ? 'var(--purple)'
                            : peep[dataKey] === 0
                            ? 'transparent'
                            : 'gray',
                      }}
                    >
                      {peep[dataKey] ? peep[dataKey] : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
