import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { useSkeletonAnimation } from '@src/hooks/useSkeletonAnimation';

/**
 * 画像のプレースホルダーを表示するコンポーネント
 */
export const SkeletonImageView = () => {
  const { backgroundColor } = useSkeletonAnimation();
  return <Animated.View style={[styles.skeleton, { backgroundColor }]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    position: 'absolute',
    width: 100,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e1e4e8',
  },
});
