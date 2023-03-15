import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  increment,
  updateDoc,
  DocumentSnapshot,
} from 'firebase/firestore';

const { REACT_APP_MW_KEY } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_MW_KEY,
  authDomain: 'peeps-wordle.firebaseapp.com',
  projectId: 'peeps-wordle',
  storageBucket: 'peeps-wordle.appspot.com',
  messagingSenderId: '735052812064',
  appId: '1:735052812064:web:190b2d41add4be5cec1145',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Realtime Database Functions//
export const db = getFirestore();

//Get my peep info
export const getPeep = async (peep) => {
  await getDoc(doc(db, 'peeps', peep));
  return DocumentSnapshot.data();
};

export const getPeeps = async () => {
  let peeps = [];
  const querySnapshot = await getDocs(collection(db, 'peeps'));
  querySnapshot.forEach((doc) => {
    peeps.push(doc.data());
  });
  return peeps;
};

export const peepStartedGame = async (peep) => {
  updateDoc(doc(db, 'peeps', peep), {
    regular_games_played: increment(1),
  });
};

export const peepWon = async (peep, guesses) => {
  const guessNum = guesses + 1;
  const wonIn = `games_won_in_${guessNum}`;
  const gameWon = {
    games_played: increment(1),
    games_won: increment(1),
    [wonIn]: increment(1),
    most_recent_guess_number: guessNum,
  };
  await updateDoc(doc(db, 'peeps', peep), gameWon);
};

export const peepLost = async (peep) => {
  const gameWon = {
    games_played: increment(1),
    games_lost: increment(1),
  };
  await updateDoc(doc(db, 'peeps', peep), gameWon);
};

// export const peepPeepedIn = async (peep, iWon, guesses) => {
//   const wonIn = `games_won_in_${guesses}`;
//   const gameWon = iWon
//     ? {
//         games_won: increment(1),
//         [wonIn]: increment(1),
//       }
//     : {
//         games_lost: increment(1),
//       };

//   await updateDoc(doc(db, 'peeps', peep), gameWon);
// };

export const dailyWord = async (peep) => {
  let t = new Date();
  const d = t.setHours(0, 0, 0, 0); //so time is always 12am
  const today = t.getTime(); //converts to milliseconds
  const ninetyDaysAgo = t - 7776000000;

  let words = [];
  let selectedWord;
  const querySnapshot = await getDocs(collection(db, 'dailyWords'));
  querySnapshot.forEach((doc) => {
    words.push(doc.data());
  });
  //determine wheter another user has already initiated the word for today
  let wordObj = words.find((w) => w.last_used === today);
  if (wordObj) {
    selectedWord = {
      last_used: wordObj.last_used,
      word: wordObj.word.toUpperCase(),
    };
    await updateDoc(doc(db, 'peeps', peep.name), {
      last_daily_played: d,
    });
    return selectedWord;
  }
  do {
    const maxIdx = words.length - 1;
    const wordIndex = Math.floor(Math.random() * maxIdx);
    selectedWord = words[wordIndex];
  } while (selectedWord.last_used > ninetyDaysAgo);
  await updateDoc(doc(db, 'dailyWords', selectedWord.word), {
    last_used: today,
  });

  await updateDoc(doc(db, 'peeps', peep.name), {
    last_daily_played: d,
  });
  return selectedWord;
};

export const regularPlay = async () => {
  let words = [];
  let selectedWord;
  const querySnapshot = await getDocs(collection(db, 'dailyWords'));
  querySnapshot.forEach((doc) => {
    const wordData = doc.data();
    selectedWord = wordData.word;
    words.push(selectedWord);
  });
  const maxIdx = words.length - 1;
  const wordIndex = Math.floor(Math.random() * maxIdx);
  selectedWord = words[wordIndex];
  return selectedWord;
};

////////////Not Yet In Use///////////////
export const addAPeep = async (data) => {
  await setDoc(doc(db, 'peeps', data.name), {
    name: data.name,
    games_played: 0,
    games_won: 0,
    games_lost: 0,
    daily_game_guesses: [],
  });
  console.log(`${data.name} added successully!`);
};
export const addAWord = async (word) => {
  await setDoc(doc(db, 'dailyWords', word), {
    word: word,
    last_used: 0,
  });
};
