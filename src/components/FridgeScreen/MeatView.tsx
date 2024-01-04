import React, { FC, useCallback, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { OnPressImageArgs, selectItems } from '@src/utils/consts';
import { useMeatStockActions } from '@src/states/fridge/meat';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useMeatStocks } from '@src/interface/hooks/useMeatStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { createEncodeStrings } from '@src/utils/logics/createEncodeStrings';
import { debounce } from 'lodash';
import { useUpsertMeatStock } from '@src/interface/hooks/useUpsertMeatStock';

/**
 * 冷蔵庫の肉画面を表示するコンポーネント。
 */
export const MeatView: FC = () => {
  const { meatStocks, isFetching } = useMeatStocks();
  const meatStockActions = useMeatStockActions();
  const upsertMeatStock = useUpsertMeatStock();
  const stockQuantities = useRef<{ [meatId: number]: number }>({});
  const rows = useChunkedArray(meatStocks.ids, 3);

  /**
   * 連続でAPIを叩かないようにするための debounce 関数。
   */
  const debouncedUpsertVegetableStock = useCallback(
    debounce(async () => {
      // MEMO: debounce 中に複数の項目が更新される可能性があるため、現在オブジェクトに入っている値を全て更新する。
      Object.entries(stockQuantities.current).forEach(([key, value]) => {
        upsertMeatStock({
          id: Number(key),
          quantity: value,
        });
        delete stockQuantities.current[Number(key)];
      });
    }, 1000),
    [],
  );

  const onIncreaseStock = useCallback(
    async ({
      targetId: meatId,
      currentQuantity,
      incrementalUnit,
    }: OnPressImageArgs) => {
      meatStockActions.increaseMeatStock({
        id: meatId,
        quantity: incrementalUnit,
      });
      stockQuantities.current[meatId] = currentQuantity + incrementalUnit;
      debouncedUpsertVegetableStock();
    },
    [],
  );

  const onDecreaseStock = useCallback(
    async ({
      targetId: meatId,
      currentQuantity,
      incrementalUnit,
    }: OnPressImageArgs) => {
      meatStockActions.decreaseMeatStock({
        id: meatId,
        quantity: incrementalUnit,
      });
      stockQuantities.current[meatId] = Math.max(
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
            {row.map((meatId) => (
              <View
                key={meatStocks.byId[meatId].meatId}
                style={fridgeCommonStyles.box}
              >
                <ItemImage
                  sourceUri={meatStocks.byId[meatId].imageUri}
                  cacheKey={createEncodeStrings([
                    meatStocks.byId[meatId].meatName,
                    meatStocks.byId[meatId].meatId.toString(),
                  ])}
                  targetId={meatStocks.byId[meatId].meatId}
                  hasStock={meatStocks.byId[meatId].hasStock}
                  quantity={meatStocks.byId[meatId].quantity}
                  unitName={meatStocks.byId[meatId].unitName}
                  incrementalUnit={meatStocks.byId[meatId].incrementalUnit}
                  onPressIncrease={onIncreaseStock}
                  onPressDecrease={onDecreaseStock}
                />
                <Text style={fridgeCommonStyles.displayName}>
                  {meatStocks.byId[meatId].meatDisplayName}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
};
