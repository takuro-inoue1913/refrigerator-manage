import React, { FC, useState } from 'react';
// import { isEqual } from 'lodash';
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
  ActionSheetIOS,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { UnitMater } from '@src/states/fridge';
import { LoadingMask } from '@src/components/common/LoadingMask';
import { CameraModal } from '@src/components/common/CameraModal';
import { COMMON_COLOR_GREEN } from '@src/utils/consts';

const { width: windowWidth } = Dimensions.get('window');

export const RecipeCreateScreen: FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [visibleCameraModal, setVisibleCameraModal] = useState(false);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    image: { uri: string } | null;
    recipeName: string;
    nameKana: string;
    expiryPeriod: string;
    incrementUnit: string;
    unit: UnitMater;
  }>();
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
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['キャンセル', 'カメラで撮影', '写真を選択'],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            await handleTakePhoto();
            break;
          case 2:
            await handleChooseLibraryPhoto(onChange);
            break;
          default:
            break;
        }
      },
    );
  };

  const handleTakePhoto = () => {
    setVisibleCameraModal(true);
  };

  const handleChooseLibraryPhoto = async (
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
    if (result.assets?.[0].uri) {
      const uri = await resizeImage(result.assets?.[0].uri as string);
      onChange({ uri });
    }
  };

  const onSubmit = async () => {
    setIsSending(true);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={'position'}
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 20,
          }}
          style={styles.container}
        >
          {isSending && <LoadingMask />}
          <View
            style={
              errors.recipeName ? styles.formItemHasError : styles.formItem
            }
          >
            <Controller
              control={control}
              name="recipeName"
              rules={{
                required: 'レシピ名は必須です。',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  accessibilityLabel="レシピ名"
                  value={value}
                  returnKeyType="done"
                  placeholder="レシピ名"
                />
              )}
            />
            {errors.recipeName && (
              <Text style={styles.errorText}>{errors.recipeName.message}</Text>
            )}
          </View>
          <View
            style={errors.image ? styles.formItemHasError : styles.formItem}
          >
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
          <View style={styles.labelSection}>
            <Text style={styles.label}>材料</Text>
          </View>
          <TouchableOpacity aria-label="button" style={styles.plusButton}>
            <Icon name="plus" style={styles.plusIcon} />
            <Text style={styles.plusText}>材料を追加</Text>
          </TouchableOpacity>
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
      <CameraModal
        visible={visibleCameraModal}
        onClose={() => setVisibleCameraModal(false)}
        onTakePicture={(uri) => {
          setValue('image', { uri });
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  labelSection: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
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
    width: windowWidth - 40,
    height: 200,
    borderRadius: 15,
  },
  imagePreview: {
    width: windowWidth - 40,
    height: 200,
    borderRadius: 15,
  },
  input: {
    width: windowWidth - 40,
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
  plusButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 80,
    color: '#e1e4e8',
  },
  plusText: {
    fontSize: 16,
    color: COMMON_COLOR_GREEN,
  },
  plusIcon: {
    fontSize: 22,
    color: COMMON_COLOR_GREEN,
  },
  submitButtonWrapper: {
    padding: 10,
  },
});
