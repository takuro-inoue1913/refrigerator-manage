import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button, Text, TouchableOpacity, View } from 'react-native';
// import { LoadingScreen } from '@src/screens/LoadingScreen';

export const CameraScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  /** カメラのタイプを切り替える。（フロントカメラ・バックカメラ） */
  const toggleCameraType = () => {
    setCameraType((prev) =>
      prev === CameraType.back ? CameraType.front : CameraType.back,
    );
  };

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
      <Camera style={styles.camera} type={cameraType}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
