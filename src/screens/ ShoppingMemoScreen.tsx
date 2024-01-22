import { CommonGradation } from '@src/components/common/CommonGradation';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/useRequestGetAllFridgeMaster';
import React, { useMemo, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FridgeMaster } from '@src/states/fridge';
import {
  shoppingMemosState,
  useShoppingMemoActions,
} from '@src/states/shoppingMemo';
import { commonStyles } from '@src/utils/commonStyle';
import * as Haptics from 'expo-haptics';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { useRecoilValue } from 'recoil';
import AnimatedCheckbox from '@src/components/common/AnimatedCheckbox';

export const ShoppingMemoScreen = () => {
  const { fridgeMaster } = useRequestGetAllFridgeMaster();
  const shoppingMemo = useRecoilValue(shoppingMemosState);
  const shoppingMemoActions = useShoppingMemoActions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [selectFridgeMaster, setSelectFridgeMaster] =
    useState<FridgeMaster | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkedShoppingMemoIds, setCheckedShoppingMemoIds] = useState<
    string[]
  >([]);

  const modalData = useMemo(() => {
    return fridgeMaster.map((item) => ({
      label: item.displayName,
      value: item.id,
      searchKey: `${item.displayName} ${item.name}`,
    }));
  }, [fridgeMaster]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectValue('');
    setQuantity(0);
    setSelectFridgeMaster(null);
    setErrorMessage(null);
  };

  const handleChangeSelectValue = (value: string) => {
    const findFridgeMaster = fridgeMaster.find((item) => item.id === value);
    if (findFridgeMaster) {
      setSelectFridgeMaster(findFridgeMaster);
      setSelectValue(value);
      setQuantity(findFridgeMaster.incrementalUnit);
    }
  };

  const handlePressIncreaseButton = () => {
    setQuantity((prev) => prev + selectFridgeMaster!.incrementalUnit);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePressDecreaseButton = () => {
    if (quantity <= selectFridgeMaster!.incrementalUnit) {
      setQuantity(0);
      return;
    }
    setQuantity((prev) => prev - selectFridgeMaster!.incrementalUnit);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePressAddButton = () => {
    if (!selectFridgeMaster) {
      return;
    }
    if (shoppingMemo.some((item) => item.id === selectFridgeMaster.id)) {
      setErrorMessage('すでに追加されている食材です。');
      return;
    }
    shoppingMemoActions.addShoppingMemo(selectFridgeMaster);
    handleCloseModal();
  };

  const ShoppingMemoItem = ({ item }: { item: FridgeMaster }) => {
    const handlePressDeleteButton = () => {
      shoppingMemoActions.deleteShoppingMemo({
        id: item.id,
      });
    };

    const handlePressCheckbox = (isChecked: boolean) => {
      if (isChecked) {
        setCheckedShoppingMemoIds((prev) => [...prev, item.id]);
      } else {
        setCheckedShoppingMemoIds((prev) =>
          prev.filter((id) => id !== item.id),
        );
      }
    };

    return (
      <View style={styles.listItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AnimatedCheckbox
            isChecked={checkedShoppingMemoIds.includes(item.id)}
            onCheck={handlePressCheckbox}
          />
          <View style={{ flex: 1 }}>
            <Text>{item.displayName}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: 'gray' }}>{item.unitName}</Text>
          </View>
          <TouchableOpacity onPress={handlePressDeleteButton}>
            <Icon name="trash" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingMemo}
        renderItem={ShoppingMemoItem}
        keyExtractor={(item) => `${item.displayName}-${item.id}`}
        contentContainerStyle={{ paddingBottom: 20 }} // 必要に応じてスタイルを調整
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <CommonGradation style={styles.commonGradation}>
          <Icon name="plus" size={26} color="white" />
        </CommonGradation>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.overlay}>
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback
                onPress={(e) => {
                  e.stopPropagation();
                  Keyboard.dismiss();
                }}
              >
                <View style={styles.modalView}>
                  <View style={styles.header}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={styles.headerText}>買い物メモの追加</Text>
                    </View>
                  </View>
                  <View style={styles.formItem}>
                    <Dropdown
                      data={modalData}
                      value={selectValue}
                      onChange={(item) => handleChangeSelectValue(item.value)}
                      labelField="label"
                      valueField="value"
                      searchField="searchKey"
                      placeholder="食材を選択"
                      search
                      renderInputSearch={(onSearch) => (
                        <TextInput
                          placeholder="検索..."
                          onChangeText={onSearch}
                          returnKeyType="search"
                          style={styles.input}
                        />
                      )}
                      style={styles.dropdown}
                      maxHeight={250}
                      renderItem={(item) => {
                        return (
                          <View
                            key={item.searchKey}
                            style={styles.dropdownItem}
                          >
                            <Text style={styles.dropdownTextItem}>
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  {selectFridgeMaster && (
                    <View style={styles.itemContentsWrapper}>
                      <Image
                        source={{ uri: selectFridgeMaster.imageUri }}
                        style={[commonStyles.image, { padding: 10 }]}
                      />
                      <View style={styles.incrementalUnitContainer}>
                        {quantity <= 0 ? (
                          <View
                            style={[
                              styles.incrementalButtonGradation,
                              {
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                opacity: 0.5,
                              },
                            ]}
                          >
                            <Icon name="minus" size={26} color="white" />
                          </View>
                        ) : (
                          <CommonGradation
                            style={styles.incrementalButtonGradation}
                          >
                            <TouchableOpacity
                              onPress={handlePressDecreaseButton}
                              disabled={quantity === 0}
                            >
                              <Icon name="minus" size={26} color="white" />
                            </TouchableOpacity>
                          </CommonGradation>
                        )}
                        <View style={styles.incrementalUnitInputContainer}>
                          <TextInput
                            style={styles.incrementalUnitInput}
                            keyboardType="numeric"
                            value={quantity.toString()}
                            returnKeyType="done"
                            onChangeText={(text) => setQuantity(+text)}
                          />
                          <Text style={{ textAlign: 'center' }}>
                            {selectFridgeMaster.unitName}
                          </Text>
                        </View>
                        <CommonGradation
                          style={styles.incrementalButtonGradation}
                        >
                          <TouchableOpacity onPress={handlePressIncreaseButton}>
                            <Icon name="plus" size={26} color="white" />
                          </TouchableOpacity>
                        </CommonGradation>
                      </View>
                      <View style={styles.modalFooter}>
                        <LinearGradientButton
                          width={100}
                          height={40}
                          onPress={handlePressAddButton}
                          disabled={quantity === 0}
                        >
                          <Text style={styles.buttonText}>追加</Text>
                        </LinearGradientButton>
                        {errorMessage && (
                          <Text style={styles.errorMessage}>
                            {errorMessage}
                          </Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 400,
    width: '100%',
  },
  header: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  dropdown: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 10,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    fontSize: 16,
  },
  dropdownItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTextItem: {
    flex: 1,
    fontSize: 16,
  },
  itemContentsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  incrementalUnitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingVertical: 20,
  },
  incrementalUnitInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    gap: 5,
    paddingLeft: 20,
  },
  incrementalUnitInput: {
    width: 50,
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    padding: 10,
  },
  incrementalButtonGradation: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  errorMessage: {
    color: '#dc3545',
    marginTop: 10,
  },
  listItem: {
    padding: 20,
    marginTop: 2,
    backgroundColor: '#f8f9fa',
    borderColor: '#e1e4e8',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
