import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CachedImage from 'expo-cached-image';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { LinearGradientButton } from '@src/components/common/GradationButton';
import { useIsShowKeyboard } from '@src/hooks/useIsShowKeyboard';

const { height: windowHeight } = Dimensions.get('window');

type Props = {
  /** モーダルを表示するかどうか */
  visible: boolean;
  /** 画像のURI */
  sourceUri: string;
  /** 画像のキャッシュキー */
  cacheKey: string;
  /** モーダルを閉じる時に実行する関数 */
  onClose: () => void;
};

export const ItemDetailModal: FC<Props> = ({
  visible,
  sourceUri,
  cacheKey,
  onClose,
}) => {
  // Y軸初期位置をウィンドウの外側に設定
  const animatedY = useRef(new Animated.Value(-windowHeight)).current;
  const isShowKeyboard = useIsShowKeyboard();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  // モーダル表示アニメーション
  const startAnimation = () => {
    Animated.timing(animatedY, {
      toValue: windowHeight / 5,
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

  const moveTopAnimation = () => {
    Animated.timing(animatedY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isShowKeyboard) {
      moveTopAnimation();
      return;
    }
    startAnimation();
  }, [isShowKeyboard]);

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
      <TouchableWithoutFeedback onPress={closeAnimation}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ translateY: animatedY }] },
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>Modal Title</Text>
              </View>
              <View style={styles.main}>
                <CachedImage
                  source={{ uri: sourceUri }}
                  cacheKey={cacheKey}
                  style={styles.image}
                />
                <View style={styles.formContainer}>
                  <View style={styles.row}>
                    <Text style={styles.label}>数量（個）:</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="1000"
                    />
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>増減単位:</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="1000"
                    />
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>賞味期限:</Text>
                    <TouchableOpacity
                      style={styles.inputWithIcon}
                      onPress={showDatePicker}
                    >
                      <Text style={styles.dateText}>2024/01/05</Text>
                      <Icon name="chevron-down" size={24} color="gray" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>メモ:</Text>
                    <TextInput
                      style={styles.textArea}
                      multiline
                      placeholder=""
                    />
                  </View>
                  {/* つけるかどうかは不明 */}
                  {/* <Text style={styles.label}>画像で読み取る</Text> */}
                </View>
              </View>
              <View style={styles.footer}>
                <LinearGradientButton
                  width={100}
                  height={40}
                  onPress={closeAnimation}
                >
                  <Text style={styles.closeButtonText}>閉じる</Text>
                </LinearGradientButton>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            locale="ja"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            confirmTextIOS="決定"
            cancelTextIOS="キャンセル"
          />
        </View>
      </TouchableWithoutFeedback>
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
    width: '90%',
    height: 500,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  formContainer: {
    marginTop: 15,
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  input: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    width: '60%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    fontSize: 16,
    padding: 10,
  },
  footer: {
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputWithIcon: {
    flexDirection: 'row',
    width: '60%',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#ced4da',
  },
  icon: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
});
