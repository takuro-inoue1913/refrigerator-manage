import React, { FC, ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/**
 * 共有のグラデーションコンポーネント。
 */
export const CommonGradation: FC<Props> = ({ style, children }) => {
  return (
    <LinearGradient
      style={style}
      colors={['#3498db', '#2ecc71']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
};
