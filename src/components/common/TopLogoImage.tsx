import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

type Props = {
  isShowKeyboard: boolean;
};

/**
 * トップ画面のロゴを表示するコンポーネント。
 */
export const TopLogoImage: FC<Props> = ({ isShowKeyboard }) => {
  return (
    <>
      <ExpoImage
        source={require('/assets/frimane-logo.jpeg')}
        style={{
          ...styles.frimaneLogo,
          display: isShowKeyboard ? 'none' : 'flex',
        }}
      />
      <ExpoImage
        source={require('/assets/frimane-text-logo.jpeg')}
        style={{
          ...styles.frimaneTextLogo,
          display: isShowKeyboard ? 'flex' : 'none',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  frimaneLogo: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  frimaneTextLogo: {
    width: 200,
    height: 40,
    marginBottom: 30,
  },
});
