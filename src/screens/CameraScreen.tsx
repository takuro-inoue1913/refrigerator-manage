import React, { useEffect } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { LinearGradientButton } from '@src/components/GradationButton';

// import { LoadingScreen } from '@src/screens/LoadingScreen';

export const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (permission?.granted) {
      return;
    }
    requestPermission();
  }, []);

  if (!permission?.granted) {
    return (
      <View style={styles.notAcsessContainer}>
        <Text>カメラの使用が許可されていません。</Text>
        <Text>設定からカメラの使用を許可してください。</Text>
        <Button
          title="設定画面を開く"
          onPress={() => Linking.openURL('app-settings:')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} />
      <View style={styles.footerContainer}>
        <LinearGradientButton
          onPress={() => console.log('pressed')}
          width={80}
          height={80}
          borderRadius={50}
        >
          <Icon name="camera" size={40} color={'white'} />
        </LinearGradientButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notAcsessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 9,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 50,
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
