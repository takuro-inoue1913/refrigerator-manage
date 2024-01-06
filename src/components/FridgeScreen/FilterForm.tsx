import { useChunkedArray } from '@src/hooks/useChunkedArray';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export const FilterForm = () => {
  const [selectedValue, setSelectedValue] = useState('通常');
  const options = ['通常', '所有食材', '賞味期限が近いもの', 'あいうえお順'];
  const row = useChunkedArray(options, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>並び替え</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonColumn}>
          {row.map((column) => (
            <View key={column[0]} style={styles.buttonContainer}>
              {column.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.button,
                    selectedValue === option && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedValue(option)}
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
    borderColor: 'blue',
    backgroundColor: '#e0f0ff',
  },
});
