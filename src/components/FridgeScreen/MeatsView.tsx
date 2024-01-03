import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { SelectFridgeCategory, selectItems } from '@src/utils/consts';
import { useChunkedArray } from '@src/hooks/useChunkedArray';

type Props = {
  /** 選択されたカテゴリーが変更された時に実行される関数。 */
  onChangeSelectCategory: (category: SelectFridgeCategory) => void;
};

/**
 * 冷蔵庫の肉画面を表示するコンポーネント。
 */
export const MeatsView: FC<Props> = ({ onChangeSelectCategory }) => {
  const rows = useChunkedArray(Array.from({ length: 42 }), 3);

  return (
    <>
      <StickyHeader
        selectedValue={'meats'}
        selectItems={selectItems}
        onValueChange={onChangeSelectCategory}
        isDisabled={false}
      />
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
