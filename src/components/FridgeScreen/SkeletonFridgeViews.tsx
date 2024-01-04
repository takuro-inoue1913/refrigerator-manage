import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { selectItems } from '@src/utils/consts';

type Props = {
  number?: number;
};

/**
 * データの読み込み中に表示する冷蔵庫画面のスケルトンコンポーネント。
 */
export const SkeletonFridgeViews: FC<Props> = ({ number = 42 }) => {
  const rows = useChunkedArray(Array.from({ length: number }), 3);

  return (
    <>
      <StickyHeader selectItems={selectItems} isDisabled={true} />
      <ScrollView contentContainerStyle={fridgeCommonStyles.scrollContainer}>
        {rows.map((row, index) => (
          <View key={`row-${index}`} style={fridgeCommonStyles.row}>
            {row.map((_, index) => (
              <View key={index} style={fridgeCommonStyles.box}>
                <SkeletonImage />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
};
