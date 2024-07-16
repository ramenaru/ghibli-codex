import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAIv4sVExRduq-jSYM1DYSbv96wwOAfwpU",
    authDomain: "ghibli-codex.firebaseapp.com",
    projectId: "ghibli-codex",
    storageBucket: "ghibli-codex.appspot.com",
    messagingSenderId: "394909679536",
    appId: "1:394909679536:web:9d711d87a4bc68db5da075",
    measurementId: "G-X1S0TVET33"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
