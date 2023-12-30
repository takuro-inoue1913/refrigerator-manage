// import { StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@src/screens/HomeScreen';
import { RegisterScreen } from '@src/screens/RegisterScreen';
import { LoginScreen } from '@src/screens/LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/utils/firebaseAuth';
import { userState, idTokenState } from '@src/states/user';
import { CameraScreen } from '@src/screens/CameraScreen';
import { LoadingScreen } from '@src/screens/LoadingScreen';
import { PasswordResetScreen } from './screens/PasswordResetScreen';

export const App: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const setIdToken = useSetRecoilState(idTokenState);
  const [initializing, setInitializing] = useState(true);
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

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

  const LoginStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordResetScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = '';
              if (route.name === 'My Page') {
                iconName = 'home';
              } else if (route.name === 'Camera') {
                iconName = 'camera';
              } else if (route.name === 'ログイン') {
                iconName = 'login';
              } else if (route.name === '新規登録') {
                iconName = 'account-plus';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2ecc71',
            tabBarInactiveTintColor: '#3498db',
          })}
        >
          {user ? (
            <>
              <Tab.Screen name="My Page" component={HomeScreen} />
              <Tab.Screen name="Camera" component={CameraScreen} />
            </>
          ) : (
            <>
              <Tab.Screen name="ログイン" component={LoginStack} />
              <Tab.Screen name="新規登録" component={RegisterScreen} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};
