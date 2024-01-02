import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';

const { width } = Dimensions.get('window');

type Props = {
  number?: number;
};

/**
 * データの読み込み中に表示する冷蔵庫画面のスケルトンコンポーネント。
 */
export const SkeletonFridgeViews: FC<Props> = ({ number }) => {
  const rowLength = number ?? 40;

  const rows = [];
  for (let i = 0; i < rowLength; i += 3) {
    rows.push(Array.from({ length: 3 }));
  }
  return (
    <>
      <StickyHeader
        selectedValue={'vegetables'}
        selectItems={[]}
        onValueChange={() => {}}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {rows.map((row, index) => (
          <View key={`row-${index}`} style={styles.row}>
            {row.map((_, index) => (
              <View key={index} style={styles.box}>
                <SkeletonImage />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width,
  },
  box: {
    width: width / 3,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
