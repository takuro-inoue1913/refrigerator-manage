import React from 'react';
import { StyleSheet, TextStyleIOS, View } from 'react-native';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';

/**
 * 冷蔵庫画面のヘッダーを表示するコンポーネント。
 */
export const StickyHeader = () => {
  return (
    <View style={styles.header}>
      <RNPickerSelect
        placeholder={{
          label: '食材の種類を選択してください。',
        }}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: '野菜類', value: 'vegetables' },
          { label: '肉類', value: 'meats' },
        ]}
        value={'vegetables'}
        style={styles.pickerSelect}
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
});
