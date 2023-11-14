import { initializeApp } from "firebase/app";
import 'firebase/database';
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC558DdkjCiNclzB6X-TZUjQwx8FQBLp8s",
  authDomain: "feelfine-fbd9d.firebaseapp.com",
  projectId: "feelfine-fbd9d",
  storageBucket: "feelfine-fbd9d.appspot.com",
  messagingSenderId: "889951967626",
  appId: "1:889951967626:web:7b1d376a27d5e285f4d073"
};

const app = initializeApp(firebaseConfig);




export const auth = getAuth(app)
export const db = getFirestore(app)
