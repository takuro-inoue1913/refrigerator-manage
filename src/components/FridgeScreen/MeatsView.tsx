import React from 'react';
import { ScrollView, View } from 'react-native';

import { SkeletonImage } from '@src/components/common/SkeletonImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';

/**
 * 冷蔵庫の肉画面を表示するコンポーネント。
 */
export const MeatsView = () => {
  const rows = [];
  for (let i = 0; i < 40; i += 3) {
    rows.push(Array.from({ length: 3 }));
  }

  return (
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
  );
};
