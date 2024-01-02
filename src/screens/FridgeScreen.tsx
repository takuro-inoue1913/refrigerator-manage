import React from 'react';
import { Dimensions, StyleSheet, Text, TextStyleIOS, View } from 'react-native';
import { ScrollView } from 'react-native';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';

import { useVegetablesStocks } from '@src/interface/hooks/useVegetablesStocks';
import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { SkeletonImageViews } from '@src/components/FridgeScreen/SkeletonImageViews';
import commonStyle from '@src/utils/commonStyle';

// 画面の幅を取得
const { width } = Dimensions.get('window');

export const FridgeScreen = () => {
  const { data } = useVegetablesStocks();

  if (!data) {
    return <SkeletonImageViews />;
  }

  // 横に3つずつ並べるために、3つずつに分割する
  const rows = [];
  for (let i = 0; i < data.ids.length; i += 3) {
    rows.push(data.ids.slice(i, i + 3));
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <RNPickerSelect
          placeholder={{
            label: '食材の種類を選択してください。',
          }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: '野菜類', value: 'vegetables' },
            { label: '肉類', value: 'meats' },
          ]}
          value={'vegetables'}
          style={styles.pickerSelect}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {rows.map((row, index) => (
          <View key={`row-${index}`} style={styles.row}>
            {row.map((vegetableId) => (
              <View key={data.byId[vegetableId].vegetableId} style={styles.box}>
                <ItemImage
                  source={{ uri: data.byId[vegetableId].imageUri }}
                  hasStock={data.byId[vegetableId].hasStock}
                  quantity={data.byId[vegetableId].quantity}
                  unitName={data.byId[vegetableId].unitName}
                />
                <Text style={styles.displayName}>
                  {data.byId[vegetableId].vegetableDisplayName}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerSelect: {
    inputIOS: {
      fontSize: 14,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 10,
      color: 'black',
      paddingRight: 30,
    },
  } as TextStyleIOS & PickerStyle,
  container: {
    alignItems: 'center',
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width,
  },
  box: {
    position: 'relative',
    width: width / 3,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: commonStyle.image,
  displayName: {
    fontSize: 12,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
