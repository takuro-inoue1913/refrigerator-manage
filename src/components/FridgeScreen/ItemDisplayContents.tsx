import React, { FC, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

type Props = {
  targetId: string;
  /** お気に入り登録されているかどうか */
  isFavorite: boolean;
  /** 表示名 */
  displayName: string;
  /** 項目を押した時に実行される関数 */
  onPress?: (targetId: string) => void;
};

/**
 * 項目の表示内容を表示するコンポーネント。
 */
export const ItemDisplayContents: FC<Props> = ({
  targetId,
  isFavorite,
  displayName,
  onPress,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const performLikeAnimation = () => {
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

  return (
    <Pressable onPress={performLikeAnimation}>
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Icon
            name="star"
            size={30}
            color={isFavorite ? '#ffd700' : '#e1e4e8'}
          />
        </Animated.View>
        <Text style={styles.displayName}>{displayName}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  displayName: {
    fontSize: 12,
    marginTop: 3,
  },
});
