import React, { useState, useEffect, FC } from 'react';
import { TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

type Props = {
  isChecked: boolean;
  onCheck: (isChecked: boolean) => void;
};

const AnimatedCheckbox: FC<Props> = ({ isChecked, onCheck }) => {
  const [scale] = useState(new Animated.Value(0));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onCheck(!isChecked);
  };

  useEffect(() => {
    Animated.timing(scale, {
      toValue: isChecked ? 1.1 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isChecked, scale]);

  // アイコンの色やサイズを調整ください。
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.checkbox, { transform: [{ scale }] }]}>
        <Icon
          name="checkbox-marked-circle"
          size={28}
          color={isChecked ? '#4CAF50' : '#e1e4e8'}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedCheckbox;
