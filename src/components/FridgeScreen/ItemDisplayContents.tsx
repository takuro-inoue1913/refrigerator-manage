import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  /** お気に入り登録されているかどうか */
  isFavorite: boolean;
  /** 表示名 */
  displayName: string;
};

export const ItemDisplayContents: FC<Props> = ({ isFavorite, displayName }) => {
  return (
    <View style={styles.container}>
      <Icon name="star" size={30} color={isFavorite ? '#ffd700' : '#e1e4e8'} />
      <Text style={styles.displayName}>{displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  displayName: {
    fontSize: 13,
    marginTop: 3,
  },
});
