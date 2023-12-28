import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { auth } from '@src/utils/firebaseAuth';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from '@src/types';
import { LinearGradientButton } from '@src/components/GradationButton';
import { GradientionTextInput } from '@src/components/GradientionTextInput';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<Navigation>();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>ログイン画面</Text>
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
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text>ユーザ登録はこちら</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
