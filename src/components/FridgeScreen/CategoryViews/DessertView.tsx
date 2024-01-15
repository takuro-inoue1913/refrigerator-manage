import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ScrollView, View } from 'react-native';

import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { selectItems } from '@src/utils/consts';
import { useDessertStockActions } from '@src/states/fridge/dessert';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useRequestGetDessertStocks } from '@src/interface/hooks/dessert/useRequestGetDessertStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useRequestUpsertDessertStock } from '@src/interface/hooks/dessert/useRequestUpsertDessertStock';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';
import { ItemDetailModal } from '@src/components/FridgeScreen/ItemDetailModal';
import { useRequestUpsertDessertStockDetail } from '@src/interface/hooks/dessert/useRequestUpsertDessertStockDetail';
import { GestureHandlerView } from '../GestureHandlerView';
import { ItemDisplayContents } from '../ItemDisplayContents';
import { useRequestUpsertDessertFavorite } from '@src/interface/hooks/dessert/useRequestUpsertDessertFavorite';
import { PlusImage } from '../../common/PlusImage';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useIsFocused } from '@react-navigation/native';

/**
 * 冷蔵庫のデザート画面を表示するコンポーネント。
 */
export const DessertView: FC = () => {
  const isFocused = useIsFocused();
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const navigation = useTypedNavigation();
  const { dessertStocks, isFetching, refetch } = useRequestGetDessertStocks();
  const dessertStockActions = useDessertStockActions();
  const requestUpsertDessertFavorite = useRequestUpsertDessertFavorite();
  const requestUpsertDessertStockDetail = useRequestUpsertDessertStockDetail();
  const rows = useChunkedArray(dessertStocks.ids, 3);
  const requestUpsertDessertStock = useRequestUpsertDessertStock();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: requestUpsertDessertStock,
    increaseStock: dessertStockActions.increaseDessertStock,
    decreaseStock: dessertStockActions.decreaseDessertStock,
  });

  const handleLongPress = useCallback(
    (id: string) => {
      setModalProps({
        visible: true,
        id: dessertStocks.byId[id].id,
        sourceUri: dessertStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          dessertStocks.byId[id].name,
          dessertStocks.byId[id].id.toString(),
        ]),
        itemName: dessertStocks.byId[id].displayName,
        incrementalUnit: dessertStocks.byId[id].incrementalUnit,
        quantity: dessertStocks.byId[id].quantity,
        unitName: dessertStocks.byId[id].unitName,
        expirationDate: dessertStocks.byId[id].expirationDate,
        memo: dessertStocks.byId[id].memo,
        isFavorite: dessertStocks.byId[id].isFavorite,
        onClose: (formValues) => {
          setModalProps(undefined);
          requestUpsertDessertStockDetail(formValues);
          dessertStockActions.updateDessertStockDetail(formValues);
        },
      });
    },
    [dessertStocks.byId, dessertStockActions, requestUpsertDessertStockDetail],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    dessertStockActions.filterDessertStocks();
  };

  const handleItemDisplayContents = (targetId: string) => {
    dessertStockActions.updateIsFavorite({
      id: targetId,
      isFavorite: !dessertStocks.byId[targetId].isFavorite,
    });
    requestUpsertDessertFavorite({
      id: targetId,
      isFavorite: !dessertStocks.byId[targetId].isFavorite,
    });
  };

  const PlusImageView = () => {
    return (
      <View style={fridgeCommonStyles.box}>
        <PlusImage
          onPress={() =>
            navigation.navigate('食材新規登録', {
              fridgeCategory: 'デザート',
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
              {row.map((dessertId) => (
                <View
                  key={dessertStocks.byId[dessertId].id}
                  style={fridgeCommonStyles.box}
                >
                  <ItemImage
                    sourceUri={dessertStocks.byId[dessertId].imageUri}
                    cacheKey={generateEncodeString([
                      dessertStocks.byId[dessertId].name,
                      dessertStocks.byId[dessertId].id.toString(),
                    ])}
                    targetId={dessertStocks.byId[dessertId].id}
                    hasStock={dessertStocks.byId[dessertId].hasStock}
                    quantity={dessertStocks.byId[dessertId].quantity}
                    unitName={dessertStocks.byId[dessertId].unitName}
                    incrementalUnit={
                      dessertStocks.byId[dessertId].incrementalUnit
                    }
                    onPressIncrease={onIncreaseStock}
                    onPressDecrease={onDecreaseStock}
                    onLongPress={handleLongPress}
                  />
                  <ItemDisplayContents
                    targetId={dessertStocks.byId[dessertId].id}
                    isFavorite={dessertStocks.byId[dessertId].isFavorite}
                    displayName={dessertStocks.byId[dessertId].displayName}
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
