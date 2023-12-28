import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CommonGradation } from '@src/components/CommonGradation';

type Props = {
  width?: number;
  height?: number;
  borderRadius?: number;
  onPress: () => void;
  children?: ReactNode;
};

/**
 * グラデーションボタン。
 */
export const LinearGradientButton: FC<Props> = ({
  width,
  height,
  borderRadius,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CommonGradation
        style={{
          ...styles.button,
          ...{
            width: width ?? 'auto',
            height: height ?? 50,
            borderRadius: borderRadius ?? 50,
          },
        }}
      >
        {children}
      </CommonGradation>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
