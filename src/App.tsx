// import { StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';

import { HomeScreen } from '@src/screens/HomeScreen';
import { RegisterScreen } from '@src/screens/RegisterScreen';
import { LoginScreen } from '@src/screens/LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/utils/firebaseAuth';
import { userState, idTokenState } from '@src/states/user';
import { CameraScreen } from './screens/CameraScreen';
import { LoadingScreen } from './screens/LoadingScreen';

const { Screen, Navigator } = createNativeStackNavigator();

export const App: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const setIdToken = useSetRecoilState(idTokenState);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken: string) => setIdToken(idToken));
        // MEMO: user は Object.freeze() されているため、setUser で更新するときは新しいオブジェクトを渡す必要がある。
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
        });
      } else {
        setUser(null);
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  if (initializing) return <LoadingScreen />;

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Navigator>
          {user ? (
            <>
              <Screen name="Home" component={HomeScreen} />
              <Screen name="Camera" component={CameraScreen} />
            </>
          ) : (
            <>
              <Screen name="Login" component={LoginScreen} />
              <Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};
