import React, { FC, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  performLikeAnimation,
  FavoriteBadge,
} from '@src/components/FridgeScreen/FavoriteBadge';

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

  const handlePress = () => {
    performLikeAnimation({ onPress, targetId, scale });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <FavoriteBadge isFavorite={isFavorite} scale={scale} />
        <Text
          style={
            displayName.length > 6 ? styles.longDisplayName : styles.displayName
          }
        >
          {displayName}
        </Text>
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
  longDisplayName: {
    fontSize: 9,
    marginTop: 3,
  },
});
