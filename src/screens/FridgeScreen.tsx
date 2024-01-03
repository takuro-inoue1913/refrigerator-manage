import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { VegetablesView } from '@src/components/FridgeScreen/VegetablesView';
import { MeatsView } from '@src/components/FridgeScreen/MeatsView';

export type SelectFridgeCategory = 'vegetables' | 'meats';

export type SelectItems = {
  label: string;
  value: SelectFridgeCategory;
}[];

export const selectItems: SelectItems = [
  { label: '野菜類', value: 'vegetables' },
  { label: '肉類', value: 'meats' },
] as const;

export const FridgeScreen = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectFridgeCategory>('vegetables');

  const handleSelectCategoryChange = (category: SelectFridgeCategory) => {
    setSelectedCategory(category);
  };

  const SelectedCategoryView = () => {
    switch (selectedCategory) {
      case 'vegetables':
        return (
          <VegetablesView onChangeSelectCategory={handleSelectCategoryChange} />
        );
      case 'meats':
        return (
          <MeatsView onChangeSelectCategory={handleSelectCategoryChange} />
        );
    }
  };

  return (
    <View style={styles.screenContainer}>
      <SelectedCategoryView />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
