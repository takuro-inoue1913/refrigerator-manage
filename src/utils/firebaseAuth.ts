import { initializeApp, FirebaseOptions } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseOptions: FirebaseOptions = {
  apiKey: 'AIzaSyDVGSixjE_nqfFlUFh59xWiS90qC1M1CSE',
  authDomain: 'refrigerator-manage.firebaseapp.com',
  projectId: 'refrigerator-manage',
  storageBucket: 'refrigerator-manage.appspot.com',
  messagingSenderId: '458856160759',
  appId: '1:458856160759:web:656fb97fe0e247041462f2',
  measurementId: 'G-MGWYPE9EG3',
};

const app = initializeApp(firebaseOptions);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
