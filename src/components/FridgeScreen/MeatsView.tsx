import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { selectItems } from '@src/utils/consts';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { useMeatStocks } from '@src/interface/hooks/useMeatStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { createEncodeStrings } from '@src/utils/logics/createEncodeStrings';

/**
 * 冷蔵庫の肉画面を表示するコンポーネント。
 */
export const MeatsView: FC = () => {
  const { meatStocks, isFetching } = useMeatStocks();
  const rows = useChunkedArray(meatStocks.ids, 3);

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
                  // onPressIncrease={onIncreaseStock}
                  // onPressDecrease={onDecreaseStock}
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
