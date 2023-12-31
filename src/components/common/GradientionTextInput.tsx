import React, { FC } from 'react';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';

import { CommonGradation } from '@src/components/common/CommonGradation';

type Props = TextInputProps;

export const GradientionTextInput: FC<Props> = (props) => {
  return (
    <View style={styles.gradientBorderContainer}>
      <CommonGradation style={styles.gradientBorder}>
        <TextInput
          {...props}
          style={
            props.style ? [styles.textInput, props.style] : styles.textInput
          }
        />
      </CommonGradation>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBorderContainer: {
    padding: 5, // グラデーションボーダーの太さを調整する
    borderRadius: 10, // 必要に応じて角丸を調整
  },
  gradientBorder: {
    // このスタイルがTextInputの「枠」になります
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5, // 内側のTextInputの角丸を調整 (外側の半分以下にする)
  },
  textInput: {
    paddingHorizontal: 10, // 内容と境界線の間のスペース
    paddingVertical: 10,
    borderRadius: 5, // このスタイルで角丸を統一
    backgroundColor: '#FFFFFF',
  },
});
