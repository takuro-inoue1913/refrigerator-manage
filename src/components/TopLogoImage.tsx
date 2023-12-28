import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
  isShowKeyboard: boolean;
};

export const TopLogoImage: FC<Props> = ({ isShowKeyboard }) => {
  return (
    <>
      <Image
        source={require('/assets/frimane-logo.jpeg')}
        style={{
          ...styles.frimaneLogo,
          display: isShowKeyboard ? 'none' : 'flex',
        }}
      />
      <Image
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
