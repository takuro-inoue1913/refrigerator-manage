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
import { useStapleFoodStockActions } from '@src/states/fridge/stapleFood';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useRequestGetStapleFoodStocks } from '@src/interface/hooks/fridge/stapleFood/useRequestGetStapleFoodStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useRequestUpsertStapleFoodStock } from '@src/interface/hooks/fridge/stapleFood/useRequestUpsertStapleFoodStock';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';
import { ItemDetailModal } from '@src/components/FridgeScreen/ItemDetailModal';
import { useRequestUpsertStapleFoodStockDetail } from '@src/interface/hooks/fridge/stapleFood/useRequestUpsertStapleFoodStockDetail';
import { GestureHandlerView } from '../GestureHandlerView';
import { ItemDisplayContents } from '../ItemDisplayContents';
import { useRequestUpsertStapleFoodFavorite } from '@src/interface/hooks/fridge/stapleFood/useRequestUpsertStapleFoodFavorite';
import { PlusImage } from '../../common/PlusImage';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useIsFocused } from '@react-navigation/native';
import { useRequestDeleteCustomStapleFoodMaster } from '@src/interface/hooks/fridge/stapleFood/useRequestDeleteCustomStapleFoodMaster';
import { deleteUserImage } from '@src/interface/firebase/deleteUserImage';
import { LoadingMask } from '@src/components/common/LoadingMask';
import { useRequestDeleteShoppingMemoByMasterId } from '@src/interface/hooks/shoppingMemo/useRequestDeleteShoppingMemoByMasterId';
import { useShoppingMemoActions } from '@src/states/shoppingMemo';

/**
 * 冷蔵庫の主食・粉画面を表示するコンポーネント。
 */
export const StapleFoodView: FC = () => {
  const isFocused = useIsFocused();
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const [isLoding, setIsLoding] = useState(false);
  const navigation = useTypedNavigation();
  const { stapleFoodStocks, isFetching, refetch } =
    useRequestGetStapleFoodStocks();
  const stapleFoodStockActions = useStapleFoodStockActions();
  const shoppingMemoActions = useShoppingMemoActions();
  const requestUpsertStapleFoodFavorite = useRequestUpsertStapleFoodFavorite();
  const requestUpsertStapleFoodStockDetail =
    useRequestUpsertStapleFoodStockDetail();
  const rows = useChunkedArray(stapleFoodStocks.ids, 3);
  const requestUpsertStapleFoodStock = useRequestUpsertStapleFoodStock();
  const requestDeleteCustomStapleFoodMaster =
    useRequestDeleteCustomStapleFoodMaster();
  const requestDeleteShoppingMemoByMasterId =
    useRequestDeleteShoppingMemoByMasterId();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: requestUpsertStapleFoodStock,
    increaseStock: stapleFoodStockActions.increaseStapleFoodStock,
    decreaseStock: stapleFoodStockActions.decreaseStapleFoodStock,
  });

  const handleLongPress = useCallback(
    (id: string) => {
      setModalProps({
        visible: true,
        id: stapleFoodStocks.byId[id].id,
        sourceUri: stapleFoodStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          stapleFoodStocks.byId[id].name,
          stapleFoodStocks.byId[id].id.toString(),
        ]),
        itemName: stapleFoodStocks.byId[id].displayName,
        incrementalUnit: stapleFoodStocks.byId[id].incrementalUnit,
        quantity: stapleFoodStocks.byId[id].quantity,
        unitName: stapleFoodStocks.byId[id].unitName,
        expirationDate: stapleFoodStocks.byId[id].expirationDate,
        memo: stapleFoodStocks.byId[id].memo,
        isFavorite: stapleFoodStocks.byId[id].isFavorite,
        isCustomMaster: stapleFoodStocks.byId[id].isCustomMaster,
        onClose: (formValues) => {
          setModalProps(undefined);
          requestUpsertStapleFoodStockDetail(formValues);
          stapleFoodStockActions.updateStapleFoodStockDetail(formValues);
        },
        onDelete: async (id) => {
          setIsLoding(true);
          setModalProps(undefined);
          await requestDeleteCustomStapleFoodMaster(id);
          await deleteUserImage(stapleFoodStocks.byId[id].imageUri);
          await requestDeleteShoppingMemoByMasterId({ masterId: id }).then(
            (data) => {
              shoppingMemoActions.deleteShoppingMemo({
                id: data!.shopping_memo_id,
              });
            },
          );
          stapleFoodStockActions.deleteStapleFoodStock(id);
          setIsLoding(false);
        },
      });
    },
    [
      stapleFoodStocks.byId,
      stapleFoodStockActions,
      shoppingMemoActions,
      requestUpsertStapleFoodStockDetail,
      requestDeleteCustomStapleFoodMaster,
      requestDeleteShoppingMemoByMasterId,
    ],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    stapleFoodStockActions.filterStapleFoodStocks();
  };

  const handleItemDisplayContents = (targetId: string) => {
    stapleFoodStockActions.updateIsFavorite({
      id: targetId,
      isFavorite: !stapleFoodStocks.byId[targetId].isFavorite,
    });
    requestUpsertStapleFoodFavorite({
      id: targetId,
      isFavorite: !stapleFoodStocks.byId[targetId].isFavorite,
    });
  };

  const PlusImageView = () => {
    return (
      <View style={fridgeCommonStyles.box}>
        <PlusImage
          onPress={() =>
            navigation.navigate('食材新規登録', {
              fridgeCategory: '主食・粉',
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
      {isLoding && <LoadingMask />}
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
              {row.map((stapleFoodId) => (
                <View
                  key={stapleFoodStocks.byId[stapleFoodId].id}
                  style={fridgeCommonStyles.box}
                >
                  <ItemImage
                    sourceUri={stapleFoodStocks.byId[stapleFoodId].imageUri}
                    cacheKey={generateEncodeString([
                      stapleFoodStocks.byId[stapleFoodId].name,
                      stapleFoodStocks.byId[stapleFoodId].id.toString(),
                    ])}
                    targetId={stapleFoodStocks.byId[stapleFoodId].id}
                    hasStock={stapleFoodStocks.byId[stapleFoodId].hasStock}
                    quantity={stapleFoodStocks.byId[stapleFoodId].quantity}
                    unitName={stapleFoodStocks.byId[stapleFoodId].unitName}
                    incrementalUnit={
                      stapleFoodStocks.byId[stapleFoodId].incrementalUnit
                    }
                    onPressIncrease={onIncreaseStock}
                    onPressDecrease={onDecreaseStock}
                    onLongPress={handleLongPress}
                  />
                  <ItemDisplayContents
                    targetId={stapleFoodStocks.byId[stapleFoodId].id}
                    isFavorite={stapleFoodStocks.byId[stapleFoodId].isFavorite}
                    displayName={
                      stapleFoodStocks.byId[stapleFoodId].displayName
                    }
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
