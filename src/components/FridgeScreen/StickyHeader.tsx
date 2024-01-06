import React, { FC, useRef, useState } from 'react';
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
import { FilterForm } from '@src/components/FridgeScreen/FilterForm';

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
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  // ドロップダウンの表示切替
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    Animated.timing(dropdownAnimation, {
      toValue: isDropdownVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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

  const dropdownTranslateY = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Icon name="filter" size={30} color="gray" />
        </TouchableOpacity>
        <SelectDropdown
          data={selectItems}
          defaultValue={selectFridgeCategory}
          onSelect={(selectedItem) => {
            setSelectFridgeCategory(selectedItem);
          }}
          disabled={isDisabled}
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={
            isDisabled
              ? styles.disabledDropdownBtnTxtStyle
              : styles.dropdownBtnTxtStyle
          }
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
          dropdownStyle={styles.dropdownDropdownStyle}
          rowStyle={styles.dropdownRowStyle}
          rowTextStyle={styles.dropdownRowTxtStyle}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={onReload}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Icon name="reload" size={30} color="gray" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.dropdownContainer,
          {
            transform: [{ translateY: dropdownTranslateY }],
            opacity: dropdownAnimation,
          },
        ]}
      >
        <FilterForm />
      </Animated.View>
    </>
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
    zIndex: 100,
  },
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  disabledIcon: {
    color: 'rgba(0,0,0,0.1)',
  },
  dropdownBtnStyle: {
    width: width / 1.5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  dropdownBtnTxtStyle: { color: '#444', textAlign: 'left' },
  disabledDropdownBtnTxtStyle: { color: 'rgba(0,0,0,0.1)', textAlign: 'left' },
  dropdownDropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: { color: '#444', textAlign: 'left' },
  dropdownContainer: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
});
