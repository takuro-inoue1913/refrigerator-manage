import React from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, View } from 'react-native';

import { VegetablesView } from '@src/components/FridgeScreen/CategoryViews/VegetablesView';
import { MeatView } from '@src/components/FridgeScreen/CategoryViews/MeatView';
import { selectFridgeCategoryState } from '@src/states/fridge';

export const FridgeScreen = () => {
  const selectFridgeCategory = useRecoilValue(selectFridgeCategoryState);

  const SelectedCategoryView = () => {
    switch (selectFridgeCategory) {
      case '野菜類':
        return <VegetablesView />;
      case '肉類':
        return <MeatView />;
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
