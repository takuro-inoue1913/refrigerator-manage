// import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot, useRecoilState } from 'recoil';

import { HomeScreen } from '@src/screens/HomeScreen';
import { RegisterScreen } from '@src/screens/RegisterScreen';
import { LoginScreen } from '@src/screens/LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/utils/firebaseAuth';
import { userState } from '@src/states/user';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken: string) => {
          console.log('idToken: ', idToken);
        });
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
