import React, { useEffect, useRef } from 'react';
import {
  Modal,
  Animated,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height: windowHeight } = Dimensions.get('window');

export const ItemDetailModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  // Y軸初期位置をウィンドウの外側に設定
  const animatedY = useRef(new Animated.Value(-windowHeight)).current;

  // モーダル表示アニメーション
  const startAnimation = () => {
    Animated.timing(animatedY, {
      toValue: windowHeight / 2, // 画面上端に移動
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // モーダル非表示アニメーション
  const closeAnimation = () => {
    Animated.timing(animatedY, {
      toValue: -windowHeight, // ウィンドウの外側に移動
      duration: 500,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      closeAnimation();
    }
  }, [visible]);

  if (!visible) return <></>;

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: animatedY }] },
          ]}
        >
          <Text>ここにモーダルの内容が入ります</Text>
          <TouchableOpacity onPress={closeAnimation}>
            <Text>閉じる</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
