import React, { ComponentProps, FC, useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { selectItems } from '@src/utils/consts';
import { useMeatStockActions } from '@src/states/fridge/meat';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useRequestGetMeatStocks } from '@src/interface/hooks/meat/useRequestGetMeatStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useRequestUpsertMeatStock } from '@src/interface/hooks/meat/useRequestUpsertMeatStock';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';
import { ItemDetailModal } from '@src/components/FridgeScreen/ItemDetailModal';
import { useRequestUpsertMeatStockDetail } from '@src/interface/hooks/meat/useRequestUpsertMeatStockDetail';
import { GestureHandlerView } from './GestureHandlerView';
import { ItemDisplayContents } from './ItemDisplayContents';

/**
 * 冷蔵庫の肉画面を表示するコンポーネント。
 */
export const MeatView: FC = () => {
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const { meatStocks, isFetching, refetch } = useRequestGetMeatStocks();
  const meatStockActions = useMeatStockActions();
  const upsertMeatStockDetail = useRequestUpsertMeatStockDetail();
  const rows = useChunkedArray(meatStocks.ids, 3);
  const upsertMeatStock = useRequestUpsertMeatStock();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: upsertMeatStock,
    increaseStock: meatStockActions.increaseMeatStock,
    decreaseStock: meatStockActions.decreaseMeatStock,
  });

  const handleLongPress = useCallback(
    (id: number) => {
      setModalProps({
        visible: true,
        id: meatStocks.byId[id].meatId,
        sourceUri: meatStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          meatStocks.byId[id].meatName,
          meatStocks.byId[id].meatId.toString(),
        ]),
        itemName: meatStocks.byId[id].meatDisplayName,
        incrementalUnit: meatStocks.byId[id].incrementalUnit,
        quantity: meatStocks.byId[id].quantity,
        unitName: meatStocks.byId[id].unitName,
        expirationDate: meatStocks.byId[id].expirationDate,
        memo: meatStocks.byId[id].memo,
        onClose: (formValues) => {
          setModalProps(undefined);
          upsertMeatStockDetail(formValues);
          meatStockActions.updateMeatStockDetail(formValues);
        },
      });
    },
    [meatStocks.byId, meatStockActions, upsertMeatStockDetail],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    meatStockActions.filterMeatStocks();
  };

  const handleItemDisplayContents = (targetId: number) => {
    meatStockActions.updateIsFavorite({
      id: targetId,
      isFavorite: !meatStocks.byId[targetId].isFavorite,
    });
  };

  if (isFetching) {
    return <SkeletonFridgeViews />;
  }

  return (
    <>
      <StickyHeader
        selectItems={selectItems}
        isDisabled={isFetching}
        onPressReload={handlePressReload}
        onFilterPress={handleFilterPress}
      />
      <GestureHandlerView>
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
                    cacheKey={generateEncodeString([
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
                    onLongPress={handleLongPress}
                  />
                  <ItemDisplayContents
                    targetId={meatStocks.byId[meatId].meatId}
                    isFavorite={meatStocks.byId[meatId].isFavorite}
                    displayName={meatStocks.byId[meatId].meatDisplayName}
                    onPress={handleItemDisplayContents}
                  />
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </GestureHandlerView>
      {modalProps && <ItemDetailModal {...modalProps} />}
    </>
  );
};
