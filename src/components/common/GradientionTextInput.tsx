import React, { FC } from 'react';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';

import { CommonGradation } from '@src/components/common/CommonGradation';

type Props = TextInputProps & {
  /** コンテナの幅 */
  conteinerWidth?: number | `${number}%`;
};

/**
 * グラデーションの枠で囲まれたテキスト入力コンポーネント。
 */
export const GradientionTextInput: FC<Props> = (props) => {
  return (
    <View
      style={{
        ...styles.gradientBorderContainer,
        width: props.conteinerWidth ? props.conteinerWidth : undefined,
      }}
    >
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
    borderRadius: 5,
  },
  gradientBorder: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});
