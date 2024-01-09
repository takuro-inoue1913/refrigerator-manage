import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const FridgeItemCreateScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    image: { uri: string } | null;
    displayName: string;
    nameKana: string;
    expiryPeriod: string;
    incrementUnit: string;
    unitName: string;
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

  const onSubmit = () => {
    console.log('submit');
    // ここでデータを保存する処理を行います。
  };

  return (
    <View style={styles.container}>
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
              <Image source={{ uri: value.uri }} style={styles.imagePreview} />
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

      <Controller
        control={control}
        name="unitName"
        rules={{
          required: '単位名は必須です。',
          validate: (value) =>
            [
              '個',
              '本',
              'g',
              '束',
              '袋',
              '枚',
              '箱',
              '缶',
              'L',
              'ml',
              'cc',
              'カップ',
              '合',
              '切',
              'パック',
              '玉',
              '丁',
            ].includes(value) || '無効な単位名です。',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="単位名 ※在庫の単位になります。"
          />
        )}
      />
      {errors.unitName && (
        <Text style={styles.errorText}>{errors.unitName.message}</Text>
      )}

      <Button title="保存" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  imageUploader: {
    marginBottom: 30,
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
    width: '90%',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
  },
  icon: {
    fontSize: 80,
    color: '#e1e4e8',
  },
});
