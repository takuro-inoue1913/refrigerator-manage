import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <LinearGradient
        style={{
          ...styles.button,
          ...{
            width: width ?? 'auto',
            height: height ?? 'auto',
            borderRadius: borderRadius ?? 10,
          },
        }}
        colors={['#3498db', '#2ecc71']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
