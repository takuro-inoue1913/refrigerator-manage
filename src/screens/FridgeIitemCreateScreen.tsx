import React from 'react';
import { isEqual } from 'lodash';
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
  KeyboardAvoidingView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

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

  const onSubmit = () => {
    console.log('submit');
    // ここでデータを保存する処理を行います。
  };

  return (
    <KeyboardAvoidingView
      behavior={'position'}
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={styles.container}
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
        name="unitName"
        rules={{
          required: '単位名は必須です。',
          validate: (value) => {
            const unit = unitMasterData.find(
              (item) => item.unit_name === value,
            );
            return unit ? true : '無効な単位名です。';
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={unitMasterData}
            search
            maxHeight={300}
            labelField="unit_name"
            valueField="unit_id"
            placeholder="単位名"
            searchPlaceholder="単位名を検索"
            value={value}
            onChange={onChange}
            renderItem={(item) => {
              return (
                <View style={styles.item}>
                  <Text style={styles.textItem}>{item.unit_name}</Text>
                  {isEqual(item, value) && (
                    <Icon
                      name="check"
                      style={styles.itemIcon}
                      size={20}
                      color="#0f0"
                    />
                  )}
                </View>
              );
            }}
          />
        )}
      />
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
      {errors.unitName && (
        <Text style={styles.errorText}>{errors.unitName.message}</Text>
      )}

      <Button title="保存" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  dropdown: {
    width: '90%',
    marginBottom: 15,
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
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ced4da',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    // color: '#ced4da',
  },
  itemIcon: {
    marginRight: 5,
  },
});
