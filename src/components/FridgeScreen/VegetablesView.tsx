import React, { FC, useCallback, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { debounce } from 'lodash';

import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { useVegetablesStockActions } from '@src/states/fridge/vegetables';
import { useVegetablesStocks } from '@src/interface/hooks/useVegetablesStocks';
import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { OnPressImageArgs, selectItems } from '@src/utils/consts';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useUpsertVegetableStock } from '@src/interface/hooks/useUpsertVegetableStock';
import { createEncodeStrings } from '@src/utils/logics/createEncodeStrings';

/**
 * 冷蔵庫の野菜画面を表示するコンポーネント。
 */
export const VegetablesView: FC = () => {
  const { vegetablesStocks, isFetching } = useVegetablesStocks();
  const vegetablesStockActions = useVegetablesStockActions();
  const upsertVegetablesStock = useUpsertVegetableStock();
  const stockQuantities = useRef<{ [vegetableId: number]: number }>({});
  const rows = useChunkedArray(vegetablesStocks.ids, 3);

  /**
   * 連続でAPIを叩かないようにするための debounce 関数。
   */
  const debouncedUpsertVegetableStock = useCallback(
    debounce(async () => {
      // MEMO: debounce 中に複数の項目が更新される可能性があるため、現在オブジェクトに入っている値を全て更新する。
      Object.entries(stockQuantities.current).forEach(([key, value]) => {
        upsertVegetablesStock({
          vegetableId: Number(key),
          quantity: value,
        });
        delete stockQuantities.current[Number(key)];
      });
    }, 1000),
    [],
  );

  const onIncreaseStock = useCallback(
    async ({
      targetId: vegetableId,
      currentQuantity,
      incrementalUnit,
    }: OnPressImageArgs) => {
      vegetablesStockActions.increaseVegetableStock({
        vegetableId,
        quantity: incrementalUnit,
      });
      stockQuantities.current[vegetableId] = currentQuantity + incrementalUnit;
      debouncedUpsertVegetableStock();
    },
    [],
  );

  const onDecreaseStock = useCallback(
    async ({
      targetId: vegetableId,
      currentQuantity,
      incrementalUnit,
    }: OnPressImageArgs) => {
      vegetablesStockActions.decreaseVegetableStock({
        vegetableId,
        quantity: incrementalUnit,
      });
      stockQuantities.current[vegetableId] = Math.max(
        currentQuantity - incrementalUnit,
        0,
      );
      debouncedUpsertVegetableStock();
    },
    [],
  );

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
                  cacheKey={createEncodeStrings([
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
