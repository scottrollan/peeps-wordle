import React, { useState, useEffect, createContext } from 'react';
import Div100vh from 'react-div-100vh';
import { Form } from 'react-bootstrap';
import UserLogin from './components/UserLogin';
import GameBoard from './components/GameBoard';
import EndOfGame from './components/EndOfGame';
import Stats from './components/Stats';
import Opt from './components/Opt';
import $ from 'jquery';
import {
  canCopyImagesToClipboard,
  requestClipboardWritePermission,
} from 'copy-image-clipboard';
import { checkWord } from './functions/index';
import { startGame } from './functions/StartGame';
import logo from './assets/pwLogo.png';
import styles from './App.module.scss';

export const UserContext = createContext();

function App() {
  const [answer, setAnswer] = useState('');
  const [guessIndex, setGuessIndex] = useState(0);
  const [hardMode, setHardMode] = useState(false);
  const [guesses, setGuesses] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [squares, setSquares] = useState({
    r1L1: '',
    r1L2: '',
    r1L3: '',
    r1L4: '',
    r1L5: '',
    r2L1: '',
    r2L2: '',
    r2L3: '',
    r2L4: '',
    r2L5: '',
    r3L1: '',
    r3L2: '',
    r3L3: '',
    r3L4: '',
    r3L5: '',
    r4L1: '',
    r4L2: '',
    r4L3: '',
    r4L4: '',
    r4L5: '',
    r5L1: '',
    r5L2: '',
    r5L3: '',
    r5L4: '',
    r5L5: '',
    r6L1: '',
    r6L2: '',
    r6L3: '',
    r6L4: '',
    r6L5: '',
  });
  const [userModalShow, setUserModalShow] = useState(true);
  const [endModalShow, setEndModalShow] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const [peep, setPeep] = useState({});
  const [peeps, setPeeps] = useState([]);
  const [canWrite, setCanWrite] = useState(false);
  const [shareableImage, setShareableImage] = useState();
  const [playingDaily, setPlayingDaily] = useState(false);
  const [iWon, setIWon] = useState(false);

  const newGame = () => {
    startGame(peep, setAnswer, setGuesses, setGuessIndex, setEndModalShow);
  };

  const makeGuess = (playerGuess) => {
    const guessLength = playerGuess.length;
    const params = {
      playerGuess,
      answer,
      guessIndex,
      setGuessIndex,
      setEndModalShow,
      peep: peep.name,
      guesses,
      squares,
      setSquares,
      canWrite,
      shareableImage,
      setShareableImage,
      playingDaily,
      setIWon,
      // hardMode,
    };
    if (guessLength === 5) {
      checkWord(params);
    } else {
      $(`.shakeableG${guessIndex}`).addClass('shake');
    }
  };

  const openStatsModal = () => {
    $('#statsModal').load(window.location.href + ' #statsModal');
    setShowStats(true);
  };
  const openOptModal = () => {
    setShowOpt(true);
  };

  const toggleHardMode = () => {
    setHardMode(!hardMode);
  };

  useEffect(() => {
    // startGame(peep, setAnswer, setGuesses, setGuessIndex, setEndModalShow);
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
        <Stats me={peep} show={showStats} setShow={setShowStats} />
        <Opt
          show={showOpt}
          setShow={setShowOpt}
          hardMode={hardMode}
          setHardMode={setHardMode}
        />
        <UserLogin
          show={userModalShow}
          setShow={setUserModalShow}
          setPeep={setPeep}
          peeps={peeps}
          setPeeps={setPeeps}
          setAnswer={setAnswer}
          setPlayingDaily={setPlayingDaily}
          setGuesses={setGuesses}
          setGuessIndex={setGuessIndex}
          setEndModalShow={setEndModalShow}
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
          playingDaily={playingDaily}
          setPlayingDaily={setPlayingDaily}
          iWon={iWon}
        />
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h3>Peeps Wordle</h3>
          <div className={styles.options}>
            <i
              className={`${styles.optButton} fa-solid fa-gear`}
              onClick={() => openOptModal()}
            ></i>

            <i
              className={`fa-solid fa-chart-simple ${styles.statsButton}`}
              onClick={() => openStatsModal()}
            ></i>
          </div>
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
