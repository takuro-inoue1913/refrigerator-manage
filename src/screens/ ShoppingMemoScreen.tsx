import { CommonGradation } from '@src/components/common/CommonGradation';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/useRequestGetAllFridgeMaster';
import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FridgeMaster } from '@src/states/fridge';
import {
  ShoppingMemo,
  shoppingMemosState,
  useShoppingMemoActions,
} from '@src/states/shoppingMemo';
import { useRecoilValue } from 'recoil';
import { ShoppingMemoItem } from '@src/components/ ShoppingMemoScreen/ShoppingMemoItem';
import {
  DropdownData,
  ShoppingMemoModal,
} from '@src/components/ ShoppingMemoScreen/ShoppingMemoModal';

export const ShoppingMemoScreen = () => {
  const { fridgeMaster } = useRequestGetAllFridgeMaster();
  const shoppingMemo = useRecoilValue(shoppingMemosState);
  const shoppingMemoActions = useShoppingMemoActions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectFridgeMaster, setSelectFridgeMaster] =
    useState<FridgeMaster | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkedShoppingMemoIds, setCheckedShoppingMemoIds] = useState<
    string[]
  >([]);

  const modalData = useMemo<DropdownData[]>(() => {
    return fridgeMaster.map((item) => ({
      label: item.displayName,
      value: item.id,
      searchKey: `${item.displayName} ${item.name}`,
    }));
  }, [fridgeMaster]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setQuantity(0);
    setSelectFridgeMaster(null);
    setErrorMessage(null);
  };

  const handleChangeDropdownValue = (data: DropdownData) => {
    const findFridgeMaster = fridgeMaster.find(
      (item) => item.id === data.value,
    );
    if (findFridgeMaster) {
      setSelectFridgeMaster(findFridgeMaster);
      setQuantity(findFridgeMaster.incrementalUnit);
    }
  };

  const handlePressAddButton = () => {
    if (!selectFridgeMaster) {
      return;
    }
    if (shoppingMemo.some((item) => item.id === selectFridgeMaster.id)) {
      setErrorMessage('すでに追加されている食材です。');
      return;
    }
    shoppingMemoActions.addShoppingMemo({
      ...selectFridgeMaster,
      quantity,
    });
    handleCloseModal();
  };

  const FlatItem = ({ item }: { item: ShoppingMemo }) => (
    <ShoppingMemoItem
      item={item}
      checkedIds={checkedShoppingMemoIds}
      addCheckedId={(id) => setCheckedShoppingMemoIds((prev) => [...prev, id])}
      removeCheckedId={(id) =>
        setCheckedShoppingMemoIds((prev) => prev.filter((item) => item !== id))
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingMemo}
        renderItem={FlatItem}
        keyExtractor={(item) => `${item.displayName}-${item.id}`}
        contentContainerStyle={{ paddingBottom: 20 }} // 必要に応じてスタイルを調整
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <CommonGradation style={styles.commonGradation}>
          <Icon name="plus" size={30} color="white" />
        </CommonGradation>
      </TouchableOpacity>
      <ShoppingMemoModal
        visible={modalVisible}
        dropdownData={modalData}
        selectFridgeMaster={selectFridgeMaster}
        quantity={quantity}
        errorMessage={errorMessage}
        onChangeDropdownValue={handleChangeDropdownValue}
        onChangeQuantity={setQuantity}
        onClose={handleCloseModal}
        onSubmit={handlePressAddButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  commonGradation: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
