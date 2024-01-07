import React, { ComponentProps, FC, useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { useVegetablesStockActions } from '@src/states/fridge/vegetables';
import { useRequestGetVegetablesStocks } from '@src/interface/hooks/vegetable/useRequestGetVegetablesStocks';
import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { ItemDetailModal } from '@src/components/FridgeScreen/ItemDetailModal';
import { selectItems } from '@src/utils/consts';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useRequestUpsertVegetableStock } from '@src/interface/hooks/vegetable/useRequestUpsertVegetableStock';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';
import { useRequestUpsertVegetableStockDetail } from '@src/interface/hooks/vegetable/useRequestUpsertVegetableStockDetail';
import { GestureHandlerView } from '@src/components/FridgeScreen/GestureHandlerView';
import { ItemDisplayContents } from './ItemDisplayContents';

/**
 * 冷蔵庫の野菜画面を表示するコンポーネント。
 */
export const VegetablesView: FC = () => {
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const { vegetablesStocks, isFetching, refetch } =
    useRequestGetVegetablesStocks();
  const vegetablesStockActions = useVegetablesStockActions();
  const rows = useChunkedArray(vegetablesStocks.ids, 3);
  const upsertVegetablesStock = useRequestUpsertVegetableStock();
  const upsertVegetableStockDetail = useRequestUpsertVegetableStockDetail();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: upsertVegetablesStock,
    increaseStock: vegetablesStockActions.increaseVegetableStock,
    decreaseStock: vegetablesStockActions.decreaseVegetableStock,
  });

  const handleLongPress = useCallback(
    (id: number) => {
      setModalProps({
        visible: true,
        id: vegetablesStocks.byId[id].vegetableId,
        sourceUri: vegetablesStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          vegetablesStocks.byId[id].vegetableName,
          vegetablesStocks.byId[id].vegetableId.toString(),
        ]),
        itemName: vegetablesStocks.byId[id].vegetableDisplayName,
        incrementalUnit: vegetablesStocks.byId[id].incrementalUnit,
        quantity: vegetablesStocks.byId[id].quantity,
        unitName: vegetablesStocks.byId[id].unitName,
        expirationDate: vegetablesStocks.byId[id].expirationDate,
        memo: vegetablesStocks.byId[id].memo,
        onClose: (formValues) => {
          setModalProps(undefined);
          upsertVegetableStockDetail(formValues);
          vegetablesStockActions.updateVegetableStockDetail(formValues);
        },
      });
    },
    [vegetablesStocks.byId, upsertVegetableStockDetail, vegetablesStockActions],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    vegetablesStockActions.filterVegetableStocks();
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
                    onLongPress={handleLongPress}
                  />
                  <ItemDisplayContents
                    isFavorite={vegetablesStocks.byId[vegetableId].isFavorite}
                    displayName={
                      vegetablesStocks.byId[vegetableId].vegetableDisplayName
                    }
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
