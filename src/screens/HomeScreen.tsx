import React from 'react';
import { View, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { auth } from '@src/utils/firebaseAuth';
import { Navigation } from '@src/types';
import { LinearGradientButton } from '@src/components/GradationButton';

export const HomeScreen = () => {
  const navigation = useNavigation<Navigation>();

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
      <View>
        <LinearGradientButton onPress={() => navigation.navigate('Camera')}>
          <Text style={{ color: 'white' }}>バーコード読み取り</Text>
        </LinearGradientButton>
      </View>
    </View>
  );
};
