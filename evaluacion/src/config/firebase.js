import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID    
};

console.log("Configuración de Firebase:", firebaseConfig);
console.log("API_KEY:", API_KEY);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const database = getFirestore(app);
const auth = getAuth(app);

if (database) {
  console.log('Firestore inicializado correctamente');
} else {
  console.log('Error al inicializar Firestore');
}

if (auth) {
  console.log('Auth inicializado correctamente');
} else {
  console.log('Error al inicializar Auth');
}

export { database, auth };