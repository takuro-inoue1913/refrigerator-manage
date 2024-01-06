import React, { FC, useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  SelectFridgeCategory,
  selectFridgeCategoryState,
} from '@src/states/fridge';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';

const { width } = Dimensions.get('window');

type Props = {
  selectItems: SelectFridgeCategory[];
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
      <SelectDropdown
        data={selectItems}
        defaultValue={selectFridgeCategory}
        onSelect={(selectedItem) => {
          setSelectFridgeCategory(selectedItem);
        }}
        defaultButtonText={'Select country'}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        disabled={isDisabled}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'gray'}
              size={18}
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
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
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  disabledIcon: {
    color: 'rgba(0,0,0,0.1)',
  },
  dropdown1BtnStyle: {
    width: width / 1.5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});
