import React, { FC, useCallback, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { VegetablesStocks } from '@src/states/vegetables';
import { useVegetablesStockActions } from '@src/states/vegetables/action';

type Props = {
  /** 野菜の在庫データ */
  data: VegetablesStocks;
};
/**
 * 冷蔵庫の野菜画面を表示するコンポーネント。
 */
export const VegetablesView: FC<Props> = ({ data }) => {
  const vegetablesStockActions = useVegetablesStockActions();

  const onIncreaseStock = useCallback(async (vegetableId: number) => {
    vegetablesStockActions.increaseVegetableStock({ vegetableId, quantity: 1 });
  }, []);

  const onDecreaseStock = useCallback(async (vegetableId: number) => {
    vegetablesStockActions.decreaseVegetableStock({
      vegetableId,
      quantity: 1,
    });
  }, []);

  // 横に3つずつ並べるために、3つずつに分割する
  const rows = useMemo(() => {
    const newRows = [];
    for (let i = 0; i < data.ids.length; i += 3) {
      newRows.push(data.ids.slice(i, i + 3));
    }
    return newRows;
  }, [data.ids]);

  return (
    <ScrollView contentContainerStyle={fridgeCommonStyles.scrollContainer}>
      {rows.map((row, index) => (
        <View key={`row-${index}`} style={fridgeCommonStyles.row}>
          {row.map((vegetableId) => (
            <View
              key={data.byId[vegetableId].vegetableId}
              style={fridgeCommonStyles.box}
            >
              <ItemImage
                source={{ uri: data.byId[vegetableId].imageUri }}
                targetId={data.byId[vegetableId].vegetableId}
                hasStock={data.byId[vegetableId].hasStock}
                quantity={data.byId[vegetableId].quantity}
                unitName={data.byId[vegetableId].unitName}
                cacheKey={data.byId[vegetableId].vegetableId.toString()}
                onPressIncrease={onIncreaseStock}
                onPressDecrease={onDecreaseStock}
              />
              <Text style={fridgeCommonStyles.displayName}>
                {data.byId[vegetableId].vegetableDisplayName}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};
