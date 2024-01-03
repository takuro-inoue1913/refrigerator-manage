import React, { FC, useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { useVegetablesStockActions } from '@src/states/vegetables/action';
import { useVegetablesStocks } from '@src/interface/hooks/useVegetablesStocks';
import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { SelectFridgeCategory, selectItems } from '@src/utils/consts';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useUpsertVegetableStock } from '@src/interface/hooks/useUpsertVegetableStock';

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
  const upsertVegetablesStock = useUpsertVegetableStock();
  const rows = useChunkedArray(vegetablesStocks.ids, 3);

  const onIncreaseStock = useCallback(async (vegetableId: number) => {
    vegetablesStockActions.increaseVegetableStock({ vegetableId, quantity: 1 });
    upsertVegetablesStock({ vegetableId, quantity: 1 });
  }, []);

  const onDecreaseStock = useCallback(async (vegetableId: number) => {
    vegetablesStockActions.decreaseVegetableStock({
      vegetableId,
      quantity: 1,
    });
    upsertVegetablesStock({ vegetableId, quantity: -1 });
  }, []);

  if (isFetching) {
    return <SkeletonFridgeViews />;
  }

  return (
    <>
      <StickyHeader
        selectedValue={'vegetables'}
        selectItems={selectItems}
        onValueChange={onChangeSelectCategory}
        isDisabled={isFetching}
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
