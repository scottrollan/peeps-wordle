import React, { useState, useEffect } from 'react';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import { peeps } from './data/Peeps';
import { randomWord } from './data/Words';
import logo from './assets/pwLogo.png';
import styles from './App.module.scss';

function App() {
  const [answer, setAnswer] = useState('');
  const [guessIndex, setGuessIndex] = useState(0);
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

  const makeGuess = (playerGuess) => {
    //check if in dictionary
    fetch(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${playerGuess}?key=${REACT_APP_MW_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data[0].meta) {
          let elements = window.document.getElementsByClassName(
            `flippableG${guessIndex}`
          );
          console.log(elements.length);
          for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('style', 'transform: rotateY(180deg);');
          }
          // for (let i = 0; i < elements.length; i++) {
          //   elements[i].a('style', '-webkit-transform: rotateY(180deg);');
          // }
          // let plusOne = guessIndex + 1;
          // setGuessIndex(plusOne);
        } else {
          console.log(`${playerGuess} was not in the dictionary`);
          //trigger a "not a word" effect in GameBoard
          let elements = window.document.getElementsByClassName(
            `shakeableG${guessIndex}`
          );
          console.log(`Found ${elements.length} shakeable lines`);
          for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add('shake');
            // elements[i].setAttribute('style', 'animation: shake;');
          }
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
