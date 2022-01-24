import React, { useState } from 'react';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import { peeps } from './data/Peeps';
import { randomWord } from './data/Words';
import { Button } from 'react-bootstrap';

import logo from './assets/pwLogo.png';
import styles from './App.module.scss';

function App() {
  const [userModalShow, setUserModalShow] = useState(true);
  const [peep, setPeep] = useState('');

  const getRandomWord = () => {
    const secretWord = randomWord();
    console.log(secretWord);
  };

  return (
    <div className={styles.app}>
      <UserLogin
        show={userModalShow}
        setShow={setUserModalShow}
        peeps={peeps}
        peep={peep}
        setPeep={setPeep}
      />
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h3>Peeps Wordle</h3>
      </div>
      <GameBoard />
    </div>
  );
}

export default App;
