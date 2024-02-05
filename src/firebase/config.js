import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC63adHVJRTghZEFJN72EmcSKqbDvMaFcw",
  authDomain: "ileri-react-redux-19d68.firebaseapp.com",
  databaseURL: "https://ileri-react-redux-19d68-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ileri-react-redux-19d68",
  storageBucket: "ileri-react-redux-19d68.appspot.com",
  messagingSenderId: "14294570421",
  appId: "1:14294570421:web:cdd7d685e3d8f988b5f5fc"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage=getStorage(app);

export { db, auth , storage};
