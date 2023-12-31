import React from 'react';
import { View, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import Toast from 'react-native-toast-message';

import { auth } from '@src/utils/firebaseAuth';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { handleFirebaseError } from '@src/utils/handleFirebaseError';
import { useGetUser } from '@src/interface/hooks/useGetUser';

export const HomeScreen = () => {
  const { data } = useGetUser();
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'ログアウトに失敗しました。',
        text2: handleFirebaseError(error.code),
      });
    });
  };
  return (
    <View>
      <View>
        <LinearGradientButton onPress={handleLogout}>
          <Text style={{ color: 'white' }}>ログアウト</Text>
        </LinearGradientButton>
        <Text>{data?.email}</Text>
        <Text>{data?.id}</Text>
      </View>
    </View>
  );
};
