import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useVegetablesStocks } from '@src/interface/hooks/useVegetablesStocks';
import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { VegetablesView } from '@src/components/FridgeScreen/VegetablesView';

export type FridgeCategory = 'vegetables' | 'meats';

export type SelectItems = {
  label: string;
  value: FridgeCategory;
}[];

export const FridgeScreen = () => {
  const [fridgeCategory, setFridgeCategory] =
    useState<FridgeCategory>('vegetables');
  const { data } = useVegetablesStocks();

  const selectItems: SelectItems = [
    { label: '野菜類', value: 'vegetables' },
    { label: '肉類', value: 'meats' },
  ] as const;

  const handleSelectValueChange = (category: FridgeCategory) => {
    setFridgeCategory(category);
  };

  if (!data) {
    return <SkeletonFridgeViews />;
  }

  // 横に3つずつ並べるために、3つずつに分割する
  const rows = [];
  for (let i = 0; i < data.ids.length; i += 3) {
    rows.push(data.ids.slice(i, i + 3));
  }

  return (
    <View style={styles.screenContainer}>
      <StickyHeader
        selectedValue={fridgeCategory}
        selectItems={selectItems}
        onValueChange={handleSelectValueChange}
      />
      <VegetablesView {...data} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
