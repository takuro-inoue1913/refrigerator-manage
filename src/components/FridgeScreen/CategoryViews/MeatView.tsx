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
import { useMeatStockActions } from '@src/states/fridge/meat';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useRequestGetMeatStocks } from '@src/interface/hooks/meat/useRequestGetMeatStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useRequestUpsertMeatStock } from '@src/interface/hooks/meat/useRequestUpsertMeatStock';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';
import { ItemDetailModal } from '@src/components/FridgeScreen/ItemDetailModal';
import { useRequestUpsertMeatStockDetail } from '@src/interface/hooks/meat/useRequestUpsertMeatStockDetail';
import { GestureHandlerView } from '../GestureHandlerView';
import { ItemDisplayContents } from '../ItemDisplayContents';
import { useRequestUpsertMeatFavorite } from '@src/interface/hooks/meat/useRequestUpsertMeatFavorite';
import { PlusImage } from '../../common/PlusImage';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useIsFocused } from '@react-navigation/native';
import { useRequestDeleteCustomMeatMaster } from '@src/interface/hooks/meat/useRequestDeleteCustomMeatMaster';
import { deleteUserImage } from '@src/interface/firebase/deleteUserImage';
import { LoadingMask } from '@src/components/common/LoadingMask';

/**
 * 冷蔵庫の肉画面を表示するコンポーネント。
 */
export const MeatView: FC = () => {
  const isFocused = useIsFocused();
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const [isLoding, setIsLoding] = useState(false);
  const navigation = useTypedNavigation();
  const { meatStocks, isFetching, refetch } = useRequestGetMeatStocks();
  const meatStockActions = useMeatStockActions();
  const requestUpsertMeatFavorite = useRequestUpsertMeatFavorite();
  const requestUpsertMeatStockDetail = useRequestUpsertMeatStockDetail();
  const rows = useChunkedArray(meatStocks.ids, 3);
  const requestUpsertMeatStock = useRequestUpsertMeatStock();
  const requestDeleteCustomMeatMaster = useRequestDeleteCustomMeatMaster();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: requestUpsertMeatStock,
    increaseStock: meatStockActions.increaseMeatStock,
    decreaseStock: meatStockActions.decreaseMeatStock,
  });

  const handleLongPress = useCallback(
    (id: string) => {
      setModalProps({
        visible: true,
        id: meatStocks.byId[id].id,
        sourceUri: meatStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          meatStocks.byId[id].name,
          meatStocks.byId[id].id.toString(),
        ]),
        itemName: meatStocks.byId[id].displayName,
        incrementalUnit: meatStocks.byId[id].incrementalUnit,
        quantity: meatStocks.byId[id].quantity,
        unitName: meatStocks.byId[id].unitName,
        expirationDate: meatStocks.byId[id].expirationDate,
        memo: meatStocks.byId[id].memo,
        isFavorite: meatStocks.byId[id].isFavorite,
        isCustomMaster: meatStocks.byId[id].isCustomMaster,
        onClose: (formValues) => {
          setModalProps(undefined);
          requestUpsertMeatStockDetail(formValues);
          meatStockActions.updateMeatStockDetail(formValues);
        },
        onDelete: async (id) => {
          setModalProps(undefined);
          setIsLoding(true);
          await requestDeleteCustomMeatMaster(id);
          await deleteUserImage(meatStocks.byId[id].imageUri);
          meatStockActions.deleteMeatStock(id);
          setIsLoding(false);
        },
      });
    },
    [
      meatStocks.byId,
      meatStockActions,
      requestUpsertMeatStockDetail,
      requestDeleteCustomMeatMaster,
    ],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    meatStockActions.filterMeatStocks();
  };

  const handleItemDisplayContents = (targetId: string) => {
    meatStockActions.updateIsFavorite({
      id: targetId,
      isFavorite: !meatStocks.byId[targetId].isFavorite,
    });
    requestUpsertMeatFavorite({
      id: targetId,
      isFavorite: !meatStocks.byId[targetId].isFavorite,
    });
  };

  const PlusImageView = () => {
    return (
      <View style={fridgeCommonStyles.box}>
        <PlusImage
          onPress={() =>
            navigation.navigate('食材新規登録', {
              fridgeCategory: '肉類',
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
              {row.map((meatId) => (
                <View
                  key={meatStocks.byId[meatId].id}
                  style={fridgeCommonStyles.box}
                >
                  <ItemImage
                    sourceUri={meatStocks.byId[meatId].imageUri}
                    cacheKey={generateEncodeString([
                      meatStocks.byId[meatId].name,
                      meatStocks.byId[meatId].id.toString(),
                    ])}
                    targetId={meatStocks.byId[meatId].id}
                    hasStock={meatStocks.byId[meatId].hasStock}
                    quantity={meatStocks.byId[meatId].quantity}
                    unitName={meatStocks.byId[meatId].unitName}
                    incrementalUnit={meatStocks.byId[meatId].incrementalUnit}
                    onPressIncrease={onIncreaseStock}
                    onPressDecrease={onDecreaseStock}
                    onLongPress={handleLongPress}
                  />
                  <ItemDisplayContents
                    targetId={meatStocks.byId[meatId].id}
                    isFavorite={meatStocks.byId[meatId].isFavorite}
                    displayName={meatStocks.byId[meatId].displayName}
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
