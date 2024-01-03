import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { VegetablesView } from '@src/components/FridgeScreen/VegetablesView';
import { MeatsView } from '@src/components/FridgeScreen/MeatsView';
import { SelectFridgeCategory } from '@src/utils/consts';

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
