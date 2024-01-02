import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';

const { width } = Dimensions.get('window');

type Props = {
  number?: number;
};

/**
 * 画像のスケルトンを表示するコンポーネント。
 */
export const SkeletonImageViews: FC<Props> = ({ number }) => {
  const rowLength = number ?? 40;

  const rows = [];
  for (let i = 0; i < rowLength; i += 3) {
    rows.push(Array.from({ length: 3 }));
  }
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 80,
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
