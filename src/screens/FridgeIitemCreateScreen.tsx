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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

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

  const handleChoosePhoto = async () => {
    const mediaLibrary =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibrary.status !== 'granted') {
      Alert.alert('写真へのアクセス許可を ON にしてください');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    }
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
        render={({ field: { value } }) => (
          <TouchableOpacity
            onPress={() => handleChoosePhoto()}
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
