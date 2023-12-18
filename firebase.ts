import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVGSixjE_nqfFlUFh59xWiS90qC1M1CSE",
  authDomain: "refrigerator-manage.firebaseapp.com",
  projectId: "refrigerator-manage",
  storageBucket: "refrigerator-manage.appspot.com",
  messagingSenderId: "458856160759",
  appId: "1:458856160759:web:656fb97fe0e247041462f2",
  measurementId: "G-MGWYPE9EG3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);