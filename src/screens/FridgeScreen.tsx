import React from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, View } from 'react-native';

import { VegetablesView } from '@src/components/FridgeScreen/VegetablesView';
import { MeatsView } from '@src/components/FridgeScreen/MeatsView';
import { selectFridgeCategoryState } from '@src/states/fridge';

export const FridgeScreen = () => {
  const selectFridgeCategory = useRecoilValue(selectFridgeCategoryState);

  const SelectedCategoryView = () => {
    switch (selectFridgeCategory) {
      case 'vegetable':
        return <VegetablesView />;
      case 'meat':
        return <MeatsView />;
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
