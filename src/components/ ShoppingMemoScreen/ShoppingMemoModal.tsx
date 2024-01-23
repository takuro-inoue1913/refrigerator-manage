import React, { FC } from 'react';
import {
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { CommonGradation } from '@src/components/common/CommonGradation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { FridgeMaster } from '@src/states/fridge';
import { commonStyles } from '@src/utils/commonStyle';
import * as Haptics from 'expo-haptics';

export type DropdownData = {
  label: string;
  value: string;
  searchKey: string;
};

type Props = {
  visible: boolean;
  dropdownData: DropdownData[];
  selectFridgeMaster: FridgeMaster | null;
  quantity: number;
  errorMessage: string | null;
  onChangeDropdownValue: (data: DropdownData) => void;
  onChangeQuantity: (quantity: number) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export const ShoppingMemoModal: FC<Props> = ({
  visible,
  dropdownData,
  selectFridgeMaster,
  quantity,
  errorMessage,
  onChangeDropdownValue,
  onChangeQuantity,
  onClose,
  onSubmit,
}) => {
  const handlePressDecreaseButton = () => {
    if (quantity <= selectFridgeMaster!.incrementalUnit) {
      onChangeQuantity(0);
      return;
    }
    onChangeQuantity(quantity - selectFridgeMaster!.incrementalUnit);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePressIncreaseButton = () => {
    onChangeQuantity(quantity + selectFridgeMaster!.incrementalUnit);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleChangeQuantityInput = (value: string) => {
    onChangeQuantity(Number(value));
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
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
                    data={dropdownData}
                    value={selectFridgeMaster?.id}
                    onChange={onChangeDropdownValue}
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
                        <View key={item.searchKey} style={styles.dropdownItem}>
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
                          onChangeText={handleChangeQuantityInput}
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
                        onPress={onSubmit}
                        disabled={quantity === 0}
                      >
                        <Text style={styles.buttonText}>追加</Text>
                      </LinearGradientButton>
                      {errorMessage && (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
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
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
});
