import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  targetId: number;
  /** お気に入り登録されているかどうか */
  isFavorite: boolean;
  /** 表示名 */
  displayName: string;
  /** 項目を押した時に実行される関数 */
  onPress?: (targetId: number) => void;
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
  return (
    <Pressable onPress={() => onPress?.(targetId)}>
      <View style={styles.container}>
        <Icon
          name="star"
          size={30}
          color={isFavorite ? '#ffd700' : '#e1e4e8'}
        />
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
