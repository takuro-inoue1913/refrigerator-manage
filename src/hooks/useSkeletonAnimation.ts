import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * スケルトンアニメーションのカスタムフック
 */
export const useSkeletonAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ededed', '#e4e4e4'],
  });

  return { backgroundColor };
};
