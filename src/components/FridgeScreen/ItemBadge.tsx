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
  const isKquantity = quantity >= 1000;
  const quantityValue = isKquantity ? quantity / 1000 : quantity;

  const getBadgeSize = () => {
    if (quantity >= 100 || `${quantity}${unitName}`.length > 3) {
      return 50;
    } else {
      return 40;
    }
  };

  return (
    <CommonGradation
      style={[
        styles.badgeContainer,
        {
          width: getBadgeSize(),
          height: getBadgeSize(),
        },
      ]}
    >
      <Text style={styles.badgeText}>
        {quantityValue}
        {isKquantity && 'k'}
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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
