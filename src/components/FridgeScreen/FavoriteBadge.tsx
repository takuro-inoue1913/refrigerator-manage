import React, { FC } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

type Props = {
  /** お気に入り登録されているかどうか */
  isFavorite: boolean;
  scale: Animated.Value;
};

/**
 * お気に入りを押した時に使用するアニメーション。
 */
export const performLikeAnimation = ({
  onPress,
  targetId,
  scale,
}: {
  targetId: string;
  scale: Animated.Value;
  onPress?: (targetId: string) => void;
}) => {
  onPress?.(targetId);

  Animated.sequence([
    Animated.timing(scale, {
      toValue: 1.3,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
  ]).start();
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

/**
 * お気に入りバッジ。
 */
export const FavoriteBadge: FC<Props> = ({ isFavorite, scale }) => {
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Icon name="star" size={30} color={isFavorite ? '#ffd700' : '#e1e4e8'} />
    </Animated.View>
  );
};
