import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
import { useRequestUpsertVegetableIsFavorite } from '@src/interface/hooks/vegetable/useRequestUpsertVegetableIsFavorite';
import { PlusImage } from '@src/components/common/PlusImage';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useIsFocused } from '@react-navigation/native';

/**
 * 冷蔵庫の野菜画面を表示するコンポーネント。
 */
export const VegetablesView: FC = () => {
  const isFocused = useIsFocused();
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const navigation = useTypedNavigation();
  const { vegetablesStocks, isFetching, refetch } =
    useRequestGetVegetablesStocks();
  const vegetablesStockActions = useVegetablesStockActions();
  const rows = useChunkedArray(vegetablesStocks.ids, 3);
  const requestUpsertVegetablesStock = useRequestUpsertVegetableStock();
  const requestUpsertVegetableIsFavorite =
    useRequestUpsertVegetableIsFavorite();
  const requestUpsertVegetableStockDetail =
    useRequestUpsertVegetableStockDetail();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: requestUpsertVegetablesStock,
    increaseStock: vegetablesStockActions.increaseVegetableStock,
    decreaseStock: vegetablesStockActions.decreaseVegetableStock,
  });

  const handleLongPress = useCallback(
    (id: string) => {
      setModalProps({
        visible: true,
        id: vegetablesStocks.byId[id].id,
        sourceUri: vegetablesStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          vegetablesStocks.byId[id].name,
          vegetablesStocks.byId[id].id.toString(),
        ]),
        itemName: vegetablesStocks.byId[id].displayName,
        incrementalUnit: vegetablesStocks.byId[id].incrementalUnit,
        quantity: vegetablesStocks.byId[id].quantity,
        unitName: vegetablesStocks.byId[id].unitName,
        expirationDate: vegetablesStocks.byId[id].expirationDate,
        memo: vegetablesStocks.byId[id].memo,
        onClose: (formValues) => {
          setModalProps(undefined);
          requestUpsertVegetableStockDetail(formValues);
          vegetablesStockActions.updateVegetableStockDetail(formValues);
        },
      });
    },
    [
      vegetablesStocks.byId,
      requestUpsertVegetableStockDetail,
      vegetablesStockActions,
    ],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    vegetablesStockActions.filterVegetableStocks();
  };

  const handleItemDisplayContents = (targetId: string) => {
    vegetablesStockActions.updateIsFavorite({
      id: targetId,
      isFavorite: !vegetablesStocks.byId[targetId].isFavorite,
    });
    requestUpsertVegetableIsFavorite({
      id: targetId,
      isFavorite: !vegetablesStocks.byId[targetId].isFavorite,
    });
  };

  const PlusImageView = () => {
    return (
      <View style={fridgeCommonStyles.box}>
        <PlusImage
          onPress={() =>
            navigation.navigate('食材新規登録', {
              fridgeCategory: '野菜類',
            })
          }
        />
      </View>
    );
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

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
                  key={vegetablesStocks.byId[vegetableId].id}
                  style={fridgeCommonStyles.box}
                >
                  <ItemImage
                    sourceUri={vegetablesStocks.byId[vegetableId].imageUri}
                    cacheKey={generateEncodeString([
                      vegetablesStocks.byId[vegetableId].name,
                      vegetablesStocks.byId[vegetableId].id.toString(),
                    ])}
                    targetId={vegetablesStocks.byId[vegetableId].id}
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
                    targetId={vegetablesStocks.byId[vegetableId].id}
                    isFavorite={vegetablesStocks.byId[vegetableId].isFavorite}
                    displayName={vegetablesStocks.byId[vegetableId].displayName}
                    onPress={handleItemDisplayContents}
                  />
                </View>
              ))}
              {/* 項目の最後に PlusImage を表示。 */}
              {index === rows.length - 1 && <PlusImageView />}
            </View>
          ))}
          {
            // もし最終行が3つのアイテムで埋まっている場合は新しい行を追加して PlusImage を表示。
            rows.length > 0 && rows[rows.length - 1].length === 3 && (
              <View style={fridgeCommonStyles.row}>
                <PlusImageView />
              </View>
            )
          }
        </ScrollView>
      </GestureHandlerView>
      {modalProps && <ItemDetailModal {...modalProps} />}
    </>
  );
};
