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
import { useOtherStockActions } from '@src/states/fridge/other';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useRequestGetOtherStocks } from '@src/interface/hooks/fridge/other/useRequestGetOtherStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useRequestUpsertOtherStock } from '@src/interface/hooks/fridge/other/useRequestUpsertOtherStock';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';
import { ItemDetailModal } from '@src/components/FridgeScreen/ItemDetailModal';
import { useRequestUpsertOtherStockDetail } from '@src/interface/hooks/fridge/other/useRequestUpsertOtherStockDetail';
import { GestureHandlerView } from '../GestureHandlerView';
import { ItemDisplayContents } from '../ItemDisplayContents';
import { useRequestUpsertOtherFavorite } from '@src/interface/hooks/fridge/other/useRequestUpsertOtherFavorite';
import { PlusImage } from '../../common/PlusImage';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useIsFocused } from '@react-navigation/native';
import { useRequestDeleteCustomOtherMaster } from '@src/interface/hooks/fridge/other/useRequestDeleteCustomOtherMaster';
import { deleteUserImage } from '@src/interface/firebase/deleteUserImage';
import { LoadingMask } from '@src/components/common/LoadingMask';
import { useRequestDeleteShoppingMemoByMasterId } from '@src/interface/hooks/shoppingMemo/useRequestDeleteShoppingMemoByMasterId';
import { useShoppingMemoActions } from '@src/states/shoppingMemo';

/**
 * 冷蔵庫のその他画面を表示するコンポーネント。
 */
export const OtherView: FC = () => {
  const isFocused = useIsFocused();
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useTypedNavigation();
  const { otherStocks, isFetching, refetch } = useRequestGetOtherStocks();
  const otherStockActions = useOtherStockActions();
  const shoppingMemoActions = useShoppingMemoActions();
  const requestUpsertOtherFavorite = useRequestUpsertOtherFavorite();
  const requestUpsertOtherStockDetail = useRequestUpsertOtherStockDetail();
  const rows = useChunkedArray(otherStocks.ids, 3);
  const requestUpsertOtherStock = useRequestUpsertOtherStock();
  const requestDeleteCustomOtherMaster = useRequestDeleteCustomOtherMaster();
  const requestDeleteShoppingMemoByMasterId =
    useRequestDeleteShoppingMemoByMasterId();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: requestUpsertOtherStock,
    increaseStock: otherStockActions.increaseOtherStock,
    decreaseStock: otherStockActions.decreaseOtherStock,
  });

  const handleLongPress = useCallback(
    (id: string) => {
      setModalProps({
        visible: true,
        id: otherStocks.byId[id].id,
        sourceUri: otherStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          otherStocks.byId[id].name,
          otherStocks.byId[id].id,
        ]),
        itemName: otherStocks.byId[id].displayName,
        incrementalUnit: otherStocks.byId[id].incrementalUnit,
        quantity: otherStocks.byId[id].quantity,
        unitName: otherStocks.byId[id].unitName,
        expirationDate: otherStocks.byId[id].expirationDate,
        memo: otherStocks.byId[id].memo,
        isFavorite: otherStocks.byId[id].isFavorite,
        isCustomMaster: otherStocks.byId[id].isCustomMaster,
        onClose: (formValues) => {
          setModalProps(undefined);
          requestUpsertOtherStockDetail(formValues);
          otherStockActions.updateOtherStockDetail(formValues);
        },
        onDelete: async (id) => {
          setIsLoading(true);
          setModalProps(undefined);
          await requestDeleteCustomOtherMaster(id);
          await deleteUserImage(otherStocks.byId[id].imageUri);
          await requestDeleteShoppingMemoByMasterId({ masterId: id }).then(
            (data) => {
              shoppingMemoActions.deleteShoppingMemo({
                id: data!.shopping_memo_id,
              });
            },
          );
          otherStockActions.deleteOtherStock(id);
          setIsLoading(false);
        },
      });
    },
    [
      otherStocks.byId,
      otherStockActions,
      shoppingMemoActions,
      requestUpsertOtherStockDetail,
      requestDeleteCustomOtherMaster,
      requestDeleteShoppingMemoByMasterId,
    ],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    otherStockActions.filterOtherStocks();
  };

  const handleItemDisplayContents = (targetId: string) => {
    otherStockActions.updateIsFavorite({
      id: targetId,
      isFavorite: !otherStocks.byId[targetId].isFavorite,
    });
    requestUpsertOtherFavorite({
      id: targetId,
      isFavorite: !otherStocks.byId[targetId].isFavorite,
    });
  };

  const PlusImageView = () => {
    return (
      <View style={fridgeCommonStyles.box}>
        <PlusImage
          onPress={() =>
            navigation.navigate('食材新規登録', {
              fridgeCategory: 'その他',
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

  if (otherStocks.ids.length === 0 && isFetching) {
    return (
      <>
        <LoadingMask />
        <SkeletonFridgeViews />
      </>
    );
  }

  return (
    <>
      {(isFetching || isLoading) && <LoadingMask />}
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
              {row.map((otherId) => (
                <View
                  key={otherStocks.byId[otherId].id}
                  style={fridgeCommonStyles.box}
                >
                  <ItemImage
                    sourceUri={otherStocks.byId[otherId].imageUri}
                    cacheKey={generateEncodeString([
                      otherStocks.byId[otherId].name,
                      otherStocks.byId[otherId].id,
                    ])}
                    targetId={otherStocks.byId[otherId].id}
                    hasStock={otherStocks.byId[otherId].hasStock}
                    quantity={otherStocks.byId[otherId].quantity}
                    unitName={otherStocks.byId[otherId].unitName}
                    incrementalUnit={otherStocks.byId[otherId].incrementalUnit}
                    onPressIncrease={onIncreaseStock}
                    onPressDecrease={onDecreaseStock}
                    onLongPress={handleLongPress}
                  />
                  <ItemDisplayContents
                    targetId={otherStocks.byId[otherId].id}
                    isFavorite={otherStocks.byId[otherId].isFavorite}
                    displayName={otherStocks.byId[otherId].displayName}
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
