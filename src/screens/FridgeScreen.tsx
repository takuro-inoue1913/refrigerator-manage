import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useVegetablesStocks } from '@src/interface/hooks/useVegetablesStocks';
import { SkeletonFridgeViews } from '@src/components/FridgeScreen/SkeletonFridgeViews';
import { StickyHeader } from '@src/components/FridgeScreen/StickyHeader';
import { VegetablesView } from '@src/components/FridgeScreen/VegetablesView';
import { MeatsView } from '@src/components/FridgeScreen/MeatsView';

export type FridgeCategory = 'vegetables' | 'meats';

export type SelectItems = {
  label: string;
  value: FridgeCategory;
}[];

export const FridgeScreen = () => {
  const [fridgeCategory, setFridgeCategory] =
    useState<FridgeCategory>('vegetables');
  const { data: vegetablesStocks } = useVegetablesStocks();

  const selectItems: SelectItems = [
    { label: '野菜類', value: 'vegetables' },
    { label: '肉類', value: 'meats' },
  ] as const;

  const handleSelectValueChange = (category: FridgeCategory) => {
    setFridgeCategory(category);
  };

  if (!vegetablesStocks) {
    return <SkeletonFridgeViews />;
  }

  const SelectedCategoryView = () => {
    switch (fridgeCategory) {
      case 'vegetables':
        return <VegetablesView data={vegetablesStocks} />;
      case 'meats':
        return <MeatsView />;
    }
  };

  return (
    <View style={styles.screenContainer}>
      <StickyHeader
        selectedValue={fridgeCategory}
        selectItems={selectItems}
        onValueChange={handleSelectValueChange}
      />
      <SelectedCategoryView />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
