import React, { useState, useEffect, createContext } from 'react';
import Div100vh from 'react-div-100vh';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import EndOfGame from './components/EndOfGame';
import $ from 'jquery';
import {
  canCopyImagesToClipboard,
  requestClipboardWritePermission,
} from 'copy-image-clipboard';
import { peeps } from './data/Peeps';
import { randomWord } from './functions/index';
import { checkWord } from './functions/index';
import { startOver } from './functions/StartOver';
import logo from './assets/pwLogo.png';
import styles from './App.module.scss';

export const UserContext = createContext();

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
  const [canWrite, setCanWrite] = useState(false);
  const [shareableImage, setShareableImage] = useState();

  const newGame = () => {
    startOver(
      setAnswer,
      setGuesses,
      guessIndex,
      setGuessIndex,
      setEndModalShow
    );
  };

  const makeGuess = (playerGuess) => {
    const guessLength = playerGuess.length;
    const params = {
      playerGuess,
      answer,
      guessIndex,
      setGuessIndex,
      setEndModalShow,
      peep,
      guesses,
      canWrite,
      shareableImage,
      setShareableImage,
    };
    switch (guessLength) {
      case 5:
        checkWord(params);
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
    const canCopy = canCopyImagesToClipboard();
    let writePermission = false;
    requestClipboardWritePermission()
      .then((hasPermission) => {
        writePermission = hasPermission;
      })
      .then(() => {
        if (canCopy && writePermission) {
          setCanWrite(true);
        }
      });
  }, []);

  return (
    <Div100vh className={styles.app}>
      <UserContext.Provider value={peep}>
        <UserLogin
          show={userModalShow}
          setShow={setUserModalShow}
          peeps={peeps}
          setPeep={setPeep}
        />
        <EndOfGame
          show={endModalShow}
          setShow={setEndModalShow}
          answer={answer}
          newGame={newGame}
          guesses={guesses}
          guessIndex={guessIndex}
          canWrite={canWrite}
          shareableImage={shareableImage}
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
      </UserContext.Provider>
    </Div100vh>
  );
}

export default App;
