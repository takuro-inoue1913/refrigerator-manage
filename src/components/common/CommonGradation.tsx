import React, { FC, ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';
import { COMMON_COLOR_BLUE, COMMON_COLOR_GREEN } from '@src/utils/consts';

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
      colors={[COMMON_COLOR_BLUE, COMMON_COLOR_GREEN]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
};
