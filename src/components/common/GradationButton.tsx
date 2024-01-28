import React, { FC, ReactNode } from 'react';
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CommonGradation } from '@src/components/common/CommonGradation';

type Props = {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  disabled?: boolean;
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
  disabled,
  onPress,
  children,
}) => {
  if (disabled) {
    return (
      <View
        style={{
          ...styles.disabled,
          ...{
            width: width ?? 'auto',
            height: height ?? 50,
            borderRadius: borderRadius ?? 50,
          },
        }}
      >
        {children}
      </View>
    );
  }
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
  disabled: {
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
