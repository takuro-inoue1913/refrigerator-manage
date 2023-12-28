import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@src/utils/firebaseAuth';
import { GradientionTextInput } from '@src/components/GradientionTextInput';
import { LinearGradientButton } from '@src/components/GradationButton';
import { useIsShowKeyboard } from '@src/hooks/useIsShowKeyboard';
import { TopLogoImage } from '@src/components/TopLogoImage';

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isShowKeyboard = useIsShowKeyboard();

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
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
      <LinearGradientButton width={250} onPress={handleRegister}>
        <Text style={{ color: 'white' }}>登録する</Text>
      </LinearGradientButton>
    </KeyboardAvoidingView>
  );
};
