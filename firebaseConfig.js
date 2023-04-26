
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyBq1AhxDGDWef55gOlWCVJuDlnKnC97syU',
  authDomain: 'todo-bcea1.firebaseapp.com',
  databaseURL: 'https://passwordmanager-5f683-default-rtdb.firebaseio.com',
  projectId: 'todo-bcea1',
  storageBucket: 'todo-bcea1.appspot.com',
  messagingSenderId: '650647163685',
  appId: 'app-1-650647163685-ios-5567a59158982eaa2fc0cc',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const auth = getAuth(app);

const db = getFirestore(app);

const dbName = "todos";

export { auth, db, dbName };
