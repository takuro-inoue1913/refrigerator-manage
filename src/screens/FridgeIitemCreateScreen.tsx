import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { RouteProp } from '@react-navigation/native';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { RootStackParamList } from '@src/types';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/states/user';
import { uploadUserImage } from '@src/interface/firebase/uploadUserImage';
import { useRequestInsertCustomVegetableMaster } from '@src/interface/hooks/vegetable/useRequestInsertCustomVegetableMaster';
import Toast from 'react-native-toast-message';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';

type Props = {
  route: RouteProp<RootStackParamList, '食材新規登録'>;
};

export const FridgeItemCreateScreen: FC<Props> = ({ route }) => {
  const [isSending, setIsSending] = useState(true);
  const user = useRecoilValue(userState);
  const navigation = useTypedNavigation();
  const requestInsertCustomVegetableMaster =
    useRequestInsertCustomVegetableMaster();
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{
    image: { uri: string } | null;
    displayName: string;
    nameKana: string;
    expiryPeriod: string;
    incrementUnit: string;
    unit: { unit_id: number; unit_name: string };
  }>();
  const spinValue = useRef(new Animated.Value(0)).current;

  const startSpinning = useCallback(() => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const unitMasterData = [
    {
      unit_id: 3,
      unit_name: '個',
    },
    {
      unit_id: 4,
      unit_name: '本',
    },
    {
      unit_id: 5,
      unit_name: 'g',
    },
    {
      unit_id: 7,
      unit_name: '束',
    },
    {
      unit_id: 8,
      unit_name: '袋',
    },
    {
      unit_id: 6,
      unit_name: '切',
    },
    {
      unit_id: 9,
      unit_name: '缶',
    },
    {
      unit_id: 10,
      unit_name: '枚',
    },
    {
      unit_id: 11,
      unit_name: '玉',
    },
    {
      unit_id: 12,
      unit_name: '丁',
    },
  ];

  /** 画像をリサイズする */
  const resizeImage = async (uri: string): Promise<string> => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: {
            width: 500,
            height: 500,
          },
        },
      ],
      { compress: 0, format: ImageManipulator.SaveFormat.PNG },
    );

    const fileInfo = await FileSystem.getInfoAsync(result.uri);
    return fileInfo.uri;
  };

  const handleChoosePhoto = async (
    // MEMO: react-hook-form の field.onChange の型に合わせるため。
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void,
  ) => {
    const mediaLibrary =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibrary.status !== 'granted') {
      Alert.alert(
        '写真へのアクセス許可が必要です。',
        '写真をアップロードする場合は、設定画面からカメラへのアクセスを許可してください。',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '設定を開く',
            onPress: () => Linking.openURL('app-settings:'),
          },
        ],
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
    });
    const uri = await resizeImage(result.assets?.[0].uri as string);
    onChange({ uri });
  };

  const handleUnitChange = (
    item: { unit_id: number; unit_name: string },
    // MEMO: react-hook-form の field.onChange の型に合わせるため。
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void,
  ) => {
    setValue('unit', item);
    setValue('incrementUnit', String(getIncrementalUnit(item.unit_name)));
    onChange(item);
  };

  const onSubmit = async () => {
    setIsSending(true);
    switch (route.params.fridgeCategory) {
      case '野菜類': {
        await requestInsertCustomVegetableMaster({
          displayName: getValues('displayName'),
          vegetableName: getValues('nameKana'),
          imageUri: getValues('image.uri'),
          defaultExpirationPeriod: Number(getValues('expiryPeriod')),
          unitId: getValues('unit.unit_id'),
        });
        break;
      }
    }
    await uploadUserImage(
      getValues('image.uri'),
      'user-custom-images/' + user?.uid,
    );
    setIsSending(false);

    Toast.show({
      type: 'success',
      text1: `「${getValues('displayName')}」を登録しました。`,
    });
    navigation.navigate('冷蔵庫管理');
  };

  useEffect(() => {
    if (isSending) {
      startSpinning();
    }
  }, [isSending, startSpinning]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={'position'}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        style={styles.container}
      >
        {isSending && (
          <View style={styles.loadingMask}>
            <Animated.View
              style={{
                transform: [{ rotate: spin }],
              }}
            >
              <Icon name="loading" size={80} color={COMMON_COLOR_GREEN} />
            </Animated.View>
          </View>
        )}
        <View style={errors.image ? styles.formItemHasError : styles.formItem}>
          <Controller
            control={control}
            name="image"
            rules={{ required: '画像は必須です。' }}
            render={({ field: { value, onChange } }) => (
              <TouchableOpacity
                onPress={() => handleChoosePhoto(onChange)}
                style={styles.imageUploader}
              >
                {value ? (
                  <Image
                    source={{ uri: value.uri }}
                    style={styles.imagePreview}
                  />
                ) : (
                  <View>
                    <Text>
                      <Icon name="image-plus" style={styles.icon} />
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
          {errors.image && (
            <Text style={styles.errorText}>{errors.image.message}</Text>
          )}
        </View>
        <View
          style={errors.displayName ? styles.formItemHasError : styles.formItem}
        >
          <Controller
            control={control}
            name="displayName"
            rules={{
              required: '表示名は必須です。',
              maxLength: {
                value: 6,
                message: '表示名は6文字以内で入力してください。',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                accessibilityLabel="表示名"
                value={value}
                placeholder="表示名 (6文字以内) ※リストに表示されます。"
              />
            )}
          />
          {errors.displayName && (
            <Text style={styles.errorText}>{errors.displayName.message}</Text>
          )}
        </View>
        <View
          style={errors.nameKana ? styles.formItemHasError : styles.formItem}
        >
          <Controller
            control={control}
            name="nameKana"
            rules={{
              required: '名前（ひらがな）は必須です。',
              pattern: {
                // eslint-disable-next-line no-irregular-whitespace
                value: /^[あ-んー　]*$/,
                message: '名前（ひらがな）はひらがなのみで入力してください。',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="名前 (ひらがな) ※絞込や検索に使用します。"
              />
            )}
          />
          {errors.nameKana && (
            <Text style={styles.errorText}>{errors.nameKana.message}</Text>
          )}
        </View>
        <View
          style={
            errors.expiryPeriod ? styles.formItemHasError : styles.formItem
          }
        >
          <Controller
            control={control}
            name="expiryPeriod"
            rules={{
              required: '賞味期限の基本期間は必須です。',
              pattern: {
                value: /^\d+$/,
                message: '賞味期限の基本期間は数値のみで入力してください。',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="賞味期限期間 (日数)"
                keyboardType="numeric"
              />
            )}
          />
          {errors.expiryPeriod && (
            <Text style={styles.errorText}>{errors.expiryPeriod.message}</Text>
          )}
        </View>
        <View style={errors.unit ? styles.formItemHasError : styles.formItem}>
          <Controller
            control={control}
            name="unit"
            rules={{
              required: '単位名は必須です。',
            }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholderStyle}
                selectedTextStyle={styles.dropdownSelectedTextStyle}
                iconStyle={styles.dropdownIconStyle}
                data={unitMasterData}
                maxHeight={150}
                labelField="unit_name"
                valueField="unit_id"
                placeholder="単位名 *初期の増減単位が設定されます。"
                searchPlaceholder="単位名を検索"
                value={value}
                onChange={(item) => handleUnitChange(item, onChange)}
                renderItem={(item) => {
                  return (
                    <View style={styles.dropdownItem}>
                      <Text style={styles.dropdownTextItem}>
                        {item.unit_name}
                      </Text>
                      {isEqual(item, value) && (
                        <Icon
                          name="check"
                          style={styles.dropdownItemIcon}
                          size={20}
                          color={COMMON_COLOR_GREEN}
                        />
                      )}
                    </View>
                  );
                }}
              />
            )}
          />
          {errors.unit && (
            <Text style={styles.errorText}>{errors.unit.message}</Text>
          )}
        </View>
        <View
          style={
            errors.incrementUnit ? styles.formItemHasError : styles.formItem
          }
        >
          <Controller
            control={control}
            name="incrementUnit"
            rules={{
              required: '増減単位は必須です。',
              pattern: {
                value: /^\d+$/,
                message: '増減単位は数値のみで入力してください。',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="増減単位 ※ +- での在庫の増減量になります。"
                keyboardType="numeric"
              />
            )}
          />
          {errors.incrementUnit && (
            <Text style={styles.errorText}>{errors.incrementUnit.message}</Text>
          )}
        </View>
        <View style={styles.submitButtonWrapper}>
          <LinearGradientButton
            width={250}
            disabled={isSending}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ color: 'white' }}>
              {isSending ? '登録中...' : '登録'}
            </Text>
          </LinearGradientButton>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formItem: {
    marginBottom: 26,
    alignItems: 'center',
    width: '100%',
  },
  formItemHasError: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
  },
  imageUploader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#e1e4e8',
    borderStyle: 'dotted',
    backgroundColor: 'transparent',
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    marginTop: 5,
    color: '#dc3545',
  },
  icon: {
    fontSize: 80,
    color: '#e1e4e8',
  },
  submitButtonWrapper: {
    padding: 10,
  },
  dropdown: {
    width: '80%',
    height: 42,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdownItem: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTextItem: {
    flex: 1,
    fontSize: 16,
  },
  dropdownPlaceholderStyle: {
    fontSize: 16,
    color: '#ced4da',
  },
  dropdownSelectedTextStyle: {
    fontSize: 16,
  },
  dropdownIconStyle: {
    width: 20,
    height: 20,
  },
  dropdownItemIcon: {
    marginRight: 5,
  },
  loadingMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
