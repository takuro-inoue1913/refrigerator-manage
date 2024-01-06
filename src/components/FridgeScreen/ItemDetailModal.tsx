import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
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
  Keyboard,
} from 'react-native';
import CachedImage from 'expo-cached-image';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

import { LinearGradientButton } from '@src/components/common/GradationButton';
import { useIsShowKeyboard } from '@src/hooks/useIsShowKeyboard';

const { height: windowHeight } = Dimensions.get('window');

export type Props = {
  /** 対象データのID */
  id: number;
  /** モーダルを表示するかどうか */
  visible: boolean;
  /** 画像のURI */
  sourceUri: string;
  /** 画像のキャッシュキー */
  cacheKey: string;
  /** 項目名 */
  itemName: string;
  /** 在庫数 */
  quantity: number;
  /** 単位名 */
  unitName: string;
  /** 増減単位 */
  incrementalUnit: number;
  /** 賞味期限日 */
  expirationDate: string;
  /** メモ */
  memo: string;
  /** モーダルを閉じる時に実行する関数 */
  onClose: (editForm: FormValues) => void;
};

type FormValues = {
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
};

export type EditFormValues = {
  id: number;
  quantity: number | null;
  incrementalUnit: number | null;
  expirationDate: string;
  memo: string;
};

export const ItemDetailModal: FC<Props> = ({
  id,
  visible,
  sourceUri,
  cacheKey,
  itemName,
  quantity,
  unitName,
  incrementalUnit,
  expirationDate,
  memo,
  onClose,
}) => {
  // Y軸初期位置をウィンドウの外側に設定
  const animatedY = useRef(new Animated.Value(-windowHeight)).current;
  const isShowKeyboard = useIsShowKeyboard();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [editFormValues, setEditFormValues] = useState<EditFormValues>({
    id,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
  });

  const handleEditForm = useCallback(
    <K extends keyof EditFormValues>(key: K, value: EditFormValues[K]) => {
      setEditFormValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const showDateTimePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateTimePickerConfirm = (date: Date) => {
    handleEditForm('expirationDate', dayjs(date).format('YYYY-MM-DD'));
    hideDateTimePicker();
  };

  const handleRequestClose = useCallback(() => {
    onClose({
      ...editFormValues,
      quantity: editFormValues.quantity ?? 0,
      incrementalUnit: editFormValues.incrementalUnit ?? 1,
      // MEMO: 期限が空の場合は今日の日付を入れる。
      expirationDate:
        editFormValues.expirationDate !== ''
          ? editFormValues.expirationDate
          : dayjs().format('YYYY-MM-DD'),
    });
  }, [editFormValues, onClose]);

  // モーダル表示アニメーション
  const startAnimation = useCallback(() => {
    Animated.timing(animatedY, {
      toValue: windowHeight / 5,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // モーダル非表示アニメーション
  const closeAnimation = useCallback(() => {
    Animated.timing(animatedY, {
      toValue: -windowHeight, // ウィンドウの外側に移動
      duration: 500,
      useNativeDriver: true,
    }).start(() => handleRequestClose());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleRequestClose]);

  const moveTopAnimation = useCallback(() => {
    Animated.timing(animatedY, {
      toValue: -1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isShowKeyboard) {
      moveTopAnimation();
      return;
    }
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowKeyboard]);

  useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      closeAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return <></>;

  return (
    <Modal transparent visible={visible} onRequestClose={handleRequestClose}>
      <TouchableWithoutFeedback onPress={closeAnimation}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback
            onPress={(e) => {
              e.stopPropagation();
              Keyboard.dismiss();
            }}
          >
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ translateY: animatedY }] },
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>{itemName}</Text>
              </View>
              <View style={styles.main}>
                <CachedImage
                  source={{ uri: sourceUri }}
                  cacheKey={cacheKey}
                  style={styles.image}
                />
                <View style={styles.formContainer}>
                  <View style={styles.row}>
                    <Text style={styles.label}>{`数量（${unitName}）:`}</Text>
                    <TextInput
                      style={styles.input}
                      value={
                        editFormValues.quantity !== null &&
                        editFormValues.quantity !== undefined
                          ? editFormValues.quantity.toString()
                          : ''
                      }
                      keyboardType="numeric"
                      placeholder="100"
                      onChange={(e) =>
                        handleEditForm(
                          'quantity',
                          e.nativeEvent.text !== ''
                            ? Number(e.nativeEvent.text)
                            : null,
                        )
                      }
                    />
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>増減単位:</Text>
                    <TextInput
                      style={styles.input}
                      value={
                        editFormValues.incrementalUnit
                          ? editFormValues.incrementalUnit.toString()
                          : ''
                      }
                      keyboardType="numeric"
                      placeholder="100"
                      onChange={(e) =>
                        handleEditForm(
                          'incrementalUnit',
                          Number(e.nativeEvent.text),
                        )
                      }
                    />
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>賞味期限:</Text>
                    <TouchableOpacity
                      style={styles.inputWithIcon}
                      onPress={showDateTimePicker}
                    >
                      <Text style={styles.dateText}>
                        {editFormValues.expirationDate}
                      </Text>
                      <Icon name="chevron-down" size={24} color="gray" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>メモ:</Text>
                    <TextInput
                      style={styles.textArea}
                      value={editFormValues.memo}
                      multiline
                      placeholder=""
                      onChange={(e) =>
                        handleEditForm('memo', e.nativeEvent.text)
                      }
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
            date={dayjs(editFormValues.expirationDate).toDate()}
            onConfirm={handleDateTimePickerConfirm}
            onCancel={hideDateTimePicker}
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
