import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxKvDS0DE4T7-JdpgjVgrmUBIiF-YbwYU",
  authDomain: "techassist-flutter-next.firebaseapp.com",
  projectId: "techassist-flutter-next",
  storageBucket: "techassist-flutter-next.appspot.com",
  messagingSenderId: "970587080955",
  appId: "1:970587080955:web:6b55de12be60109da6885e",
  measurementId: "G-ETSGVH6CM3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
  };
}
