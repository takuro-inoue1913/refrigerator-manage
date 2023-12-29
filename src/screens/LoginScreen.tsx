import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { auth } from '@src/utils/firebaseAuth';
import { LinearGradientButton } from '@src/components/GradationButton';
import { GradientionTextInput } from '@src/components/GradientionTextInput';
import { useIsShowKeyboard } from '@src/hooks/useIsShowKeyboard';
import { TopLogoImage } from '@src/components/TopLogoImage';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isShowKeyboard = useIsShowKeyboard();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
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
      <View>
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
    </KeyboardAvoidingView>
  );
};
