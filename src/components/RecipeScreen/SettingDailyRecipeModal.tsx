import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradientButton } from '@src/components/common/GradationButton';
import { Dropdown } from 'react-native-element-dropdown';
import { BrunchType, Recipes } from '@src/states/recipe';
import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { COMMON_COLOR_GREEN, DAILY_RECIPE_CATEGORY } from '@src/utils/consts';

export type SettingDailyRecipeModalDropdownData = {
  label: string;
  value: string;
  searchKey: string;
};

export type SubmitValues = {
  recipeId: string;
  brunchType: string;
  isCreated: boolean;
};

export type ModalMode = 'add' | 'edit';

const { width } = Dimensions.get('window');

const getBrunchTypeDisplayName = (brunchType: BrunchType) => {
  switch (brunchType) {
    case 'breakfast':
      return '朝食';
    case 'lunch':
      return '昼食';
    case 'dinner':
      return '夕食';
    case 'snack':
      return 'おやつ';
  }
};

type Props = {
  visible: boolean;
  targetDayStr: string;
  dropdownData: SettingDailyRecipeModalDropdownData[];
  mode: ModalMode;
  selectRecipe: Recipes['byId'][number] | null;
  brunchType?: BrunchType;
  isCreated?: boolean;
  onChangeDropdownValue: (data: SettingDailyRecipeModalDropdownData) => void;
  onClose: () => void;
  onSubmit: (values: SubmitValues) => void;
};

export const SettingDailyRecipeModal: FC<Props> = ({
  visible,
  targetDayStr,
  dropdownData,
  mode,
  selectRecipe,
  brunchType,
  isCreated: _isCreated,
  onChangeDropdownValue,
  onClose,
  onSubmit,
}) => {
  const narrowDownRow = useChunkedArray(DAILY_RECIPE_CATEGORY, 2);

  const [selectedBrunchType, setSelectedBrunchType] =
    useState<BrunchType>('breakfast');
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const handleChangeBrunchType = (value: BrunchType) => {
    setSelectedBrunchType(value as BrunchType);
  };

  const handleIsCreateToggle = (newVal: boolean) => {
    if (isCreated === false) {
      Alert.alert(
        '作成済みにすると冷蔵庫から食材が減りますがよろしいですか？',
        '※ 足らない食材は変動しません。',
        [
          {
            text: 'OK',
            onPress: () => setIsCreated(newVal),
          },
          {
            text: 'キャンセル',
            onPress: () => setIsCreated(false),
            style: 'destructive',
          },
        ],
      );
    } else {
      setIsCreated(newVal);
    }
  };

  const handleClose = () => {
    setSelectedBrunchType('breakfast');
    setIsCreated(false);
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setSelectedBrunchType(brunchType ?? 'breakfast');
      setIsCreated(_isCreated || false);
    }
  }, [visible, brunchType, _isCreated]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
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
                    <Text style={styles.headerText}>
                      {targetDayStr}の献立{mode === 'add' ? '追加' : '編集'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.formItem}>
                  <Dropdown
                    data={dropdownData}
                    value={selectRecipe?.id || ''}
                    onChange={onChangeDropdownValue}
                    labelField="label"
                    valueField="value"
                    searchField="searchKey"
                    placeholder="レシピを選択"
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
                {selectRecipe && (
                  <>
                    <View style={styles.itemContentsWrapper}>
                      <Image
                        source={{ uri: selectRecipe.imageUri }}
                        style={[styles.recipeImage]}
                      />
                    </View>
                    <View style={styles.buttonColumn}>
                      {narrowDownRow.map((column) => (
                        <View key={column[0]} style={styles.buttonContainer}>
                          {column.map((option) => (
                            <TouchableOpacity
                              key={option}
                              style={[
                                styles.button,
                                selectedBrunchType === option &&
                                  styles.selectedButton,
                              ]}
                              onPress={() =>
                                handleChangeBrunchType(option as BrunchType)
                              }
                            >
                              <Text style={styles.selectButtonText}>
                                {getBrunchTypeDisplayName(option as BrunchType)}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ))}
                    </View>
                    <View style={styles.isCreateToggleContainer}>
                      <Text style={styles.isCreateToggleLabel}>作成済み</Text>
                      <Switch
                        trackColor={{
                          false: '#ced4da',
                          true: COMMON_COLOR_GREEN,
                        }}
                        ios_backgroundColor="#ced4da"
                        onValueChange={handleIsCreateToggle}
                        value={isCreated}
                      />
                    </View>
                    <View style={styles.modalFooter}>
                      <LinearGradientButton
                        width={100}
                        height={40}
                        onPress={() => {
                          onSubmit({
                            recipeId: selectRecipe.id,
                            brunchType: selectedBrunchType,
                            isCreated,
                          });
                          setSelectedBrunchType('breakfast');
                          setIsCreated(false);
                        }}
                      >
                        <Text style={styles.submitButtonText}>
                          {mode === 'add' ? '追加' : '保存'}
                        </Text>
                      </LinearGradientButton>
                    </View>
                  </>
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
    height: 470,
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
  closeButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
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
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  modalFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  errorMessage: {
    color: '#dc3545',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonColumn: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2.5,
  },
  selectButtonText: {
    fontSize: 14,
  },
  selectedButton: {
    borderColor: COMMON_COLOR_GREEN,
    backgroundColor: '#d2f4e8',
  },
  isCreateToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '80%',
  },
  isCreateToggleLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#495057',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
