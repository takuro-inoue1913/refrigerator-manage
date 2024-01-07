import { initializeApp, FirebaseOptions } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { Platform } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// 環境変数のインポート
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';

// Firebase構成オブジェクト
const firebaseOptions: FirebaseOptions = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseOptions);

// 認証オブジェクトの初期化をプラットフォーム毎に分ける
let auth: ReturnType<typeof initializeAuth>;

if (Platform.OS === 'web') {
  // Webプラットフォーム用の初期化
  auth = initializeAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// 外部から利用可能にするためにauthをエクスポート
export { auth };
