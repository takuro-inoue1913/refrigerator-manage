import React, { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  SelectFridgeCategory,
  selectFridgeCategoryState,
} from '@src/states/fridge';
import { StyleSheet, TextStyleIOS, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';

type Props = {
  selectItems: Item[];
  isDisabled?: boolean;
};

/**
 * 冷蔵庫画面のヘッダーを表示するコンポーネント。
 */
export const StickyHeader: FC<Props> = ({ selectItems, isDisabled }) => {
  const [selectFridgeCategory, setSelectFridgeCategory] = useRecoilState(
    selectFridgeCategoryState,
  );
  // MEMO: RNPickerSelect の onValueChange は、値が変更されるたびに呼ばれるため、
  //       onDonePress の時に値を更新するために一時的に値を保持する。
  const [tmpState, setTmpState] =
    useState<SelectFridgeCategory>(selectFridgeCategory);

  return (
    <View style={styles.header}>
      <RNPickerSelect
        placeholder={{}}
        doneText={'選択'}
        onValueChange={(value) => setTmpState(value)}
        onDonePress={() => setSelectFridgeCategory(tmpState)}
        items={selectItems}
        value={tmpState}
        style={isDisabled ? styles.disabledPicker : styles.pickerSelect}
        disabled={isDisabled}
        Icon={
          (() => (
            <View style={styles.iconWrapper}>
              <Icon
                name="chevron-down"
                size={24}
                color="gray"
                style={isDisabled ? styles.disabledIcon : undefined}
              />
            </View>
            // MEMO: RNPickerSelect の Icon の型定義が間違っているため、any で回避。
            // eslint-disable-next-line
          )) as any
        }
      ></RNPickerSelect>
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
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  disabledIcon: {
    color: 'rgba(0,0,0,0.1)',
  },
});
