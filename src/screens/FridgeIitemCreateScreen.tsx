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
        defaultValue={null}
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity
            onPress={() => handleChoosePhoto(onChange)}
            style={styles.imageUploader}
          >
            {value ? (
              <Image source={{ uri: value.uri }} style={styles.imagePreview} />
            ) : (
              <Text>画像をアップロード</Text>
            )}
          </TouchableOpacity>
        )}
      />

      <Controller
        control={control}
        name="displayName"
        rules={{ required: '表示名は必須です' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="表示名"
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
          required: '名前（ひらがな）は必須です',
          // eslint-disable-next-line no-irregular-whitespace
          pattern: /^[あ-んー　]*$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="名前（ひらがな）"
          />
        )}
      />
      {errors.nameKana && (
        <Text style={styles.errorText}>名前のひらがなが無効です</Text>
      )}

      <Controller
        control={control}
        name="expiryPeriod"
        rules={{ required: '基本期間は必須です', min: 1 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="賞味期限の基本期間 (日数)"
            keyboardType="numeric"
          />
        )}
      />
      {errors.expiryPeriod && (
        <Text style={styles.errorText}>有効な期間を入力してください</Text>
      )}

      <Controller
        control={control}
        name="incrementUnit"
        rules={{ required: '増減単位は必須です', min: 1 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="増減単位"
            keyboardType="numeric"
          />
        )}
      />
      {errors.incrementUnit && (
        <Text style={styles.errorText}>有効な増減単位を入力してください</Text>
      )}

      <Controller
        control={control}
        name="unitName"
        rules={{ required: '単位名は必須です' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="単位名"
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
  },
  imageUploader: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    width: 100,
    height: 100,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    width: '100%',
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
});
