import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  query,
  onSnapshot,
  doc,
  setDoc,
  increment,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBbha4TtforFWBnSbs0h7l08hpW8zuebVI',
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
export const getPeep = async (db, peep) => {};

export const peepPeepedIn = async (peep) => {
  await updateDoc(doc(db, 'peeps', peep), {
    peeped_in: increment(1),
  });
};

export const addAPeep = async (data) => {
  await setDoc(doc(db, 'peeps', data.name), {
    name: data.name,
    games_played: 0,
    games_won: 0,
    games_lost: 0,
    games_forfeited: 0,
    daily_game_guesses: [],
  });
  console.log(`${data.name} added successully!`);
};
export const addAWord = async (data) => {
  await setDoc(doc(db, 'dailyWords', data.word), { data });
};
