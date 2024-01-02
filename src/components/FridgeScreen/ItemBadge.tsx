import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { CommonGradation } from '@src/components/common/CommonGradation';

type Props = {
  quantity: number;
  unitName: string | undefined;
};
/**
 * 項目の在庫数を表示するバッジコンポーネント。
 */
export const ItemBadge: FC<Props> = ({ quantity, unitName }) => {
  return (
    <CommonGradation style={styles.badgeContainer}>
      <Text style={styles.badgeText}>
        {quantity}
        {unitName}
      </Text>
    </CommonGradation>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
