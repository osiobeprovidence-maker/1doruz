import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyATAMEkIOnWMmoT7dxq0B-5mSCCthMmrNE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'doruz-7875d.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'doruz-7875d',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'doruz-7875d.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '530990666859',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:530990666859:web:0b619efe90bb7d6c2ecd2e',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? 'G-BXTW6JQB7Q',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
