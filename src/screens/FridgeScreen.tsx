import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';

import { useGetVegetableMaster } from '@src/interface/hooks/useGetVegetableMaster';
import { ItemImage } from '@src/components/common/ItemImage';
import { SkeletonImageViews } from '@src/components/SkeletonImageViews';
import commonStyle from '@src/utils/commonStyle';

// 画面の幅を取得
const { width } = Dimensions.get('window');

export const FridgeScreen = () => {
  const { data } = useGetVegetableMaster();

  if (!data) {
    return <SkeletonImageViews />;
  }

  // 横に3つずつ並べるために、3つずつに分割する
  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    rows.push(data.slice(i, i + 3));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {rows.map((row, index) => (
        <View key={`row-${index}`} style={styles.row}>
          {row.map((vegetable) => (
            <View key={vegetable.vegetable_id} style={styles.box}>
              <ItemImage source={{ uri: vegetable.image_uri }} />
              <Text style={styles.displayName}>{vegetable.display_name}</Text>
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
  },
  image: commonStyle.image,
  displayName: {
    fontSize: 12,
  },
});
