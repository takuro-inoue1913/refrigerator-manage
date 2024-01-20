import { CommonGradation } from '@src/components/common/CommonGradation';
import { useRequestGetAllFridgeMaster } from '@src/interface/hooks/useRequestGetAllFridgeMaster';
import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ShoppingMemoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const { fridgeMaster } = useRequestGetAllFridgeMaster();

  return (
    <View style={styles.container}>
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
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}
        >
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
                      data={fridgeMaster.map((item) => ({
                        label: item.displayName,
                        value: item.id,
                        searchKey: `${item.displayName} ${item.name}`,
                      }))}
                      value={selectValue}
                      onChange={(item) => setSelectValue(item.value)}
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
                          <View style={styles.dropdownItem}>
                            <Text style={styles.dropdownTextItem}>
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text>閉じる</Text>
                  </TouchableOpacity>
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
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    fontSize: 16,
  },
  listItem: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#f8f9fa',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
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
});
