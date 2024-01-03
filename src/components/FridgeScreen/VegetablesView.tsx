import React, { FC, useCallback, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { useVegetablesStockActions } from '@src/states/vegetables/action';
import { useVegetablesStocks } from '@src/interface/hooks/useVegetablesStocks';
import { SkeletonFridgeViews } from './SkeletonFridgeViews';
import { StickyHeader } from './StickyHeader';
import { SelectFridgeCategory, selectItems } from '@src/screens/FridgeScreen';

type Props = {
  /** 選択されたカテゴリーが変更された時に実行される関数。 */
  onChangeSelectCategory: (category: SelectFridgeCategory) => void;
};

/**
 * 冷蔵庫の野菜画面を表示するコンポーネント。
 */
export const VegetablesView: FC<Props> = ({ onChangeSelectCategory }) => {
  const { vegetablesStocks, isFetching } = useVegetablesStocks();
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
    for (let i = 0; i < vegetablesStocks.ids.length; i += 3) {
      newRows.push(vegetablesStocks.ids.slice(i, i + 3));
    }
    return newRows;
  }, [vegetablesStocks.ids]);

  if (isFetching) {
    return <SkeletonFridgeViews />;
  }

  return (
    <>
      <StickyHeader
        selectedValue={'vegetables'}
        selectItems={selectItems}
        onValueChange={onChangeSelectCategory}
      />
      <ScrollView contentContainerStyle={fridgeCommonStyles.scrollContainer}>
        {rows.map((row, index) => (
          <View key={`row-${index}`} style={fridgeCommonStyles.row}>
            {row.map((vegetableId) => (
              <View
                key={vegetablesStocks.byId[vegetableId].vegetableId}
                style={fridgeCommonStyles.box}
              >
                <ItemImage
                  sourceUri={vegetablesStocks.byId[vegetableId].imageUri}
                  targetId={vegetablesStocks.byId[vegetableId].vegetableId}
                  hasStock={vegetablesStocks.byId[vegetableId].hasStock}
                  quantity={vegetablesStocks.byId[vegetableId].quantity}
                  unitName={vegetablesStocks.byId[vegetableId].unitName}
                  onPressIncrease={onIncreaseStock}
                  onPressDecrease={onDecreaseStock}
                />
                <Text style={fridgeCommonStyles.displayName}>
                  {vegetablesStocks.byId[vegetableId].vegetableDisplayName}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
};
