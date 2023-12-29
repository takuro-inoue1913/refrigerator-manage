import React from 'react';
import { View, Text } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth } from '@src/utils/firebaseAuth';
import { LinearGradientButton } from '@src/components/GradationButton';

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('logout');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <View>
      <View>
        <LinearGradientButton onPress={handleLogout}>
          <Text style={{ color: 'white' }}>ログアウト</Text>
        </LinearGradientButton>
      </View>
    </View>
  );
};
