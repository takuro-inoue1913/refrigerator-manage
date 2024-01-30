import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Camera, FlashMode } from 'expo-camera';
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
  GestureEvent,
  PinchGestureHandlerEventPayload,
  HandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { GOOGLE_CLOUD_VISION_API_KEY } from '@env';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';

const NOMAL_ZOOM = 0.001;
const HALF_ZOOM = 0;
const DOUBLE_ZOOM = 0.01;

type Props = {
  visible: boolean;
  onClose: () => void;
  onTakePicture: (uri: string) => void;
};

export const CameraModal: FC<Props> = ({ visible, onClose, onTakePicture }) => {
  const [flashMode, setFlashMode] = useState<FlashMode.on | FlashMode.off>(
    FlashMode.off,
  );
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoom, setZoom] = useState(NOMAL_ZOOM);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const zoomRef = useRef(zoom);
  const lastScale = useRef(1);
  const cameraRef = useRef<Camera>(null);

  // const analyzeImageWithGoogleVision = async (base64: string) => {
  //   try {
  //     const body = JSON.stringify({
  //       requests: [
  //         {
  //           features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
  //           image: {
  //             content: base64,
  //           },
  //         },
  //       ],
  //     });

  //     const response = await fetch(
  //       `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`, // ここにあなたのAPIキーを入れてください
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         method: 'POST',
  //         body: body,
  //       },
  //     );

  //     const responseJson = await response.json();
  //     console.log(
  //       'textAnnotations.description: ',
  //       responseJson.responses?.[0].textAnnotations?.[0].description as string,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      base64: true,
    });
    if (photo && photo.base64) {
      setPhotoUri(photo.uri);
      // analyzeImageWithGoogleVision(photo.base64);
    }
  };

  const toggleFlash = () => {
    if (flashMode === FlashMode.off) {
      setFlashMode(FlashMode.on);
    } else {
      setFlashMode(FlashMode.off);
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

  const changeZoom = (newZoom: number) => {
    setZoom(newZoom);
    zoomRef.current = newZoom;
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

  const renderCapturedPhoto = () => {
    return (
      <View style={styles.container}>
        <View style={styles.topBar} />
        <Image source={{ uri: photoUri }} style={styles.capturedImage} />
        <View style={styles.footerBar}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => setPhotoUri(undefined)}
          >
            <Text style={styles.confirmButtonText}>撮り直す</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              onTakePicture(photoUri!);
              setPhotoUri(undefined);
              onClose();
            }}
          >
            <Text style={styles.confirmButtonText}>決定</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      {photoUri && renderCapturedPhoto()}
      {!photoUri && (
        <GestureHandlerRootView style={styles.container}>
          <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <View style={styles.container}>
              <View style={styles.topBar}>
                <TouchableOpacity
                  onPress={toggleFlash}
                  style={styles.flashIconContainer}
                >
                  <Icon
                    name="flash"
                    size={24}
                    color={flashMode === FlashMode.off ? 'white' : 'yellow'}
                  />
                </TouchableOpacity>
              </View>
              <Camera
                style={styles.camera}
                ref={cameraRef}
                zoom={zoom}
                flashMode={flashMode}
              >
                <View style={styles.focusBoxContainer}>
                  <View style={styles.focusBox} />
                  <View style={styles.zoomButtonContainer}>
                    <TouchableOpacity
                      key={'2.0x'}
                      style={[
                        styles.button,
                        zoom === DOUBLE_ZOOM && styles.selectedButton,
                      ]}
                      onPress={() => changeZoom(DOUBLE_ZOOM)}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          zoom === DOUBLE_ZOOM && styles.selectedText,
                        ]}
                      >
                        2.0x
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={'1.0x'}
                      style={[
                        styles.button,
                        zoom === NOMAL_ZOOM && styles.selectedButton,
                      ]}
                      onPress={() => changeZoom(NOMAL_ZOOM)}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          zoom === NOMAL_ZOOM && styles.selectedText,
                        ]}
                      >
                        1.0x
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={'0.5x'}
                      style={[
                        styles.button,
                        zoom === HALF_ZOOM && styles.selectedButton,
                      ]}
                      onPress={() => changeZoom(HALF_ZOOM)}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          zoom === HALF_ZOOM && styles.selectedText,
                        ]}
                      >
                        0.5x
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Camera>
              <View style={styles.footerBar}>
                <TouchableOpacity
                  style={styles.leftButton}
                  onPress={() => {
                    setPhotoUri(undefined);
                    onClose();
                  }}
                >
                  <Text style={styles.confirmButtonText}>キャンセル</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                >
                  <View style={styles.outerCircle}>
                    <View style={styles.innerCircle} />
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
              </View>
            </View>
          </PinchGestureHandler>
        </GestureHandlerRootView>
      )}
    </Modal>
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
    justifyContent: 'space-around',
    backgroundColor: 'black',
    paddingBottom: 50,
    paddingTop: 20,
  },
  focusBoxContainer: {
    position: 'absolute',
    top: '55%',
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
  zoomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 5,
    borderRadius: 50,
    width: 170,
    opacity: 0.8,
    backgroundColor: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  selectedButton: {
    backgroundColor: COMMON_COLOR_GREEN,
  },
  selectedText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  flashIconContainer: {
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  flashIcon: {
    color: 'white',
  },
  capturedImage: {
    flex: 8,
  },
  confirmButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  leftButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
