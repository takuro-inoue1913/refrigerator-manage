import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import { auth } from '@src/utils/firebaseSettings';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { GradientionTextInput } from '@src/components/common/GradientionTextInput';
import { useIsShowKeyboard } from '@src/hooks/useIsShowKeyboard';
import { TopLogoImage } from '@src/components/common/TopLogoImage';
import { handleFirebaseError } from '@src/utils/handleFirebaseError';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isShowKeyboard = useIsShowKeyboard();
  const navigation = useTypedNavigation();

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'ログインに失敗しました。',
        text2: handleFirebaseError(error.code),
      });
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: isShowKeyboard ? 'flex-start' : 'center',
        paddingTop: isShowKeyboard ? 100 : 0,
        backgroundColor: 'white',
      }}
    >
      <TopLogoImage isShowKeyboard={isShowKeyboard} />
      <View style={{ marginBottom: 20 }}>
        <GradientionTextInput
          style={{ width: 250 }}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレスを入力してください"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <GradientionTextInput
          style={{ width: 250 }}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <LinearGradientButton width={250} onPress={handleLogin}>
        <Text style={{ color: 'white' }}>ログイン</Text>
      </LinearGradientButton>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{ color: COMMON_COLOR_GREEN }}
          onPress={() => navigation.navigate('パスワードリセット')}
        >
          パスワードを忘れた方はこちら
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};
