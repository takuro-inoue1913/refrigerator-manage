import { CommonGradation } from '@src/components/common/CommonGradation';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/shoppingMemo/useRequestGetAllFridgeMaster';
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  ActionSheetIOS,
} from 'react-native';
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
import { LoadingMask } from '@src/components/common/LoadingMask';
import { useRequestUpdateIsCheckedShoppingMemo } from '@src/interface/hooks/shoppingMemo/useRequestUpdateIsCheckedShoppingMemo';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { useRequestBulkDeleteShoppingMemo } from '@src/interface/hooks/shoppingMemo/useRequestBulkDeleteShoppingMemo';
import { useRequestAddFridgeMasterStock } from '@src/interface/hooks/shoppingMemo/useRequestAddFridgeMasterStock';

export const ShoppingMemoScreen = () => {
  const isFocused = useIsFocused();
  const [isLoding, setIsLoding] = useState(false);
  const { fridgeMaster, refetch } = useRequestGetAllFridgeMaster();
  const { shoppingMemo, isFetching } = useRequestGetAllShoppingMemo();
  const requestInsertShoppingMemo = useRequestInsertShoppingMemo();
  const requestUpdateShoppingMemo = useRequestUpdateShoppingMemo();
  const requestUpdateIsCheckedShoppingMemo =
    useRequestUpdateIsCheckedShoppingMemo();
  const requestBulkDeleteShoppingMemo = useRequestBulkDeleteShoppingMemo();
  const requestAddFridgeMasterStock = useRequestAddFridgeMasterStock();
  const shoppingMemoActions = useShoppingMemoActions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectFridgeMaster, setSelectFridgeMaster] =
    useState<FridgeMaster | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [prevFridgeMasterId, setPrevFridgeMasterId] = useState<string | null>(
    null,
  );

  const isDisabled = shoppingMemo.ids.length === 0;

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
          setIsLoding(true);
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
                isChecked: false,
              });
              setIsLoding(false);
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
          setIsLoding(true);
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
              isChecked: shoppingMemo.byId[editTargetId].isChecked,
            });
            setIsLoding(false);
            setEditTargetId(null);
            refetch();
          });
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

  const handleChangeChecked = (id: string, isChecked: boolean) => {
    shoppingMemoActions.updateShoppingMemoIsChecked({
      id,
      isChecked,
    });
    requestUpdateIsCheckedShoppingMemo({
      shoppingMemoId: id,
      isChecked,
    });
  };

  const bulkRequestAddFridgeMasterStock = async (ids: string[]) => {
    ids.forEach((id) => {
      requestAddFridgeMasterStock({
        masterId: shoppingMemo.byId[id].masterId,
        quantity: shoppingMemo.byId[id].quantity,
      });
    });
  };

  const handlePressAddFridge = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['キャンセル', '全て', 'チェック済みのみ'],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        } else if (buttonIndex === 1) {
          setIsLoding(true);
          await bulkRequestAddFridgeMasterStock(shoppingMemo.ids);
          await requestBulkDeleteShoppingMemo({
            shoppingMemoIds: shoppingMemo.ids,
          });
          shoppingMemoActions.bulkDeleteShoppingMemo({
            ids: shoppingMemo.ids,
          });
          setIsLoding(false);
        } else if (buttonIndex === 2) {
          setIsLoding(true);
          const checkedIds = shoppingMemo.ids.filter(
            (id) => shoppingMemo.byId[id].isChecked,
          );
          await bulkRequestAddFridgeMasterStock(checkedIds);
          await requestBulkDeleteShoppingMemo({
            shoppingMemoIds: checkedIds,
          });
          shoppingMemoActions.bulkDeleteShoppingMemo({
            ids: checkedIds,
          });
          setIsLoding(false);
        }
      },
    );
  };

  const handlePressBulkDeleteButton = () => {
    Alert.alert('本当にすべて削除しますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '削除',
        onPress: async () => {
          setIsLoding(true);
          await requestBulkDeleteShoppingMemo({
            shoppingMemoIds: shoppingMemo.ids,
          });
          shoppingMemoActions.bulkDeleteShoppingMemo({
            ids: shoppingMemo.ids,
          });
          setIsLoding(false);
        },
      },
    ]);
  };

  const FlatItem = ({ item }: { item: ShoppingMemo['byId'][number] }) => (
    <ShoppingMemoItem
      item={item}
      onLongPress={handleLongPressItem}
      onChangeChecked={handleChangeChecked}
    />
  );

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={styles.container}>
      {(isLoding || isFetching) && <LoadingMask />}
      <View style={styles.header}>
        <LinearGradientButton
          width={200}
          disabled={isDisabled}
          onPress={handlePressAddFridge}
        >
          <Text style={styles.addFridgeButtonText}>
            <Icon name="fridge" size={20} color="white" />
            冷蔵庫に追加する
          </Text>
        </LinearGradientButton>
        <TouchableOpacity
          style={[
            styles.allDeleteButton,
            isDisabled ? styles.disabled : undefined,
          ]}
          onPress={handlePressBulkDeleteButton}
          disabled={isDisabled}
        >
          <Text style={styles.allDeleteButtonText}>すべて削除</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listData}
        renderItem={FlatItem}
        keyExtractor={(item) => `${item.displayName}-${item.id}`}
        contentContainerStyle={{ paddingBottom: 100 }} // 必要に応じてスタイルを調整
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalMode('add');
          setModalVisible(true);
        }}
      >
        <CommonGradation style={styles.commonGradation}>
          <Icon name="basket-plus" size={30} color="white" />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    zIndex: 100,
  },
  disabled: {
    backgroundColor: '#e1e4e8',
  },
  addFridgeButton: {
    width: '70%',
    height: 50,
  },
  addFridgeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  allDeleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 50,
  },
  allDeleteButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
