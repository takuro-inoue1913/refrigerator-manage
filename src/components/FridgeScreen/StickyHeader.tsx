import React, { FC, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  SelectFridgeCategory,
  selectFridgeCategoryState,
} from '@src/states/fridge';
import {
  Dimensions,
  StyleSheet,
  TextStyleIOS,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';

const { width } = Dimensions.get('window');

type Props = {
  selectItems: Item[];
  isDisabled?: boolean;
  onPressReload?: () => Promise<void>;
};

/**
 * 冷蔵庫画面のヘッダーを表示するコンポーネント。
 */
export const StickyHeader: FC<Props> = ({
  selectItems,
  isDisabled,
  onPressReload,
}) => {
  const [selectFridgeCategory, setSelectFridgeCategory] = useRecoilState(
    selectFridgeCategoryState,
  );
  // MEMO: RNPickerSelect の onValueChange は、値が変更されるたびに呼ばれるため、
  //       onDonePress の時に値を更新するために一時的に値を保持する。
  const [tmpState, setTmpState] =
    useState<SelectFridgeCategory>(selectFridgeCategory);
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const onReload = async () => {
    rotateAnimation.setValue(0);
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => onPressReload?.());
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.header}>
      <Icon name="filter" size={30} color="gray" />
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
      />
      <TouchableOpacity activeOpacity={0.5} onPress={onReload}>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Icon name="reload" size={30} color="gray" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
      width: width / 1.5,
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
      width: width / 1.5,
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
      width: width / 1.5,
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
      width: width / 1.5,
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
