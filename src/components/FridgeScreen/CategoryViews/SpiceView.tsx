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
import { useSpiceStockActions } from '@src/states/fridge/spice';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useRequestGetSpiceStocks } from '@src/interface/hooks/spice/useRequestGetSpiceStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { generateEncodeString } from '@src/utils/logics/createEncodeStrings';
import { useRequestUpsertSpiceStock } from '@src/interface/hooks/spice/useRequestUpsertSpiceStock';
import { useDebouncedUpsertStock } from '@src/hooks/useDebouncedUpsertStock';
import { ItemDetailModal } from '@src/components/FridgeScreen/ItemDetailModal';
import { useRequestUpsertSpiceStockDetail } from '@src/interface/hooks/spice/useRequestUpsertSpiceStockDetail';
import { GestureHandlerView } from '../GestureHandlerView';
import { ItemDisplayContents } from '../ItemDisplayContents';
import { useRequestUpsertSpiceFavorite } from '@src/interface/hooks/spice/useRequestUpsertSpiceFavorite';
import { PlusImage } from '../../common/PlusImage';
import { useTypedNavigation } from '@src/hooks/useTypedNavigation';
import { useIsFocused } from '@react-navigation/native';

/**
 * 冷蔵庫のスパイス画面を表示するコンポーネント。
 */
export const SpiceView: FC = () => {
  const isFocused = useIsFocused();
  const [modalProps, setModalProps] =
    useState<ComponentProps<typeof ItemDetailModal>>();
  const navigation = useTypedNavigation();
  const { spiceStocks, isFetching, refetch } = useRequestGetSpiceStocks();
  const spiceStockActions = useSpiceStockActions();
  const requestUpsertSpiceFavorite = useRequestUpsertSpiceFavorite();
  const requestUpsertSpiceStockDetail = useRequestUpsertSpiceStockDetail();
  const rows = useChunkedArray(spiceStocks.ids, 3);
  const requestUpsertSpiceStock = useRequestUpsertSpiceStock();
  const { onIncreaseStock, onDecreaseStock } = useDebouncedUpsertStock({
    debounceUpsertStock: requestUpsertSpiceStock,
    increaseStock: spiceStockActions.increaseSpiceStock,
    decreaseStock: spiceStockActions.decreaseSpiceStock,
  });

  const handleLongPress = useCallback(
    (id: string) => {
      setModalProps({
        visible: true,
        id: spiceStocks.byId[id].id,
        sourceUri: spiceStocks.byId[id].imageUri,
        cacheKey: generateEncodeString([
          spiceStocks.byId[id].name,
          spiceStocks.byId[id].id.toString(),
        ]),
        itemName: spiceStocks.byId[id].displayName,
        incrementalUnit: spiceStocks.byId[id].incrementalUnit,
        quantity: spiceStocks.byId[id].quantity,
        unitName: spiceStocks.byId[id].unitName,
        expirationDate: spiceStocks.byId[id].expirationDate,
        memo: spiceStocks.byId[id].memo,
        isFavorite: spiceStocks.byId[id].isFavorite,
        isCustomMaster: spiceStocks.byId[id].isCustomMaster,
        onClose: (formValues) => {
          setModalProps(undefined);
          requestUpsertSpiceStockDetail(formValues);
          spiceStockActions.updateSpiceStockDetail(formValues);
        },
      });
    },
    [spiceStocks.byId, spiceStockActions, requestUpsertSpiceStockDetail],
  );

  const handlePressReload = async () => {
    await refetch();
  };

  const handleFilterPress = () => {
    spiceStockActions.filterSpiceStocks();
  };

  const handleItemDisplayContents = (targetId: string) => {
    spiceStockActions.updateIsFavorite({
      id: targetId,
      isFavorite: !spiceStocks.byId[targetId].isFavorite,
    });
    requestUpsertSpiceFavorite({
      id: targetId,
      isFavorite: !spiceStocks.byId[targetId].isFavorite,
    });
  };

  const PlusImageView = () => {
    return (
      <View style={fridgeCommonStyles.box}>
        <PlusImage
          onPress={() =>
            navigation.navigate('食材新規登録', {
              fridgeCategory: 'スパイス',
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
              {row.map((spiceId) => (
                <View
                  key={spiceStocks.byId[spiceId].id}
                  style={fridgeCommonStyles.box}
                >
                  <ItemImage
                    sourceUri={spiceStocks.byId[spiceId].imageUri}
                    cacheKey={generateEncodeString([
                      spiceStocks.byId[spiceId].name,
                      spiceStocks.byId[spiceId].id.toString(),
                    ])}
                    targetId={spiceStocks.byId[spiceId].id}
                    hasStock={spiceStocks.byId[spiceId].hasStock}
                    quantity={spiceStocks.byId[spiceId].quantity}
                    unitName={spiceStocks.byId[spiceId].unitName}
                    incrementalUnit={spiceStocks.byId[spiceId].incrementalUnit}
                    onPressIncrease={onIncreaseStock}
                    onPressDecrease={onDecreaseStock}
                    onLongPress={handleLongPress}
                  />
                  <ItemDisplayContents
                    targetId={spiceStocks.byId[spiceId].id}
                    isFavorite={spiceStocks.byId[spiceId].isFavorite}
                    displayName={spiceStocks.byId[spiceId].displayName}
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
