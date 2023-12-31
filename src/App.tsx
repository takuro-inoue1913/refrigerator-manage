import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import { HomeScreen } from '@src/screens/HomeScreen';
import { RegisterScreen } from '@src/screens/RegisterScreen';
import { LoginScreen } from '@src/screens/LoginScreen';
import { auth } from '@src/utils/firebaseAuth';
import { userState, idTokenState } from '@src/states/user';
import { CameraScreen } from '@src/screens/CameraScreen';
import { LoadingScreen } from '@src/screens/LoadingScreen';
import { PasswordResetScreen } from '@src/screens/PasswordResetScreen';
import { FridgeScreen } from '@src/screens/FridgeScreen';

export const App: FC = () => {
  const setUser = useSetRecoilState(userState);
  const [idToken, setIdToken] = useRecoilState(idTokenState);
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
        setIdToken(null);
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  if (initializing) return <LoadingScreen />;

  const LoginStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ログイン" component={LoginScreen} />
        <Stack.Screen
          name="パスワードリセット"
          component={PasswordResetScreen}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = '';
            if (route.name === 'マイページ') {
              iconName = 'home';
            } else if (route.name === '読み取り') {
              iconName = 'camera';
            }
            if (route.name === '冷蔵庫管理') {
              iconName = 'fridge';
            } else if (route.name === 'Login') {
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
        {idToken ? (
          <>
            <Tab.Screen name="マイページ" component={HomeScreen} />
            <Tab.Screen name="冷蔵庫管理" component={FridgeScreen} />
            <Tab.Screen name="読み取り" component={CameraScreen} />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginStack}
            />
            <Tab.Screen name="新規登録" component={RegisterScreen} />
          </>
        )}
      </Tab.Navigator>
      <Toast topOffset={100} />
    </NavigationContainer>
  );
};
