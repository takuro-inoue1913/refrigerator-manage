import { useChunkedArray } from '@src/hooks/useChunkedArray';
import { selectFilterOptionsState } from '@src/states/fridge';
import { COMMON_COLOR_GREEN, FILTER_OPTIONS } from '@src/utils/consts';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRecoilState } from 'recoil';

const { width } = Dimensions.get('window');

export const FilterForm = () => {
  const [selectFilterOptions, setSelectFilterOptionsState] = useRecoilState(
    selectFilterOptionsState,
  );
  const narrowDownRow = useChunkedArray(FILTER_OPTIONS.narrowDown, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>並び替え</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonColumn}>
          {narrowDownRow.map((column) => (
            <View key={column[0]} style={styles.buttonContainer}>
              {column.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.button,
                    selectFilterOptions.narrowDown === option &&
                      styles.selectedButton,
                  ]}
                  onPress={() =>
                    setSelectFilterOptionsState((prev) => ({
                      ...prev,
                      narrowDown: option,
                    }))
                  }
                >
                  <Text style={styles.buttonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    width,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
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
  buttonText: {
    fontSize: 14,
  },
  selectedButton: {
    borderColor: COMMON_COLOR_GREEN,
    backgroundColor: '#d2f4e8',
  },
});
