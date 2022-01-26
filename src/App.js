import React, { useState, useEffect } from 'react';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import { peeps } from './data/Peeps';
import { randomWord } from './data/Words';
import { isAWord, isNotAWord } from './functions/index';
import logo from './assets/pwLogo.png';
import styles from './App.module.scss';

const axios = require('axios');

function App() {
  const [answer, setAnswer] = useState('');
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [userModalShow, setUserModalShow] = useState(true);
  const [peep, setPeep] = useState('');
  const { REACT_APP_MW_KEY } = process.env;

  const makeGuess = (playerGuess) => {
    //check if in dictionary
    const config = {
      method: 'get',
      url: `https://dictionaryapi.com/api/v3/references/collegiate/json/${playerGuess}?key=${REACT_APP_MW_KEY}`,
    };

    let data;
    axios(config)
      .then((response) => {
        data = response.data[0];
      })
      .then(() => {
        if (typeof data === 'object') {
          isAWord(playerGuess, answer, guessIndex);
          let plusOne = guessIndex + 1;
          setGuessIndex(plusOne);
        } else {
          isNotAWord(playerGuess, guessIndex);
        }
      });
  };

  useEffect(() => {
    const secretWord = randomWord();
    setAnswer(secretWord);
    console.log(secretWord);
  }, []);
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
      <GameBoard
        guesses={guesses}
        setGuesses={setGuesses}
        guessIndex={guessIndex}
        makeGuess={makeGuess}
      />
    </div>
  );
}

export default App;
