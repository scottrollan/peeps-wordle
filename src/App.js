import React, { useState, useEffect, useRef } from 'react';
import Div100vh from 'react-div-100vh';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import EndOfGame from './components/EndOfGame';
import $ from 'jquery';
import { peeps } from './data/Peeps';
import { randomWord } from './data/Words';
import { checkWord } from './functions/index';
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
    ['', '', '', '', ''],
  ]);
  const [userModalShow, setUserModalShow] = useState(true);
  const [endModalShow, setEndModalShow] = useState(false);
  const [peep, setPeep] = useState('');
  const headerRef = useRef();

  const makeGuess = (playerGuess) => {
    const guessLength = playerGuess.length;
    switch (guessLength) {
      case 5:
        checkWord(
          playerGuess,
          answer,
          guessIndex,
          setGuessIndex,
          setEndModalShow
        );
        break;
      default:
        $(`.shakeableG${guessIndex}`).addClass('shake');
    }
  };

  useEffect(() => {
    const secretWord = randomWord();
    const wordle = secretWord.toUpperCase();
    setAnswer(wordle);
    console.log(wordle);
    headerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <Div100vh className={styles.app}>
      <UserLogin
        show={userModalShow}
        setShow={setUserModalShow}
        peeps={peeps}
        peep={peep}
        setPeep={setPeep}
      />
      <EndOfGame show={endModalShow} peep={peep} setShow={setEndModalShow} />
      <div className={styles.header} ref={headerRef}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h3>Peeps Wordle</h3>
      </div>
      <GameBoard
        guesses={guesses}
        setGuesses={setGuesses}
        guessIndex={guessIndex}
        makeGuess={makeGuess}
      />
    </Div100vh>
  );
}

export default App;
