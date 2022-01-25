import React, { useState } from 'react';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import { peeps } from './data/Peeps';
import { randomWord } from './data/Words';
import { Button } from 'react-bootstrap';

import logo from './assets/pwLogo.png';
import styles from './App.module.scss';

function App() {
  const [answer, setAnswer] = useState('');
  const [guessNumber, setGuessNumber] = useState(1);
  const [guesses, setGuesses] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [userModalShow, setUserModalShow] = useState(true);
  const [peep, setPeep] = useState('');
  const { REACT_APP_MW_KEY } = process.env;

  const getRandomWord = () => {
    const secretWord = randomWord();
    setAnswer(secretWord);
    console.log(secretWord);
  };

  const makeGuess = (playerGuess) => {
    //check if in dictionary
    fetch(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${playerGuess}?key=${REACT_APP_MW_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data[0].meta) {
          let plusOne = guessNumber + 1;
          setGuessNumber(plusOne);
          let elements = window.document.getElementsByClassName(
            `flippableG1L1`
          );
          // elements[0].setAttribute('style', 'transform: rotateY(180deg)');
          // elements[1].setAttribute('style', 'transform: rotateY(180deg)');
          for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('style', 'transform: rotateY(180deg)');
          }
        } else {
          console.log(`${playerGuess} was not in the dictionary`);
        }
      });
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
      <GameBoard
        guesses={guesses}
        setGuesses={setGuesses}
        guessNumber={guessNumber}
        setGuessNumber={setGuessNumber}
      />
      <Button onClick={() => getRandomWord()}>CLICK TO TEST</Button>
      <Button onClick={() => makeGuess('giant')}>Make Guess</Button>
    </div>
  );
}

export default App;
