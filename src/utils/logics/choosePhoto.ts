import { ActionSheetIOS, Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

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

const handleChooseLibraryPhoto = async (
  // MEMO: react-hook-form の field.onChange の型に合わせるため。
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void,
) => {
  const mediaLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

/**
 * カメラで撮影するか、ライブラリから写真を選択するかを選択するアクションシートを表示する。
 */
export const choosePhoto = async (
  // MEMO: react-hook-form の field.onChange の型に合わせるため。
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void,
  onTakePhoto: () => void,
) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['キャンセル', 'カメラで撮影', '写真を選択'],
      cancelButtonIndex: 0,
    },
    async (buttonIndex) => {
      switch (buttonIndex) {
        case 1:
          onTakePhoto();
          break;
        case 2:
          await handleChooseLibraryPhoto(onChange);
          break;
      }
    },
  );
};
