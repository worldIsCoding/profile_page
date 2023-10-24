// Import the functions you need from the SDKs you need
import { initializeApp,getApps  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:   "AIzaSyAlRgWTGWhM7uswxkWAAunSkX5CmGyKneI",
  authDomain: "angusprofilepage.firebaseapp.com",
  projectId: "angusprofilepage",
  storageBucket: "angusprofilepage.appspot.com",
  messagingSenderId: "570846220204",
  appId: "1:570846220204:web:c858dd8d52b34446003409",
  measurementId: "G-YFK9XZ0ERC"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


let app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };



//use env better
// NEXT_PUBLIC_FIREBASE_API_KEY=api-key      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth-domain
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storage-bucket
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender-id
// NEXT_PUBLIC_FIREBASE_APP_ID=app-id
// NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=analytic-id