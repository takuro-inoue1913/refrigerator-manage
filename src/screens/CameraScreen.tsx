import React, { useEffect, useRef, useState } from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
  GestureEvent,
  PinchGestureHandlerEventPayload,
  HandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { Button, Text, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

import { GOOGLE_CLOUD_VISION_API_KEY } from '@env';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';
// import { LoadingScreen } from '@src/screens/LoadingScreen';

export const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const zoomRef = useRef(zoom);
  const lastScale = useRef(1);
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

  const onPinchGestureEvent = (
    event: GestureEvent<PinchGestureHandlerEventPayload>,
  ) => {
    const { scale } = event.nativeEvent;

    // 補正係数を適用して、デルタスケールを調整する（この値で感度を調整する）。
    const sensitivity = 0.01;

    let newZoom = (scale - 1) * sensitivity + zoomRef.current;
    newZoom = Math.max(0, Math.min(newZoom, 1));

    setZoom(newZoom);
  };

  const onHandlerStateChange = (
    event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>,
  ) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current = 1;
      zoomRef.current = zoom;
    }
  };

  useEffect(() => {
    if (permission?.granted) {
      return;
    }
    requestPermission();
  }, [permission, requestPermission]);

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
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View style={styles.container}>
          <View style={styles.topBar} />
          <Camera style={styles.camera} ref={cameraRef} zoom={zoom}>
            <View style={styles.focusBoxContainer}>
              <View style={styles.focusBox} />
            </View>
          </Camera>
          <View style={styles.footerBar}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
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
    flex: 8,
  },
  topBar: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    padding: 15,
  },
  footerBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingBottom: 50,
    paddingTop: 20,
  },
  focusBoxContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusBox: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: COMMON_COLOR_GREEN,
    backgroundColor: 'transparent',
  },
  captureButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 5,
    borderColor: 'white',
  },
  innerCircle: {
    backgroundColor: 'white',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 2,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
