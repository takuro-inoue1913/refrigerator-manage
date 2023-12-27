import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@src/utils/firebaseAuth';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from '@src/types';

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
      <Text>ホーム画面</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: '#88cb7f',
          borderRadius: 10,
          width: 100,
        }}
      >
        <Text style={{ color: 'white' }}>ログアウト</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: '#88cb7f',
          borderRadius: 10,
          width: 100,
        }}
      >
        <Text style={{ color: 'white' }}>バーコード読み取り</Text>
      </TouchableOpacity>
    </View>
  );
};
