import { COMMON_COLOR_GREEN } from '@src/utils/consts';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const LoadingMask = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const startSpinning = useCallback(() => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    startSpinning();
  }, [startSpinning]);

  return (
    <View style={styles.loadingMask}>
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
      >
        <Icon name="loading" size={80} color={COMMON_COLOR_GREEN} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
