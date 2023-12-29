import React, { useEffect, useRef } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { GOOGLE_CLOUD_VISION_API_KEY } from '@env';
import { LinearGradientButton } from '@src/components/GradationButton';

// import { LoadingScreen } from '@src/screens/LoadingScreen';

export const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const analyzeImageWithGoogleVision = async (base64: string) => {
    try {
      const body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
            image: {
              content: base64,
            },
          },
        ],
      });

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`, // ここにあなたのAPIキーを入れてください
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );

      const responseJson = await response.json();
      console.log(
        'textAnnotations.description: ',
        responseJson.responses?.[0].textAnnotations?.[0].description as string,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      base64: true,
    });
    if (photo && photo.base64) {
      analyzeImageWithGoogleVision(photo.base64);
    }
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
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.footerContainer}>
        <LinearGradientButton
          onPress={takePicture}
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
    justifyContent: 'center',
    paddingBottom: 50,
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
