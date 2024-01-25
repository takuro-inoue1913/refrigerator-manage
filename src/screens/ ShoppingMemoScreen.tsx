import { CommonGradation } from '@src/components/common/CommonGradation';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/shoppingMemo/useRequestGetAllFridgeMaster';
import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FridgeMaster } from '@src/states/fridge';
import { ShoppingMemo, useShoppingMemoActions } from '@src/states/shoppingMemo';
import { ShoppingMemoItem } from '@src/components/ ShoppingMemoScreen/ShoppingMemoItem';
import {
  DropdownData,
  ModalMode,
  ShoppingMemoModal,
} from '@src/components/ ShoppingMemoScreen/ShoppingMemoModal';
import { useIsFocused } from '@react-navigation/native';
import { useRequestGetAllShoppingMemo } from '@src/interface/hooks/shoppingMemo/useRequestGetAllShoppingMemo';
import { useRequestInsertShoppingMemo } from '@src/interface/hooks/shoppingMemo/useRequestInsertShoppingMemo';
import { useRequestUpdateShoppingMemo } from '@src/interface/hooks/shoppingMemo/useRequestUpdateShoppingMemo';

export const ShoppingMemoScreen = () => {
  const isFocused = useIsFocused();
  const { fridgeMaster, refetch } = useRequestGetAllFridgeMaster();
  const { shoppingMemo } = useRequestGetAllShoppingMemo();
  const requestInsertShoppingMemo = useRequestInsertShoppingMemo();
  const requestUpdateShoppingMemo = useRequestUpdateShoppingMemo();
  const shoppingMemoActions = useShoppingMemoActions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectFridgeMaster, setSelectFridgeMaster] =
    useState<FridgeMaster | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkedShoppingMemoIds, setCheckedShoppingMemoIds] = useState<
    string[]
  >([]);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [prevFridgeMasterId, setPrevFridgeMasterId] = useState<string | null>(
    null,
  );

  const listData = useMemo<ShoppingMemo['byId'][number][]>(
    () => shoppingMemo.ids.map((id) => shoppingMemo.byId[id]),
    [shoppingMemo],
  );

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
    setPrevFridgeMasterId(null);
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

    switch (modalMode) {
      case 'add':
        {
          if (
            shoppingMemo.ids.some(
              (id) => shoppingMemo.byId[id].masterId === selectFridgeMaster.id,
            )
          ) {
            setErrorMessage('すでに追加されている食材です。');
            return;
          }
          requestInsertShoppingMemo({
            masterId: selectFridgeMaster.id,
            quantity,
          }).then((res) => {
            if (res) {
              shoppingMemoActions.addShoppingMemo({
                ...selectFridgeMaster,
                id: res.shopping_memo_id,
                masterId: selectFridgeMaster.id,
                quantity,
              });
            }
          });
        }
        break;
      case 'edit':
        {
          // prevFridgeMasterId が selectFridgeMaster.id と変更されており、
          // かつ、すでに同じ masterId の食材が shoppingMemo に存在する場合はエラー
          if (
            prevFridgeMasterId !== selectFridgeMaster.id &&
            shoppingMemo.ids.some(
              (id) => shoppingMemo.byId[id].masterId === selectFridgeMaster.id,
            )
          ) {
            setErrorMessage('すでに追加されている食材です。');
            return;
          }
          // MEMO: ここで editTargetId が null になることはないはず
          if (editTargetId === null) {
            throw new Error('editTargetId is null');
          }

          if (shoppingMemo.ids.some((id) => id === editTargetId)) {
            requestUpdateShoppingMemo({
              shoppingMemoId: editTargetId,
              masterId: selectFridgeMaster.id,
              quantity,
            }).then(() => {
              shoppingMemoActions.upsertShoppingMemo({
                ...selectFridgeMaster,
                id: editTargetId,
                masterId: selectFridgeMaster.id,
                prevId: editTargetId,
                quantity,
              });
              refetch();
            });
          } else {
            requestInsertShoppingMemo({
              masterId: selectFridgeMaster.id,
              quantity,
            }).then((res) => {
              if (res) {
                shoppingMemoActions.addShoppingMemo({
                  ...selectFridgeMaster,
                  id: res.shopping_memo_id,
                  masterId: selectFridgeMaster.id,
                  quantity,
                });
                refetch();
              }
            });
          }
          setEditTargetId(null);
        }
        break;
    }
    handleCloseModal();
  };

  const handleLongPressItem = (id: string) => {
    setSelectFridgeMaster(
      fridgeMaster.find((item) => item.id === shoppingMemo.byId[id].masterId) ??
        null,
    );
    setQuantity(shoppingMemo.byId[id].quantity ?? 0);
    setModalMode('edit');
    setEditTargetId(id);
    setPrevFridgeMasterId(shoppingMemo.byId[id].masterId);
    setModalVisible(true);
  };

  const FlatItem = ({ item }: { item: ShoppingMemo['byId'][number] }) => (
    <ShoppingMemoItem
      item={item}
      onLongPress={handleLongPressItem}
      checkedIds={checkedShoppingMemoIds}
      addCheckedId={(id) => setCheckedShoppingMemoIds((prev) => [...prev, id])}
      removeCheckedId={(id) =>
        setCheckedShoppingMemoIds((prev) => prev.filter((item) => item !== id))
      }
    />
  );

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={FlatItem}
        keyExtractor={(item) => `${item.displayName}-${item.id}`}
        contentContainerStyle={{ paddingBottom: 20 }} // 必要に応じてスタイルを調整
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalMode('add');
          setModalVisible(true);
        }}
      >
        <CommonGradation style={styles.commonGradation}>
          <Icon name="plus" size={30} color="white" />
        </CommonGradation>
      </TouchableOpacity>
      <ShoppingMemoModal
        visible={modalVisible}
        mode={modalMode}
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
