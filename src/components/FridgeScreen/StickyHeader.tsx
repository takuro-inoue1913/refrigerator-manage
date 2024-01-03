import React, { FC, useState } from 'react';
import { StyleSheet, TextStyleIOS, View } from 'react-native';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';

import { SelectFridgeCategory } from '@src/utils/consts';

type Props = {
  selectedValue: SelectFridgeCategory;
  selectItems: Item[];
  isDisabled?: boolean;
  onValueChange: (value: SelectFridgeCategory) => void;
};

/**
 * 冷蔵庫画面のヘッダーを表示するコンポーネント。
 */
export const StickyHeader: FC<Props> = ({
  selectedValue,
  selectItems,
  isDisabled,
  onValueChange,
}) => {
  // MEMO: onDonePress の時に値が更新されないため、stateを使っている。
  const [selectedValueState, setSelectedValueState] =
    useState<SelectFridgeCategory>(selectedValue);

  return (
    <View style={styles.header}>
      <RNPickerSelect
        placeholder={{}}
        doneText={'選択'}
        onValueChange={(value) => setSelectedValueState(value)}
        onDonePress={() => onValueChange(selectedValueState)}
        items={selectItems}
        value={selectedValueState}
        style={isDisabled ? styles.disabledPicker : styles.pickerSelect}
        disabled={isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  pickerSelect: {
    inputIOS: {
      fontSize: 14,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 10,
      color: 'black',
      paddingRight: 30,
    },
  } as TextStyleIOS & PickerStyle,
  disabledPicker: {
    inputIOS: {
      fontSize: 14,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      borderRadius: 5,
      color: '#ccc',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.1)',
      borderRadius: 10,
      color: '#ccc',
      paddingRight: 30,
    },
  } as TextStyleIOS & PickerStyle,
});
