import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ItemImage } from '@src/components/FridgeScreen/ItemImage';
import { fridgeCommonStyles } from '@src/utils/commonStyle';
import { VegetablesStocks } from '@src/states/vegetables';

type Props = {
  /** 野菜の在庫データ */
  data: VegetablesStocks;
};
/**
 * 冷蔵庫の野菜画面を表示するコンポーネント。
 */
export const VegetablesView: FC<Props> = ({ data }) => {
  // 横に3つずつ並べるために、3つずつに分割する
  const rows = [];
  for (let i = 0; i < data.ids.length; i += 3) {
    rows.push(data.ids.slice(i, i + 3));
  }

  return (
    <ScrollView contentContainerStyle={fridgeCommonStyles.scrollContainer}>
      {rows.map((row, index) => (
        <View key={`row-${index}`} style={fridgeCommonStyles.row}>
          {row.map((vegetableId) => (
            <View
              key={data.byId[vegetableId].vegetableId}
              style={fridgeCommonStyles.box}
            >
              <ItemImage
                source={{ uri: data.byId[vegetableId].imageUri }}
                hasStock={data.byId[vegetableId].hasStock}
                quantity={data.byId[vegetableId].quantity}
                unitName={data.byId[vegetableId].unitName}
                cacheKey={data.byId[vegetableId].vegetableId.toString()}
              />
              <Text style={fridgeCommonStyles.displayName}>
                {data.byId[vegetableId].vegetableDisplayName}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};
