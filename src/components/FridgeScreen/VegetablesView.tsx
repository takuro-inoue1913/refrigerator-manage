import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { useVegetablesStockActions } from '@src/states/fridge/vegetables';
import { useVegetablesStocks } from '@src/interface/hooks/useVegetablesStocks';
import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { selectItems } from '@src/utils/consts';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useUpsertVegetableStock } from '@src/interface/hooks/useUpsertVegetableStock';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';

/**
 * 冷蔵庫の野菜画面を表示するコンポーネント。
 */
export const VegetablesView: FC = () => {
  const { vegetablesStocks, isFetching } = useVegetablesStocks();
  const vegetablesStockActions = useVegetablesStockActions();
  const rows = useChunkedArray(vegetablesStocks.ids, 3);
  const upsertVegetablesStock = useUpsertVegetableStock();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: upsertVegetablesStock,
    increaseStock: vegetablesStockActions.increaseVegetableStock,
    decreaseStock: vegetablesStockActions.decreaseVegetableStock,
  });

  if (isFetching) {
    return <SkeletonFridgeViews />;
  }

  return (
    <>
      <StickyHeader selectItems={selectItems} isDisabled={isFetching} />
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
                  cacheKey={generateEncodeString([
                    vegetablesStocks.byId[vegetableId].vegetableName,
                    vegetablesStocks.byId[vegetableId].vegetableId.toString(),
                  ])}
                  targetId={vegetablesStocks.byId[vegetableId].vegetableId}
                  hasStock={vegetablesStocks.byId[vegetableId].hasStock}
                  quantity={vegetablesStocks.byId[vegetableId].quantity}
                  unitName={vegetablesStocks.byId[vegetableId].unitName}
                  incrementalUnit={
                    vegetablesStocks.byId[vegetableId].incrementalUnit
                  }
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
