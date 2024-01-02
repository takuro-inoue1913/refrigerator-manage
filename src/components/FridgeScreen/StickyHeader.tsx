import React, { FC } from 'react';
import { StyleSheet, TextStyleIOS, View } from 'react-native';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';

import { FridgeCategory } from '@src/screens/FridgeScreen';

type Props = {
  selectedValue: string;
  selectItems: Item[];
  isDisabled?: boolean;
  onValueChange: (value: FridgeCategory) => void;
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
  return (
    <View style={styles.header}>
      <RNPickerSelect
        placeholder={{
          label: '食材の種類を選択してください。',
        }}
        onValueChange={onValueChange}
        items={selectItems}
        value={selectedValue}
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
